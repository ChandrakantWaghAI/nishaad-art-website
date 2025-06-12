import React, { useState, useEffect } from 'react';
import { Play, Mic, Music, Users, GraduationCap, Video, BookOpen, Star, Menu, X, Sliders, Podcast, MessageSquare, Layers, Drum, Guitar, Zap, Search, ChevronLeft, ChevronDown, BarChart, Calendar, Clock, CheckCircle, Target, Eye, Linkedin, Mail, Phone, MapPin, Instagram, Facebook, Youtube, LogOut, PlusCircle, Trash2, Edit, AlertTriangle } from 'lucide-react';

// --- Firebase Imports ---
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyClH028xxx8b-yQxWLTBX0GSey2so8Q2V0",
  authDomain: "nishaadartwebsite.firebaseapp.com",
  projectId: "nishaadartwebsite",
  storageBucket: "nishaadartwebsite.appspot.com",
  messagingSenderId: "1050797126503",
  appId: "1:1050797126503:web:4d983c9b537e14583375c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// --- Helper Data (This is now static fallback data) ---
const studioServicesData = [
    { icon: Mic, title: "Vocal & Instrument Recording", description: "Crystal-clear recording for vocals and instruments using industry-standard microphones and preamps." },
    { icon: Sliders, title: "Mixing & Mastering", description: "Professional mixing and mastering to balance, polish, and enhance your tracks for commercial release." },
    { icon: Layers, title: "Music Arrangement", description: "Comprehensive music arrangement and production to build your song from the ground up." },
    { icon: MessageSquare, title: "Dubbing & Voice-Overs", description: "High-quality recording services for films, advertisements, audiobooks, and corporate videos." },
    { icon: Podcast, title: "Podcast Production", description: "End-to-end podcast recording, editing, and production services in an acoustically treated environment." },
    { icon: Music, title: "Cover Songs & Backing Tracks", description: "Create high-quality cover versions of your favorite songs or get custom backing tracks made." },
];

// --- SoundCloud Player Component ---
const SoundCloudPlayer = ({ url }) => {
    const [embedHtml, setEmbedHtml] = useState('');

    useEffect(() => {
        const fetchEmbed = async () => {
            try {
                const response = await fetch(`https://soundcloud.com/oembed?format=json&url=${url}&maxheight=166`);
                const data = await response.json();
                setEmbedHtml(data.html);
            } catch (error) {
                console.error("Error fetching SoundCloud embed:", error);
                setEmbedHtml('<p>Could not load SoundCloud player.</p>');
            }
        };

        if (url) {
            fetchEmbed();
        }
    }, [url]);

    return <div dangerouslySetInnerHTML={{ __html: embedHtml }} />;
};


// --- Page Components ---

const HomePage = ({ setCurrentPage, artists, courses, homepageContent }) => {
    const featuredArtistsData = artists.slice(0, 3);
    const bandImageUrl = homepageContent?.bandImageUrl || 'https://placehold.co/600x450/1e293b/FFFFFF?text=Nishaad+Band';
    const testimonials = homepageContent?.testimonials || [];

    return (
        <div className="fade-in">
            <section className="hero-bg min-h-screen flex items-center justify-center text-center text-white relative overflow-hidden">
                 <div className="absolute inset-0 bg-black opacity-60"></div>
                 <div className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
                 <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
                 <div className="relative z-10 px-6">
                    <h1 className="text-5xl md:text-7xl font-playfair font-bold leading-tight mb-4 animate-fade-in-up text-glow">Welcome to the World of Nishaad Art</h1>
                    <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-300">Where Every Note Comes to Life. Your ultimate destination for music production, education, and artist management.</p>
                    <div className="space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up animation-delay-600">
                        <button onClick={() => setCurrentPage('artists')} className="btn-primary">Explore Our Artists</button>
                        <button onClick={() => setCurrentPage('classes')} className="btn-secondary">Join Our Online Classes</button>
                    </div>
                </div>
            </section>
            
            <section className="py-20 md:py-24 bg-slate-950">
                 <div className="container mx-auto px-6 md:flex items-center gap-12">
                     <div className="md:w-1/2 mb-8 md:mb-0">
                        <img src={bandImageUrl} className="rounded-lg shadow-2xl hover-lift" alt="Nishaad Band Live Performance" />
                    </div>
                    <div className="md:w-1/2">
                        <p className="text-teal-400 font-bold uppercase tracking-wider mb-2">Live Music Experience</p>
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 heading-glow">Meet Nishaad Band</h2>
                        <p className="text-gray-300 text-lg mb-8">Bring energy and soul to your events with Nishaad Band. Our professional live band specializes in a wide range of genres, delivering unforgettable performances for weddings, corporate events, and private parties.</p>
                         <button onClick={() => setCurrentPage('band')} className="btn-primary">Explore the Band</button>
                    </div>
                 </div>
            </section>

            <section className="py-20 md:py-24 bg-gray-900">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-16 heading-glow">Our Core Services</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="service-card-wrapper" onClick={() => setCurrentPage('studio')}>
                            <div className="service-card">
                                <Music size={48} className="mx-auto mb-4 text-teal-400" />
                                <h3 className="text-2xl font-bold text-white mb-2">Music Production</h3>
                                <p className="text-gray-400">High-quality audio recording, mixing, and mastering to bring your musical vision to life.</p>
                            </div>
                        </div>
                        <div className="service-card-wrapper" onClick={() => setCurrentPage('band')}>
                            <div className="service-card">
                                 <Zap size={48} className="mx-auto mb-4 text-teal-400" />
                                <h3 className="text-2xl font-bold text-white mb-2">Live Musical Events</h3>
                                <p className="text-gray-400">We organize and manage soulful live concerts, corporate shows, and private musical events.</p>
                            </div>
                        </div>
                         <div className="service-card-wrapper" onClick={() => setCurrentPage('artists')}>
                             <div className="service-card">
                                 <Users size={48} className="mx-auto mb-4 text-teal-400" />
                                <h3 className="text-2xl font-bold text-white mb-2">Artist Management</h3>
                                <p className="text-gray-400">We discover, nurture, and manage talented artists, helping them build successful careers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-24 bg-slate-950">
                 <div className="container mx-auto px-6">
                     <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-16 heading-glow">Words From Our Community</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {testimonials.map((testimonial, i) => (
                            <div key={i} className="testimonial-card" style={{animationDelay: `${i * 150}ms`}}>
                                <Star className="text-yellow-400 mx-auto mb-4" />
                                <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                                <p className="font-bold text-white">{testimonial.name}</p>
                                <p className="text-sm text-teal-400">{testimonial.title}</p>
                            </div>
                        ))}
                    </div>
                 </div>
            </section>
        </div>
    );
};

const StudioPage = ({ setCurrentPage }) => { return ( <div className="pt-24 md:pt-32 bg-slate-950 fade-in"> <section className="text-center py-20 bg-gray-900"> <div className="container mx-auto px-6"> <h1 className="text-4xl md:text-6xl font-playfair font-bold heading-glow">Our Professional Recording Studio</h1> <p className="text-lg md:text-xl text-teal-300 mt-4">Where Creativity Meets Technology</p> </div> </section> <section className="py-20 md:py-24"> <div className="container mx-auto px-6"> <div className="text-center mb-16"> <h2 className="text-3xl md:text-4xl font-playfair text-white font-bold">Studio Services</h2> <p className="text-gray-400 mt-2">Everything you need to produce broadcast-quality audio.</p> </div> <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> {studioServicesData.map((service, i) => ( <div key={service.title} className="service-card" style={{animationDelay: `${i * 100}ms`}}> <div className="text-teal-400 mb-4"> <service.icon size={48} /> </div> <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3> <p className="text-gray-400 flex-grow">{service.description}</p> </div> ))} </div> </div> </section> <section className="py-20 bg-gradient-to-r from-teal-600 to-purple-600 text-center text-white"> <div className="container mx-auto px-6"> <h2 className="text-3xl font-bold mb-4">Ready to Record Your Masterpiece?</h2> <p className="max-w-2xl mx-auto mb-8">Our studio is equipped with top-of-the-line gear and an inspiring environment to bring your ideas to life. Let's create something amazing together.</p> <button onClick={() => setCurrentPage('contact')} className="btn-primary bg-white text-teal-700 hover:bg-slate-200">Book a Studio Session</button> </div> </section> </div> );};
const NishaadBandPage = ({ setCurrentPage, bandPageContent }) => { 
    return ( 
    <div className="pt-20 bg-slate-950 fade-in"> 
        <section className="band-hero-bg text-white text-center flex items-center justify-center min-h-[60vh] relative"> 
            <div className="absolute inset-0 bg-black opacity-60"></div> 
            <div className="relative z-10 px-6"> 
                <h1 className="text-5xl md:text-7xl font-playfair font-bold heading-glow">Nishaad Band</h1> 
                <p className="text-xl md:text-2xl mt-4 text-teal-300">The Ultimate Live Music Experience</p> 
            </div> 
        </section> 
        <section className="py-20 md:py-24"> 
            <div className="container mx-auto px-6 md:flex items-center gap-16"> 
                <div className="md:w-2/5 mb-8 md:mb-0"> 
                    <img src={bandPageContent?.aboutImageUrl || "https://placehold.co/500x500/1e293b/FFFFFF?text=Nishaad+Band"} alt="Nishaad Band" className="rounded-lg shadow-2xl hover-lift"/> 
                </div> 
                <div className="md:w-3/5"> 
                    <h2 className="text-4xl font-playfair text-white font-bold mb-6">About The Band</h2> 
                    <p className="text-gray-300 text-lg mb-4">Nishaad Band is the live performance wing of Nishaad Art. Comprising a group of exceptionally talented and experienced musicians, we bring a dynamic and soulful energy to every stage. Our mission is to create unforgettable musical moments for your special events.</p> 
                    <p className="text-gray-300 text-lg">From Bollywood hits and classic rock to soulful ghazals and groovy fusion, our versatile repertoire caters to all tastes and age groups. We pride ourselves on our professionalism, stage presence, and ability to connect with the audience.</p> 
                </div> 
            </div> 
        </section> 

        <section className="py-20 bg-gradient-to-r from-teal-600 to-purple-600 text-center text-white"> 
            <div className="container mx-auto px-6"> 
                <h2 className="text-3xl font-bold mb-4">Make Your Event Unforgettable</h2> 
                <p className="max-w-2xl mx-auto mb-8">Book Nishaad Band for your wedding, corporate event, or private party and give your guests a night to remember!</p> 
                <button onClick={() => setCurrentPage('contact')} className="btn-primary bg-white text-teal-700 hover:bg-slate-200">Book The Band Now</button> 
            </div> 
        </section> 
        
        <section className="py-20 md:py-24 bg-gray-900">
             <div className="container mx-auto px-6">
                 <h2 className="text-4xl text-center font-playfair text-white font-bold mb-12">Photo Gallery</h2>
                 {bandPageContent?.photos && bandPageContent.photos.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {bandPageContent.photos.map((photo, index) => (
                             <div key={index} className="rounded-lg overflow-hidden shadow-lg group">
                                 <img src={photo} alt={`Live Show ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"/>
                             </div>
                         ))}
                     </div>
                 ) : (
                     <p className="text-center text-gray-400">Photos coming soon.</p>
                 )}
             </div>
        </section>

        <section className="py-20 md:py-24">
             <div className="container mx-auto px-6">
                 <h2 className="text-4xl text-center font-playfair text-white font-bold mb-12">Video Gallery</h2>
                 {bandPageContent?.videos && bandPageContent.videos.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-8">
                         {bandPageContent.videos.map((videoId, index) => (
                             <div key={index} className="rounded-lg overflow-hidden shadow-lg group aspect-video">
                                <iframe 
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen>
                                </iframe>
                             </div>
                         ))}
                     </div>
                 ) : (
                     <p className="text-center text-gray-400">Videos coming soon.</p>
                 )}
             </div>
        </section>
    </div> 
    ); 
};
const ArtistsPage = ({ setCurrentPage, setSelectedArtist, artists }) => { 
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All Genres');

    const filteredArtists = artists.filter(artist => {
        const nameMatch = artist.name.toLowerCase().includes(searchQuery.toLowerCase());
        const genreMatch = selectedGenre === 'All Genres' || artist.specialty === selectedGenre;
        return nameMatch && genreMatch;
    });

    const genres = ['All Genres', ...new Set(artists.map(artist => artist.specialty))];

    return ( 
    <div className="pt-24 md:pt-32 bg-slate-950 min-h-screen fade-in"> 
        <section className="text-center py-16 bg-gray-900"> 
            <div className="container mx-auto px-6"> 
                <h1 className="text-4xl md:text-6xl font-playfair text-white font-bold heading-glow">Our Talented Artists</h1> 
                <p className="text-lg md:text-xl text-teal-300 mt-4">Discover the voices that define our sound.</p> 
            </div> 
        </section> 
        <section className="py-8 sticky top-[85px] bg-slate-950/80 backdrop-blur-md z-40 border-b border-slate-700/50"> 
            <div className="container mx-auto px-6"> 
                <div className="grid md:grid-cols-3 gap-4"> 
                    <div className="relative"> 
                        <input type="text" placeholder="Search by name..." className="form-input pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/> 
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/> 
                    </div> 
                    <div className="relative"> 
                        <select className="form-input custom-select" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}> 
                            {genres.map(genre => <option key={genre} className="bg-white text-black">{genre}</option>)}
                        </select> 
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"> <ChevronDown size={20} /> </div> 
                    </div> 
                </div> 
            </div> 
        </section> 
        <section className="py-12 md:py-16"> 
            <div className="container mx-auto px-6"> 
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"> 
                    {filteredArtists.map((artist, i) => ( 
                    <div key={artist.id} onClick={() => { setSelectedArtist(artist); setCurrentPage('artistProfile'); }} className="bg-gray-900 rounded-lg shadow-lg overflow-hidden group cursor-pointer animate-fade-in-up" style={{animationDelay: `${i * 100}ms`}}> 
                        <div className="relative"> 
                            <img src={artist.img} alt={artist.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" /> 
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div> 
                            <div className="absolute bottom-0 left-0 p-4"> 
                                <h3 className="text-xl font-bold text-white">{artist.name}</h3> 
                                <p className="text-teal-400">{artist.specialty}</p> 
                            </div> 
                        </div> 
                    </div> 
                    ))} 
                </div> 
            </div> 
        </section> 
    </div> 
    ); 
};
const ArtistProfilePage = ({ artist, setCurrentPage }) => { if (!artist) { return ( <div className="page-container"> <h1 className="text-red-500">Artist not found!</h1> <button onClick={() => setCurrentPage('artists')} className="btn-secondary mt-8">Back to Artists</button> </div> ) } return ( <div className="pt-24 md:pt-32 bg-slate-950 text-white fade-in"> <div className="container mx-auto px-6"> <button onClick={() => setCurrentPage('artists')} className="flex items-center gap-2 text-teal-400 hover:text-teal-200 mb-8"> <ChevronLeft size={20} /> Back to All Artists </button> <div className="md:flex gap-12"> <div className="md:w-1/3 mb-8 md:mb-0"> <img src={artist.img} alt={artist.name} className="rounded-lg shadow-2xl w-full hover-lift" /> <button onClick={() => setCurrentPage('contact')} className="btn-primary w-full mt-8 text-lg py-4">Book This Artist</button> </div> <div className="md:w-2/3"> <h1 className="text-4xl md:text-6xl font-playfair font-bold heading-glow">{artist.name}</h1> <p className="text-xl text-teal-300 mt-2">{artist.specialty}</p> <div className="my-8 border-t border-slate-700"></div> <h2 className="text-2xl font-bold mb-4">About the Artist</h2> <p className="text-gray-300 leading-relaxed">{artist.bio || "Detailed biography coming soon."}</p> <div className="my-8 border-t border-slate-700"></div> <h2 className="text-2xl font-bold mb-4">Voice Samples</h2> <div className="space-y-4"> {artist.samples && artist.samples.length > 0 ? artist.samples.map((sample, index) => ( <div key={index} className="bg-gray-900 p-4 rounded-md transition-all hover:bg-slate-800/50"> <p className="text-white mb-2 font-semibold">{sample.title}</p> {sample.src.includes('soundcloud.com') ? ( <SoundCloudPlayer url={sample.src} /> ) : ( <audio controls src={sample.src} className="w-full h-10"> Your browser does not support the audio element. </audio> )} </div> )) : <p className="text-gray-400">Voice samples coming soon.</p>} </div> <div className="my-8 border-t border-slate-700"></div> <h2 className="text-2xl font-bold mb-4">Gallery</h2> <div className="grid grid-cols-2 md:grid-cols-3 gap-4"> {artist.gallery && artist.gallery.length > 0 ? artist.gallery.map((imgSrc, index) => ( <img key={index} src={imgSrc} alt={`${artist.name} gallery ${index+1}`} className="rounded-lg object-cover aspect-square hover-lift"/> )) : <p className="text-gray-400 col-span-full">Gallery coming soon.</p>} </div> </div> </div> </div> <div className="h-24"></div> </div> ); }
const ClassesPage = ({ setCurrentPage, setSelectedCourse, courses }) => { 
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedLevel, setSelectedLevel] = useState('All Levels');
    const [selectedInstructor, setSelectedInstructor] = useState('All Instructors');

    const instructors = ['All Instructors', ...new Set(courses.map(course => course.instructor))];

    const filteredCourses = courses.filter(course => {
        const categoryMatch = selectedCategory === 'All Categories' || course.category === selectedCategory;
        const levelMatch = selectedLevel === 'All Levels' || course.level === selectedLevel;
        const instructorMatch = selectedInstructor === 'All Instructors' || course.instructor === selectedInstructor;
        return categoryMatch && levelMatch && instructorMatch;
    });
    
    return ( 
    <div className="pt-24 md:pt-32 bg-slate-950 min-h-screen fade-in"> 
        <section className="text-center py-16 bg-gray-900"> 
            <div className="container mx-auto px-6"> 
                <h1 className="text-4xl md:text-6xl font-playfair text-white font-bold heading-glow">Nishaad Art Academy</h1> 
                <p className="text-lg md:text-xl text-teal-300 mt-4">Learn from the best, from anywhere.</p> 
            </div> 
        </section> 
        <section className="py-8 sticky top-[85px] bg-slate-950/80 backdrop-blur-md z-40 border-b border-slate-700/50"> 
            <div className="container mx-auto px-6"> 
                <div className="grid md:grid-cols-3 gap-4"> 
                    <div className="relative"> 
                        <select className="form-input custom-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}> 
                            <option>All Categories</option> 
                            <option>Vocals</option> 
                            <option>Instrumental</option> 
                        </select> 
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"> <ChevronDown size={20} /> </div> 
                    </div> 
                    <div className="relative"> 
                        <select className="form-input custom-select" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}> 
                            <option>All Levels</option> 
                            <option>Beginner</option> 
                            <option>Intermediate</option> 
                            <option>Advanced</option> 
                        </select> 
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"> <ChevronDown size={20} /> </div> 
                    </div> 
                    <div className="relative"> 
                        <select className="form-input custom-select" value={selectedInstructor} onChange={(e) => setSelectedInstructor(e.target.value)}> 
                           {instructors.map(instructor => <option key={instructor}>{instructor}</option>)}
                        </select> 
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"> <ChevronDown size={20} /> </div> 
                    </div> 
                </div> 
            </div> 
        </section> 
        <section className="py-12 md:py-16"> 
            <div className="container mx-auto px-6"> 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {filteredCourses.map((course,i) => ( <div key={course.id} className="bg-gray-900 border border-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col group animate-fade-in-up" style={{animationDelay: `${i * 100}ms`}}> <div className="overflow-hidden"> <img src={course.img} alt={course.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"/> </div> <div className="p-6 flex flex-col flex-grow"> <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3> <p className="text-sm text-gray-400 mb-4">By {course.instructor}</p> <div className="flex items-center gap-6 text-sm text-gray-300 mb-4"> <span className="flex items-center gap-2"><BarChart size={16} className="text-teal-400"/>{course.level}</span> <span className="flex items-center gap-2"><Clock size={16} className="text-teal-400"/>{course.duration}</span> </div> <p className="text-gray-400 mb-6 flex-grow">{course.description}</p> <button onClick={() => { setSelectedCourse(course); setCurrentPage('courseDetail'); }} className="btn-primary mt-auto w-full">View Details</button> </div> </div> ))} </div> 
            </div> 
        </section> 
    </div> 
    ); 
};
const CourseDetailPage = ({ course, setCurrentPage }) => { if (!course) { return ( <div className="page-container"> <h1 className="text-red-500">Course not found!</h1> <button onClick={() => setCurrentPage('classes')} className="btn-secondary mt-8">Back to All Courses</button> </div> ) } return ( <div className="pt-24 md:pt-32 bg-slate-950 text-white fade-in"> <div className="container mx-auto px-6"> <button onClick={() => setCurrentPage('classes')} className="flex items-center gap-2 text-teal-400 hover:text-teal-200 mb-8"> <ChevronLeft size={20} /> Back to All Courses </button> <div className="lg:flex gap-12"> <div className="lg:w-2/3"> <p className="text-teal-400 font-semibold">{course.category}</p> <h1 className="text-4xl md:text-5xl font-playfair font-bold mt-2 heading-glow">{course.title}</h1> <p className="text-lg text-gray-300 mt-4">{course.description}</p> <div className="my-8 border-t border-slate-700"></div> <h2 className="text-2xl font-bold mb-4">What You'll Learn (Syllabus)</h2> <ul className="space-y-3"> {course.syllabus && course.syllabus.length > 0 ? course.syllabus.map((item, index) => ( <li key={index} className="flex items-start gap-3"> <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" /> <span>{item}</span> </li> )) : <p className="text-gray-400">Syllabus coming soon.</p>} </ul> <div className="my-8 border-t border-slate-700"></div> <h2 className="text-2xl font-bold mb-4">About the Instructor</h2> <div className="flex items-center gap-4"> {course.instructorImg ? <img src={course.instructorImg} alt={course.instructor} className="rounded-full w-20 h-20 object-cover"/> : <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-2xl font-bold">{course.instructor.split(' ').map(n => n[0]).join('')}</div>} <div> <h3 className="text-xl font-bold">{course.instructor}</h3> <p className="text-gray-400">{course.instructorBio}</p> </div> </div> </div> <div className="lg:w-1/3 mt-12 lg:mt-0"> <div className="sticky top-28 bg-gray-900 rounded-lg p-8 shadow-2xl border border-slate-700"> <img src={course.img} alt={course.title} className="w-full h-48 object-cover rounded-md mb-6"/> <p className="text-3xl font-bold text-center mb-4">{course.price}</p> <button onClick={() => setCurrentPage('contact')} className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-3 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/30" > <GraduationCap size={22} /> Enroll Now </button> <div className="mt-6 text-sm text-gray-400 space-y-3"> <p className="flex items-center gap-3"><BarChart size={16}/> <strong>Level:</strong> {course.level}</p> <p className="flex items-center gap-3"><Clock size={16}/> <strong>Duration:</strong> {course.duration}</p> <p className="flex items-center gap-3"><Users size={16}/> <strong>Instructor:</strong> {course.instructor}</p> </div> </div> </div> </div> </div> <div className="h-24"></div> </div> ); };
const AboutPage = ({setCurrentPage, aboutPageContent}) => { 
    const teamMembers = aboutPageContent?.teamMembers || [];
    return ( 
    <div className="pt-24 md:pt-32 bg-slate-950 text-white fade-in"> 
        <section className="text-center py-16 bg-gray-900"> 
            <div className="container mx-auto px-6"> 
                <h1 className="text-4xl md:text-6xl font-playfair font-bold heading-glow">The Story of Nishaad Art</h1> 
                <p className="text-lg md:text-xl text-teal-300 mt-4">More than a label, we are a family of musicians.</p> 
            </div> 
        </section> 
        <section className="py-20 md:py-24"> 
            <div className="container mx-auto px-6 md:flex items-center gap-12"> 
                <div className="md:w-1/2 mb-8 md:mb-0"> 
                    <img src={aboutPageContent?.journeyImageUrl || "https://placehold.co/600x450/1e293b/FFFFFF?text=Our+Journey"} className="rounded-lg shadow-xl hover-lift" alt="Nishaad Art Journey" /> 
                </div> 
                <div className="md:w-1/2"> 
                    <h2 className="text-3xl font-playfair font-bold mb-6">Our Journey</h2> 
                    <p className="text-gray-300 text-lg mb-4">Nishaad Art was founded in 2011 by Chandrakant Wagh, a passionate musician with a vision to create a space where art and artists could thrive. It started as a small recording studio with a big dream: to produce authentic music and provide a launchpad for deserving talent.</p> 
                    <p className="text-gray-300 text-lg">Today, we have grown into a multi-faceted music company offering production, artist management, and education, but our core philosophy remains the same: to honor the spirit of music in everything we do.</p> 
                </div> 
            </div> 
        </section> 
        <section className="py-20 md:py-24 bg-gray-900"> 
            <div className="container mx-auto px-6"> 
                <div className="md:flex gap-8 text-center"> 
                    <div className="md:w-1/2 mb-12 md:mb-0"> 
                        <Target size={48} className="mx-auto mb-4 text-teal-400"/> 
                        <h2 className="text-3xl font-playfair font-bold mb-4">Our Mission</h2> 
                        <p className="text-gray-300 text-lg max-w-lg mx-auto">To create a supportive and collaborative ecosystem that empowers artists, students, and creators to achieve their full musical potential and produce work that inspires the world.</p> 
                    </div> 
                    <div className="md:w-1/2"> 
                        <Eye size={48} className="mx-auto mb-4 text-teal-400"/> 
                        <h2 className="text-3xl font-playfair font-bold mb-4">Our Vision</h2> 
                        <p className="text-gray-300 text-lg max-w-lg mx-auto">To be a leading global name in independent music, recognized for our artistic integrity, quality productions, and our commitment to discovering and nurturing the next generation of musical talent.</p> 
                    </div> 
                </div> 
            </div> 
        </section> 
        <section className="py-20 md:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold">Meet The Core Team</h2>
                    <p className="text-lg text-gray-400 mt-4">The minds and hearts behind Nishaad Art.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-12">
                    {teamMembers.map((member, i) => (
                    <div key={i} className="text-center animate-fade-in-up max-w-xs" style={{animationDelay: `${i * 150}ms`}}>
                        <img src={member.img} alt={member.name} className="w-48 h-48 rounded-full mx-auto shadow-lg mb-4 hover-lift" />
                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                        <p className="text-teal-400 font-semibold mb-2">{member.title}</p>
                        <p className="text-gray-400">{member.bio}</p>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    </div> 
    );
};
const ContactPage = ({setCurrentPage, contactPageContent}) => { 
    const info = contactPageContent || {};
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return ( 
    <div className="pt-24 md:pt-32 bg-slate-950 text-white fade-in"> 
        <section className="text-center py-16 bg-gray-900"> 
            <div className="container mx-auto px-6"> 
                <h1 className="text-4xl md:text-6xl font-playfair font-bold heading-glow">Get In Touch</h1> 
                <p className="text-lg md:text-xl text-teal-300 mt-4">We're here to listen. Let's create something beautiful together.</p> 
            </div> 
        </section> 
        <section className="py-20 md:py-24"> 
            <div className="container mx-auto px-6"> 
                <div className="lg:flex gap-16 bg-gray-900/50 border border-slate-800 p-8 md:p-12 rounded-lg shadow-2xl"> 
                    <div className="lg:w-1/3 mb-12 lg:mb-0"> 
                        <h2 className="text-3xl font-playfair font-bold mb-6">Contact Information</h2> 
                        <div className="space-y-6"> 
                            <div className="flex items-start gap-4"> 
                                <MapPin size={24} className="text-teal-400 mt-1"/> 
                                <div> 
                                    <h3 className="font-bold">Our Studio</h3> 
                                    <p className="text-gray-400">{info.address || "123 Music Lane, Swargate, Pune, Maharashtra 411037"}</p> 
                                </div> 
                            </div> 
                            <div className="flex items-start gap-4"> 
                                <Mail size={24} className="text-teal-400 mt-1"/> 
                                <div> 
                                    <h3 className="font-bold">Email Us</h3> 
                                    <p className="text-gray-400">{info.email || "connect@nishaadart.com"}</p> 
                                </div> 
                            </div> 
                            <div className="flex items-start gap-4"> 
                                <Phone size={24} className="text-teal-400 mt-1"/> 
                                <div> 
                                    <h3 className="font-bold">Call Us</h3> 
                                    <p className="text-gray-400">{info.phone || "+91 98765 43210"}</p> 
                                </div> 
                            </div> 
                        </div> 
                        <div className="mt-8 pt-6 border-t border-slate-700"> 
                            <h3 className="font-bold mb-4">Follow Us</h3> 
                            <div className="flex space-x-4"> 
                                <a href={info.instagramUrl || "#"} className="social-link"><Instagram size={24}/></a> 
                                <a href={info.facebookUrl || "#"} className="social-link"><Facebook size={24}/></a> 
                                <a href={info.youtubeUrl || "#"} className="social-link"><Youtube size={24}/></a> 
                            </div> 
                        </div> 
                    </div> 
                    <div className="lg:w-2/3"> 
                        <h2 className="text-3xl font-playfair font-bold mb-6">Send Us a Message</h2> 
                        <form action="https://formsubmit.co/nishaadart@gmail.com" method="POST" className="space-y-6">
                            {/* FormSubmit specific hidden inputs */}
                            <input type="hidden" name="_subject" value="New Contact Form Submission from Nishaad Art Website!"></input>
                            <input type="hidden" name="_captcha" value="false"></input>
                            
                            <div className="grid md:grid-cols-2 gap-6"> 
                                <div> 
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label> 
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input" required /> 
                                </div> 
                                <div> 
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label> 
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required /> 
                                </div> 
                            </div> 
                            <div> 
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label> 
                                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="form-input" required /> 
                            </div> 
                            <div> 
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label> 
                                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className="form-input" required></textarea> 
                            </div> 
                            <div> 
                                <button type="submit" className="btn-primary w-full py-4 text-lg">Send Message</button> 
                            </div> 
                        </form> 
                    </div> 
                </div> 
            </div> 
        </section> 
    </div> 
    );
};
const AdminLoginPage = ({ setCurrentPage, setIsAdminLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsAdminLoggedIn(true);
            setCurrentPage('adminDashboard');
        } catch (err) {
            setError("Failed to login. Please check your email and password.");
            console.error(err);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 fade-in">
            <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-playfair text-white text-center mb-6 heading-glow">Admin Login</h1>
                {error && <p className="bg-red-500/20 text-red-300 p-3 rounded-md mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="admin-email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input type="email" id="admin-email" value={email} onChange={(e) => setEmail(e.target.value)} className="admin-form-input" required />
                    </div>
                    <div>
                        <label htmlFor="admin-password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input type="password" id="admin-password" value={password} onChange={(e) => setPassword(e.target.value)} className="admin-form-input" required />
                    </div>
                    <button type="submit" className="btn-primary w-full py-3 text-lg">Login</button>
                </form>
            </div>
        </div>
    );
};

const AdminDashboardPage = ({ setCurrentPage, setIsAdminLoggedIn, artists, fetchArtists, courses, fetchCourses, homepageContent, fetchHomepageContent, bandPageContent, fetchBandPageContent, aboutPageContent, fetchAboutPageContent, contactPageContent, fetchContactPageContent }) => {
    const [artistToEdit, setArtistToEdit] = useState(null);
    const [artistToDelete, setArtistToDelete] = useState(null);
    const [courseToEdit, setCourseToEdit] = useState(null);
    const [courseToDelete, setCourseToDelete] = useState(null);

    const [bandImageUrl, setBandImageUrl] = useState("");
    const [bandPageData, setBandPageData] = useState({ photos: [], videos: [], aboutImageUrl: '' });
    const [aboutPageData, setAboutPageData] = useState({ teamMembers: [], journeyImageUrl: '' });
    const [contactData, setContactData] = useState({ address: '', email: '', phone: '', instagramUrl: '#', facebookUrl: '#', youtubeUrl: '#' });
    
    const [newBandPhoto, setNewBandPhoto] = useState("");
    const [newBandVideo, setNewBandVideo] = useState("");

    useEffect(() => {
        if(homepageContent) setBandImageUrl(homepageContent.bandImageUrl || "");
        if(bandPageContent) setBandPageData({ photos: bandPageContent.photos || [], videos: bandPageContent.videos || [], aboutImageUrl: bandPageContent.aboutImageUrl || '' });
        if(aboutPageContent) setAboutPageData({ teamMembers: aboutPageContent.teamMembers || [], journeyImageUrl: aboutPageContent.journeyImageUrl || '' });
        if(contactPageContent) setContactData(contactPageContent);
    }, [homepageContent, bandPageContent, aboutPageContent, contactPageContent]);

    const handleSaveHomepage = async () => {
        try {
            const homepageRef = doc(db, "siteContent", "homepage");
            await setDoc(homepageRef, { bandImageUrl: bandImageUrl }, { merge: true });
            alert("Homepage updated successfully!");
            fetchHomepageContent();
        } catch (error) {
            console.error("Error updating homepage: ", error);
            alert("Failed to update homepage.");
        }
    };
    
    const handleSaveBandPage = async () => {
        try {
            const bandPageRef = doc(db, "siteContent", "nishaadBand");
            await setDoc(bandPageRef, bandPageData, { merge: true });
            alert("Nishaad Band page updated successfully!");
            fetchBandPageContent();
        } catch (error) {
            console.error("Error updating Nishaad Band page: ", error);
            alert("Failed to update Nishaad Band page.");
        }
    };

    const handleSaveAboutPage = async () => {
         try {
            const aboutPageRef = doc(db, "siteContent", "aboutPage");
            await setDoc(aboutPageRef, aboutPageData, { merge: true });
            alert("About page updated successfully!");
            fetchAboutPageContent();
        } catch (error) {
            console.error("Error updating About page: ", error);
            alert("Failed to update About page.");
        }
    };

    const handleSaveContactPage = async () => {
        try {
            const contactPageRef = doc(db, "siteContent", "contactPage");
            await setDoc(contactPageRef, contactData, { merge: true });
            alert("Contact page updated successfully!");
            fetchContactPageContent();
        } catch (error) {
            console.error("Error updating Contact page: ", error);
            alert("Failed to update Contact page.");
        }
    };
    
    const handleContactDataChange = (e) => {
        const { name, value } = e.target;
        setContactData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddBandPhoto = () => { if (newBandPhoto) { setBandPageData(prev => ({...prev, photos: [...prev.photos, newBandPhoto]})); setNewBandPhoto(""); } };
    const handleRemoveBandPhoto = (index) => { setBandPageData(prev => ({...prev, photos: prev.photos.filter((_, i) => i !== index)})); };
    const handleAddBandVideo = () => { if (newBandVideo) { setBandPageData(prev => ({...prev, videos: [...prev.videos, newBandVideo]})); setNewBandVideo(""); } };
    const handleRemoveBandVideo = (index) => { setBandPageData(prev => ({...prev, videos: prev.videos.filter((_, i) => i !== index)})); };

    const handleLogout = () => { signOut(auth); setIsAdminLoggedIn(false); setCurrentPage('home'); };

    const handleDeleteArtistClick = (artist) => setArtistToDelete(artist);
    const handleEditArtistClick = (artist) => setArtistToEdit(artist);
    const handleAddArtistClick = () => setArtistToEdit({});
    const confirmDeleteArtist = async () => { if (artistToDelete) { await deleteDoc(doc(db, "artists", artistToDelete.id)); setArtistToDelete(null); fetchArtists(); } };
    
    const handleDeleteCourseClick = (course) => setCourseToDelete(course);
    const handleEditCourseClick = (course) => setCourseToEdit(course);
    const handleAddCourseClick = () => setCourseToEdit({});
    const confirmDeleteCourse = async () => { if (courseToDelete) { await deleteDoc(doc(db, "courses", courseToDelete.id)); setCourseToDelete(null); fetchCourses(); } };
    
    const ArtistForm = ({ artist, onDone }) => {
        const [formData, setFormData] = useState({ name: artist?.name || '', specialty: artist?.specialty || '', bio: artist?.bio || '', img: artist?.img || '', samples: artist?.samples || [], gallery: artist?.gallery || [] });
        const [newSampleTitle, setNewSampleTitle] = useState("");
        const [newSampleSrc, setNewSampleSrc] = useState("");
        const [newGalleryUrl, setNewGalleryUrl] = useState("");
        const isEditMode = !!artist?.id;
        useEffect(() => { if (artist) { setFormData({ name: artist.name || '', specialty: artist.specialty || '', bio: artist.bio || '', img: artist.img || '', samples: artist.samples || [], gallery: artist.gallery || [] }); } }, [artist]);
        const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
        const handleAddSample = () => { if (newSampleTitle && newSampleSrc) { const newSample = { title: newSampleTitle, src: newSampleSrc }; setFormData(prev => ({...prev, samples: [...prev.samples, newSample]})); setNewSampleTitle(""); setNewSampleSrc(""); } };
        const handleRemoveSample = (index) => { setFormData(prev => ({...prev, samples: prev.samples.filter((_, i) => i !== index)})); };
        const handleAddGalleryImage = () => { if (newGalleryUrl) { setFormData(prev => ({...prev, gallery: [...prev.gallery, newGalleryUrl]})); setNewGalleryUrl(""); } };
        const handleRemoveGalleryImage = (index) => { setFormData(prev => ({...prev, gallery: prev.gallery.filter((_, i) => i !== index)})); };
        const handleSave = async (e) => { e.preventDefault(); try { if (isEditMode) { const artistRef = doc(db, "artists", artist.id); await updateDoc(artistRef, formData); } else { await addDoc(collection(db, "artists"), formData); } onDone(); } catch (error) { console.error("Error saving artist: ", error); } };
        return ( <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"> <div className="bg-gray-900 p-8 rounded-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto"> <button onClick={onDone} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24}/></button> <h2 className="text-2xl font-bold mb-6 text-white">{isEditMode ? "Edit Artist" : "Add New Artist"}</h2> <form onSubmit={handleSave} className="space-y-4"> <input name="name" type="text" value={formData.name} onChange={handleChange} className="admin-form-input" placeholder="Artist Name" required /> <input name="specialty" type="text" value={formData.specialty} onChange={handleChange} className="admin-form-input" placeholder="Specialty" required/> <input name="img" type="text" value={formData.img} onChange={handleChange} className="admin-form-input" placeholder="Image URL" required/> <textarea name="bio" value={formData.bio} onChange={handleChange} className="admin-form-input" rows="3" placeholder="Biography"></textarea> <div className="border-t border-slate-700 pt-4"> <h3 className="text-lg font-bold text-white mb-2">Manage Voice Samples</h3> {formData.samples.map((sample, index) => ( <div key={index} className="flex items-center gap-2 mb-2 p-2 bg-slate-800 rounded"> <p className="flex-grow text-white text-sm">{sample.title}</p> <button type="button" onClick={() => handleRemoveSample(index)} className="text-red-500 hover:text-red-300"><Trash2 size={16}/></button> </div> ))} <div className="flex gap-2"> <input type="text" value={newSampleTitle} onChange={e => setNewSampleTitle(e.target.value)} className="admin-form-input" placeholder="Sample Title"/> <input type="text" value={newSampleSrc} onChange={e => setNewSampleSrc(e.target.value)} className="admin-form-input" placeholder="Audio or SoundCloud URL"/> <button type="button" onClick={handleAddSample} className="btn-primary p-3"><PlusCircle size={20}/></button> </div> </div> <div className="border-t border-slate-700 pt-4"> <h3 className="text-lg font-bold text-white mb-2">Manage Gallery</h3> <div className="grid grid-cols-3 gap-2 mb-2"> {formData.gallery.map((url, index) => ( <div key={index} className="relative group"> <img src={url} className="w-full h-24 object-cover rounded"/> <button type="button" onClick={() => handleRemoveGalleryImage(index)} className="absolute top-1 right-1 bg-red-600/70 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button> </div> ))} </div> <div className="flex gap-2"> <input type="text" value={newGalleryUrl} onChange={e => setNewGalleryUrl(e.target.value)} className="admin-form-input" placeholder="Image URL"/> <button type="button" onClick={handleAddGalleryImage} className="btn-primary p-3"><PlusCircle size={20}/></button> </div> </div> <div className="flex justify-end gap-4 pt-4"> <button type="button" onClick={onDone} className="btn-secondary">Cancel</button> <button type="submit" className="btn-primary">Save Changes</button> </div> </form> </div> </div> )
    }
    
    const CourseForm = ({ course, onDone }) => {
        const [formData, setFormData] = useState({ title: course?.title || '', instructor: course?.instructor || '', description: course?.description || '', img: course?.img || '', price: course?.price || '', level: course?.level || 'Beginner', duration: course?.duration || '', category: course?.category || 'Vocals', instructorBio: course?.instructorBio || '', instructorImg: course?.instructorImg || '', syllabus: course?.syllabus || [], });
        const [newSyllabusPoint, setNewSyllabusPoint] = useState("");
        const isEditMode = !!course?.id;
        useEffect(() => { if (course) { setFormData({ title: course.title || '', instructor: course.instructor || '', description: course.description || '', img: course.img || '', price: course.price || '', level: course.level || 'Beginner', duration: course.duration || '', category: course.category || 'Vocals', instructorBio: course.instructorBio || '', instructorImg: course.instructorImg || '', syllabus: course.syllabus || [], }); } }, [course]);
        const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); }
        const handleAddSyllabusPoint = () => { if (newSyllabusPoint) { setFormData(prev => ({...prev, syllabus: [...prev.syllabus, newSyllabusPoint]})); setNewSyllabusPoint(""); } };
        const handleRemoveSyllabusPoint = (index) => { setFormData(prev => ({...prev, syllabus: prev.syllabus.filter((_, i) => i !== index)})); };
        const handleSave = async (e) => { e.preventDefault(); try { if (isEditMode) { const courseRef = doc(db, "courses", course.id); await updateDoc(courseRef, formData); } else { await addDoc(collection(db, "courses"), formData); } onDone(); } catch (error) { console.error("Error saving course: ", error); } };
        return ( <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"> <div className="bg-gray-900 p-8 rounded-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto"> <button onClick={onDone} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24}/></button> <h2 className="text-2xl font-bold mb-6 text-white">{isEditMode ? "Edit Course" : "Add New Course"}</h2> <form onSubmit={handleSave} className="space-y-4"> <input name="title" type="text" value={formData.title} onChange={handleChange} className="admin-form-input" placeholder="Course Title" required /> <input name="instructor" type="text" value={formData.instructor} onChange={handleChange} className="admin-form-input" placeholder="Instructor" required/> <input name="instructorImg" type="text" value={formData.instructorImg} onChange={handleChange} className="admin-form-input" placeholder="Instructor Image URL"/> <textarea name="instructorBio" value={formData.instructorBio} onChange={handleChange} className="admin-form-input" rows="2" placeholder="Instructor Bio"></textarea> <input name="img" type="text" value={formData.img} onChange={handleChange} className="admin-form-input" placeholder="Course Image URL" required/> <input name="price" type="text" value={formData.price} onChange={handleChange} className="admin-form-input" placeholder="Price (e.g., ₹12,000)" required/> <input name="duration" type="text" value={formData.duration} onChange={handleChange} className="admin-form-input" placeholder="Duration (e.g., 3 Months)" required/> <div className="grid grid-cols-2 gap-4"> <select name="level" value={formData.level} onChange={handleChange} className="admin-form-input"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select> <select name="category" value={formData.category} onChange={handleChange} className="admin-form-input"><option>Vocals</option><option>Instrumental</option></select> </div> <textarea name="description" value={formData.description} onChange={handleChange} className="admin-form-input" rows="3" placeholder="Course Description"></textarea> <div className="border-t border-slate-700 pt-4"> <h3 className="text-lg font-bold text-white mb-2">Manage Syllabus</h3> {formData.syllabus.map((point, index) => ( <div key={index} className="flex items-center gap-2 mb-2 p-2 bg-slate-800 rounded"> <p className="flex-grow text-white text-sm">{point}</p> <button type="button" onClick={() => handleRemoveSyllabusPoint(index)} className="text-red-500 hover:text-red-300"><Trash2 size={16}/></button> </div> ))} <div className="flex gap-2"> <input type="text" value={newSyllabusPoint} onChange={e => setNewSyllabusPoint(e.target.value)} className="admin-form-input" placeholder="Add syllabus point"/> <button type="button" onClick={handleAddSyllabusPoint} className="btn-primary p-3"><PlusCircle size={20}/></button> </div> </div> <div className="flex justify-end gap-4 pt-4"> <button type="button" onClick={onDone} className="btn-secondary">Cancel</button> <button type="submit" className="btn-primary">Save Course</button> </div> </form> </div> </div> )
    }

    return (
        <div className="pt-24 md:pt-32 bg-slate-950 min-h-screen">
             <div className="container mx-auto px-6 pb-24">
                 <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-playfair heading-glow">Admin Dashboard</h1>
                     <button onClick={handleLogout} className="btn-secondary flex items-center gap-2">
                        <LogOut size={20}/>
                        Logout
                    </button>
                 </div>

                {/* Homepage Management Section */}
                <div className="bg-gray-900 p-8 rounded-lg border border-slate-800 mb-12">
                    <h2 className="text-2xl font-bold mb-6">Manage Home Page</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="bandImage" className="block text-sm font-medium text-gray-300 mb-2">Nishaad Band Image URL (Homepage)</label>
                            <input id="bandImage" type="text" value={bandImageUrl} onChange={(e) => setBandImageUrl(e.target.value)} className="admin-form-input" />
                        </div>
                        <div className="text-right">
                           <button onClick={handleSaveHomepage} className="btn-primary">Save Homepage</button>
                        </div>
                    </div>
                </div>
                
                 {/* Nishaad Band Page Management */}
                <div className="bg-gray-900 p-8 rounded-lg border border-slate-800 mb-12">
                    <h2 className="text-2xl font-bold mb-6">Manage Nishaad Band Page</h2>
                     <div className="space-y-4">
                         <div>
                            <label htmlFor="bandAboutImage" className="block text-sm font-medium text-gray-300 mb-2">About Section Image URL</label>
                            <input id="bandAboutImage" type="text" value={bandPageData.aboutImageUrl} onChange={(e) => setBandPageData({...bandPageData, aboutImageUrl: e.target.value})} className="admin-form-input" />
                        </div>
                        <div className="border-t border-slate-700 pt-4">
                            <h3 className="text-lg font-bold text-white mb-2">Photo Gallery</h3>
                             {bandPageData.photos.map((url, index) => (
                               <div key={index} className="flex items-center gap-2 mb-2 p-2 bg-slate-800 rounded">
                                   <p className="flex-grow text-white text-sm truncate">{url}</p>
                                   <button type="button" onClick={() => handleRemoveBandPhoto(index)} className="text-red-500 hover:text-red-300"><Trash2 size={16}/></button>
                               </div>
                            ))}
                            <div className="flex gap-2">
                                <input type="text" value={newBandPhoto} onChange={e => setNewBandPhoto(e.target.value)} className="admin-form-input" placeholder="Add new photo URL"/>
                                <button type="button" onClick={handleAddBandPhoto} className="btn-primary p-3"><PlusCircle size={20}/></button>
                            </div>
                        </div>
                         <div className="border-t border-slate-700 pt-4">
                            <h3 className="text-lg font-bold text-white mb-2">Video Gallery (YouTube IDs)</h3>
                             {bandPageData.videos.map((videoId, index) => (
                               <div key={index} className="flex items-center gap-2 mb-2 p-2 bg-slate-800 rounded">
                                   <p className="flex-grow text-white text-sm truncate">{videoId}</p>
                                   <button type="button" onClick={() => handleRemoveBandVideo(index)} className="text-red-500 hover:text-red-300"><Trash2 size={16}/></button>
                               </div>
                            ))}
                            <div className="flex gap-2">
                                <input type="text" value={newBandVideo} onChange={e => setNewBandVideo(e.target.value)} className="admin-form-input" placeholder="Add new YouTube Video ID"/>
                                <button type="button" onClick={handleAddBandVideo} className="btn-primary p-3"><PlusCircle size={20}/></button>
                            </div>
                        </div>
                        <div className="text-right pt-4">
                           <button onClick={handleSaveBandPage} className="btn-primary">Save Band Page</button>
                        </div>
                    </div>
                </div>

                {/* Contact Page Management */}
                <div className="bg-gray-900 p-8 rounded-lg border border-slate-800 mb-12">
                    <h2 className="text-2xl font-bold mb-6">Manage Contact Page</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="contactAddress" className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                            <input id="contactAddress" name="address" type="text" value={contactData.address} onChange={handleContactDataChange} className="admin-form-input" />
                        </div>
                        <div>
                            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input id="contactEmail" name="email" type="email" value={contactData.email} onChange={handleContactDataChange} className="admin-form-input" />
                        </div>
                        <div>
                            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                            <input id="contactPhone" name="phone" type="text" value={contactData.phone} onChange={handleContactDataChange} className="admin-form-input" />
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 border-t border-slate-700 pt-4">
                            <div>
                               <label htmlFor="contactInsta" className="block text-sm font-medium text-gray-300 mb-2">Instagram URL</label>
                               <input id="contactInsta" name="instagramUrl" type="text" value={contactData.instagramUrl} onChange={handleContactDataChange} className="admin-form-input" />
                            </div>
                            <div>
                               <label htmlFor="contactFb" className="block text-sm font-medium text-gray-300 mb-2">Facebook URL</label>
                               <input id="contactFb" name="facebookUrl" type="text" value={contactData.facebookUrl} onChange={handleContactDataChange} className="admin-form-input" />
                            </div>
                            <div>
                               <label htmlFor="contactYt" className="block text-sm font-medium text-gray-300 mb-2">YouTube URL</label>
                               <input id="contactYt" name="youtubeUrl" type="text" value={contactData.youtubeUrl} onChange={handleContactDataChange} className="admin-form-input" />
                            </div>
                        </div>
                        <div className="text-right pt-4">
                           <button onClick={handleSaveContactPage} className="btn-primary">Save Contact Page</button>
                        </div>
                    </div>
                </div>

                 {/* Artists Management Section */}
                 <div className="bg-gray-900 p-8 rounded-lg border border-slate-800 mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Manage Artists</h2>
                         <button onClick={handleAddArtistClick} className="btn-primary flex items-center gap-2">
                            <PlusCircle size={20}/>
                            Add New Artist
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-700">
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Specialty</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {artists.map(artist => (
                                    <tr key={artist.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                        <td className="p-4 font-semibold">{artist.name}</td>
                                        <td className="p-4 text-gray-400">{artist.specialty}</td>
                                        <td className="p-4 space-x-4">
                                            <button onClick={() => handleEditArtistClick(artist)} className="text-teal-400 hover:text-teal-200 inline-flex items-center gap-1"><Edit size={16}/> Edit</button>
                                            <button onClick={() => handleDeleteArtistClick(artist)} className="text-red-500 hover:text-red-300 inline-flex items-center gap-1"><Trash2 size={16}/> Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </div>

                  {/* Courses Management Section */}
                  <div className="bg-gray-900 p-8 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Manage Courses</h2>
                         <button onClick={handleAddCourseClick} className="btn-primary flex items-center gap-2">
                            <PlusCircle size={20}/>
                            Add New Course
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-700">
                                    <th className="p-4">Course Title</th>
                                    <th className="p-4">Instructor</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map(course => (
                                    <tr key={course.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                        <td className="p-4 font-semibold">{course.title}</td>
                                        <td className="p-4 text-gray-400">{course.instructor}</td>
                                        <td className="p-4 space-x-4">
                                            <button onClick={() => handleEditCourseClick(course)} className="text-teal-400 hover:text-teal-200 inline-flex items-center gap-1"><Edit size={16}/> Edit</button>
                                            <button onClick={() => handleDeleteCourseClick(course)} className="text-red-500 hover:text-red-300 inline-flex items-center gap-1"><Trash2 size={16}/> Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div>
            {artistToEdit && <ArtistForm artist={artistToEdit.id ? artistToEdit : null} onDone={() => { setArtistToEdit(null); fetchArtists(); }} />}
            {artistToDelete && (
                 <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
                    <div className="bg-gray-900 p-8 rounded-lg shadow-2xl text-center">
                        <AlertTriangle className="text-red-500 mx-auto h-12 w-12 mb-4"/>
                        <h2 className="text-xl font-bold text-white mb-2">Confirm Deletion</h2>
                        <p className="text-gray-300 mb-6">Are you sure you want to delete "{artistToDelete.name}"?</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => setArtistToDelete(null)} className="btn-secondary">Cancel</button>
                            <button onClick={confirmDeleteArtist} className="btn-primary bg-red-600 hover:bg-red-500 text-white">Yes, Delete</button>
                        </div>
                    </div>
                 </div>
            )}
            {courseToEdit && <CourseForm course={courseToEdit.id ? courseToEdit : null} onDone={() => { setCourseToEdit(null); fetchCourses(); }} />}
            {courseToDelete && (
                 <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
                    <div className="bg-gray-900 p-8 rounded-lg shadow-2xl text-center">
                        <AlertTriangle className="text-red-500 mx-auto h-12 w-12 mb-4"/>
                        <h2 className="text-xl font-bold text-white mb-2">Confirm Deletion</h2>
                        <p className="text-gray-300 mb-6">Are you sure you want to delete the course "{courseToDelete.title}"?</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => setCourseToDelete(null)} className="btn-secondary">Cancel</button>
                            <button onClick={confirmDeleteCourse} className="btn-primary bg-red-600 hover:bg-red-500 text-white">Yes, Delete</button>
                        </div>
                    </div>
                 </div>
            )}
        </div>
    );
};


// --- Main App Component (The 'Brain' of the website) ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [artists, setArtists] = useState([]);
    const [courses, setCourses] = useState([]);
    const [homepageContent, setHomepageContent] = useState(null);
    const [bandPageContent, setBandPageContent] = useState(null);
    const [aboutPageContent, setAboutPageContent] = useState(null);
    const [contactPageContent, setContactPageContent] = useState(null);
    const [footerClickCount, setFooterClickCount] = useState(0);
    
    const fetchArtists = async () => { try { const artistsCollection = collection(db, 'artists'); const artistSnapshot = await getDocs(artistsCollection); const artistList = artistSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); setArtists(artistList); } catch (error) { console.error("Error fetching artists:", error); } };
    const fetchCourses = async () => { try { const coursesCollection = collection(db, 'courses'); const courseSnapshot = await getDocs(coursesCollection); const courseList = courseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); setCourses(courseList); } catch (error) { console.error("Error fetching courses:", error); } };
    const fetchHomepageContent = async () => { try { const docRef = doc(db, "siteContent", "homepage"); const docSnap = await getDoc(docRef); if (docSnap.exists()) { setHomepageContent(docSnap.data()); } else { console.log("No such document!"); } } catch (error) { console.error("Error fetching homepage content:", error); } };
    const fetchBandPageContent = async () => { try { const docRef = doc(db, "siteContent", "nishaadBand"); const docSnap = await getDoc(docRef); if (docSnap.exists()) { setBandPageContent(docSnap.data()); } else { console.log("No such document!"); } } catch (error) { console.error("Error fetching band page content:", error); } };
    const fetchAboutPageContent = async () => { try { const docRef = doc(db, "siteContent", "aboutPage"); const docSnap = await getDoc(docRef); if (docSnap.exists()) { setAboutPageContent(docSnap.data()); } else { console.log("No such document!"); } } catch (error) { console.error("Error fetching about page content:", error); } };
    const fetchContactPageContent = async () => { try { const docRef = doc(db, "siteContent", "contactPage"); const docSnap = await getDoc(docRef); if (docSnap.exists()) { setContactPageContent(docSnap.data()); } else { console.log("No contact page document!"); } } catch (error) { console.error("Error fetching contact page content:", error); } };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setIsAdminLoggedIn(true);
            } else {
                setIsAdminLoggedIn(false);
            }
            setIsLoading(false);
        });

        fetchArtists();
        fetchCourses();
        fetchHomepageContent();
        fetchBandPageContent();
        fetchAboutPageContent();
        fetchContactPageContent();

        return () => unsubscribe();
    }, []);

    const handleFooterClick = () => {
        const newCount = footerClickCount + 1;
        setFooterClickCount(newCount);
        if (newCount >= 5) {
            setCurrentPage('adminLogin');
            setFooterClickCount(0);
        }
    };

    const renderPage = () => {
        if (isAdminLoggedIn) {
            return <AdminDashboardPage 
                        setCurrentPage={setCurrentPage} 
                        setIsAdminLoggedIn={setIsAdminLoggedIn} 
                        artists={artists}
                        fetchArtists={fetchArtists}
                        courses={courses}
                        fetchCourses={fetchCourses}
                        homepageContent={homepageContent}
                        fetchHomepageContent={fetchHomepageContent}
                        bandPageContent={bandPageContent}
                        fetchBandPageContent={fetchBandPageContent}
                        aboutPageContent={aboutPageContent}
                        fetchAboutPageContent={fetchAboutPageContent}
                        contactPageContent={contactPageContent}
                        fetchContactPageContent={fetchContactPageContent}
                    />;
        }

        switch (currentPage) {
            case 'home': return <HomePage setCurrentPage={setCurrentPage} artists={artists} courses={courses} homepageContent={homepageContent}/>;
            case 'studio': return <StudioPage setCurrentPage={setCurrentPage} />;
            case 'band': return <NishaadBandPage setCurrentPage={setCurrentPage} bandPageContent={bandPageContent}/>;
            case 'artists': return <ArtistsPage setCurrentPage={setCurrentPage} setSelectedArtist={setSelectedArtist} artists={artists} />;
            case 'artistProfile': return <ArtistProfilePage artist={selectedArtist} setCurrentPage={setCurrentPage} />;
            case 'classes': return <ClassesPage setCurrentPage={setCurrentPage} setSelectedCourse={setSelectedCourse} courses={courses} />;
            case 'courseDetail': return <CourseDetailPage course={selectedCourse} setCurrentPage={setCurrentPage} />;
            case 'about': return <AboutPage setCurrentPage={setCurrentPage} aboutPageContent={aboutPageContent} />;
            case 'contact': return <ContactPage setCurrentPage={setCurrentPage} contactPageContent={contactPageContent}/>;
            case 'adminLogin': return <AdminLoginPage setCurrentPage={setCurrentPage} setIsAdminLoggedIn={setIsAdminLoggedIn} />;
            default: return <HomePage setCurrentPage={setCurrentPage} artists={artists} courses={courses} homepageContent={homepageContent}/>;
        }
    };
    
    const navigate = (page) => {
        setCurrentPage(page);
        setIsMenuOpen(false); 
        window.scrollTo(0, 0);
    };

    if (isLoading) {
        return (
            <div className="preloader">
                <div className="preloader-logo">Nishaad Art</div>
            </div>
        )
    }

    return (
        <div className="bg-slate-950 text-gray-200 font-inter">
           { !isAdminLoggedIn && (
            <header className="glassmorphism fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#" onClick={() => navigate('home')} className="text-2xl font-bold font-playfair text-white text-glow-subtle">Nishaad Art</a>
                    
                    <nav className="hidden md:flex space-x-6">
                        <a href="#" onClick={() => navigate('home')} className="nav-link">Home</a>
                        <a href="#" onClick={() => navigate('band')} className="nav-link">Nishaad Band</a>
                        <a href="#" onClick={() => navigate('studio')} className="nav-link">Studio</a>
                        <a href="#" onClick={() => navigate('artists')} className="nav-link">Artists</a>
                        <a href="#" onClick={() => navigate('classes')} className="nav-link">Classes</a>
                         <a href="#" onClick={() => navigate('about')} className="nav-link">About</a>
                        <a href="#" onClick={() => navigate('contact')} className="nav-link">Contact</a>
                    </nav>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white z-50">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {isMenuOpen && (
                     <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-slate-950/95 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in-fast">
                        <nav className="flex flex-col space-y-8 text-center">
                             <a href="#" onClick={() => navigate('home')} className="mobile-nav-link">Home</a>
                             <a href="#" onClick={() => navigate('band')} className="mobile-nav-link">Nishaad Band</a>
                             <a href="#" onClick={() => navigate('studio')} className="mobile-nav-link">Studio</a>
                             <a href="#" onClick={() => navigate('artists')} className="mobile-nav-link">Artists</a>
                             <a href="#" onClick={() => navigate('classes')} className="mobile-nav-link">Classes</a>
                             <a href="#" onClick={() => navigate('about')} className="mobile-nav-link">About Us</a>
                             <a href="#" onClick={() => navigate('contact')} className="mobile-nav-link">Contact</a>
                        </nav>
                    </div>
                )}
            </header>
           )}

            <main>
                {renderPage()}
            </main>
            
            {!isAdminLoggedIn && (
            <footer className="bg-gray-900 border-t border-slate-800">
                <div className="container mx-auto px-6 py-8 text-center text-gray-400">
                    <p onClick={handleFooterClick} className="cursor-pointer">&copy; {new Date().getFullYear()} Nishaad Art. All Rights Reserved.</p>
                    <p className="text-sm mt-2">Designed with passion.</p>
                </div>
            </footer>
            )}
            
            <style>{`
                :root {
                    --glow-color: hsl(180, 100%, 70%); /* Cyan/Teal glow */
                    --glow-color-heading: hsl(280, 100%, 80%); /* Purple glow */
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; }
                }

                @keyframes pulse-slow {
                    50% { opacity: 0.4; transform: scale(1.1); }
                }
                
                @keyframes preloader-anim {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }

                .preloader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #020617;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                }
                .preloader-logo {
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    color: white;
                    animation: preloader-anim 2s infinite ease-in-out;
                    text-shadow: 0 0 10px var(--glow-color), 0 0 25px var(--glow-color);
                }

                .fade-in { animation: fade-in 0.8s ease-in-out; }
                .fade-in-fast { animation: fade-in 0.3s ease-in-out; }
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
                .animation-delay-300 { animation-delay: 0.3s; }
                .animation-delay-600 { animation-delay: 0.6s; }
                .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
                
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #020617; /* Slate 950 */
                }
                .bg-slate-950 { background-color: #020617; }
                .bg-gray-900 { background-color: #111827; }
                .font-playfair {
                    font-family: 'Playfair Display', serif;
                }
                .hero-bg {
                    background-image: linear-gradient(to bottom, rgba(2, 6, 23, 0.7), rgba(2, 6, 23, 1)), url('https://placehold.co/1920x1080/000000/FFFFFF?text=Soulful+Music');
                    background-size: cover;
                    background-position: center;
                }
                .band-hero-bg {
                    background-image: linear-gradient(to bottom, rgba(2, 6, 23, 0.7), rgba(2, 6, 23, 1)), url('https://placehold.co/1920x1080/000000/FFFFFF?text=Nishaad+Band+Live');
                    background-size: cover;
                    background-position: center;
                }
                .glassmorphism {
                    background: rgba(2, 6, 23, 0.5); /* Slate 950 with opacity */
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(51, 65, 85, 0.3);
                }
                
                /* --- Standard CSS Rules (Replaced @apply) --- */
                .btn-primary {
                    background-color: #14b8a6;
                    color: #000000;
                    font-weight: 700;
                    padding: 0.75rem 2rem;
                    border-radius: 9999px;
                    box-shadow: 0 10px 15px -3px rgba(20, 184, 166, 0.3), 0 4px 6px -4px rgba(20, 184, 166, 0.3);
                    transition: all 0.3s ease-in-out;
                }
                .btn-primary:hover {
                    background-color: #2dd4bf;
                    transform: scale(1.05);
                }

                .btn-secondary {
                    background-color: transparent;
                    border: 2px solid #14b8a6;
                    color: #2dd4bf;
                    font-weight: 600;
                    padding: 0.75rem 2rem;
                    border-radius: 9999px;
                    transition: all 0.3s ease-in-out;
                }
                .btn-secondary:hover {
                    background-color: #14b8a6;
                    color: #000000;
                    transform: scale(1.05);
                }

                .service-card-wrapper {
                    cursor: pointer;
                }
                .service-card {
                    background-color: rgba(17, 24, 39, 0.5);
                    border: 1px solid #1f2937;
                    padding: 2rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    text-align: center;
                    transition: all 0.3s ease-in-out;
                    height: 100%;
                }
                .service-card:hover {
                    transform: translateY(-0.5rem);
                    box-shadow: 0 0 15px 0 rgba(20, 184, 166, 0.1);
                    border-color: #0d9488;
                }

                .testimonial-card {
                    background-color: rgba(17, 24, 39, 0.5);
                    border: 1px solid #1f2937;
                    padding: 2rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    text-align: center;
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }

                .page-container {
                    width: 100%;
                    margin-left: auto; margin-right: auto;
                    padding-left: 1.5rem; padding-right: 1.5rem;
                    padding-top: 8rem; padding-bottom: 8rem;
                    text-align: center; color: white;
                }
                @media (min-width: 640px) { .page-container { max-width: 640px; } }
                @media (min-width: 768px) { .page-container { max-width: 768px; } }
                @media (min-width: 1024px) { .page-container { max-width: 1024px; } }
                @media (min-width: 1280px) { .page-container { max-width: 1280px; } }

                .page-container h1 {
                    font-size: 2.25rem; line-height: 2.5rem;
                    font-family: 'Playfair Display', serif;
                    font-weight: 700; margin-bottom: 1rem;
                }
                @media (min-width: 768px) {
                    .page-container h1 { font-size: 3.75rem; line-height: 1; }
                }

                .nav-link {
                    color: #d1d5db; font-weight: 500;
                    transition: all 0.3s ease-in-out;
                    position: relative; padding-top: 0.5rem; padding-bottom: 0.5rem;
                }
                .nav-link:hover { color: white; }
                .nav-link::after {
                    content: ''; position: absolute;
                    bottom: 0; left: 0;
                    width: 0; height: 2px;
                    background-color: #14b8a6;
                    transition: all 0.3s ease-in-out;
                }
                .nav-link:hover::after { width: 100%; }

                .mobile-nav-link {
                    font-size: 1.875rem; line-height: 2.25rem;
                    font-weight: 700; color: #e5e7eb;
                    transition: color 0.3s ease-in-out;
                }
                .mobile-nav-link:hover { color: #14b8a6; }
                
                .form-input, .custom-select {
                    width: 100%;
                    background-color: #1e293b;
                    border: 1px solid #334155;
                    border-radius: 0.375rem;
                    padding: 0.75rem 1rem;
                    color: #ffffff;
                    transition: all 0.3s ease-in-out;
                }
                .custom-select {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                }
                .form-input:focus, .custom-select:focus {
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                    border-color: #14b8a6;
                    box-shadow: 0 0 0 2px #14b8a6;
                }
                .form-input::placeholder { color: #94a3b8; }
                
                .admin-form-input {
                    width: 100%;
                    background-color: #e5e7eb;
                    border: 1px solid #9ca3af;
                    border-radius: 0.375rem;
                    padding: 0.75rem 1rem;
                    color: #111827;
                    transition: all 0.3s ease-in-out;
                }
                .admin-form-input:focus {
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                    border-color: #14b8a6;
                    box-shadow: 0 0 0 2px #14b8a6;
                }
                .admin-form-input::placeholder { color: #6b7280; }

                .form-input:-webkit-autofill,
                .form-input:-webkit-autofill:hover,
                .form-input:-webkit-autofill:focus,
                .form-input:-webkit-autofill:active {
                    -webkit-text-fill-color: white !important;
                    -webkit-box-shadow: 0 0 0 30px #1e293b inset !important;
                    transition: background-color 5000s ease-in-out 0s;
                }

                .admin-form-input:-webkit-autofill,
                .admin-form-input:-webkit-autofill:hover,
                .admin-form-input:-webkit-autofill:focus,
                .admin-form-input:-webkit-autofill:active {
                    -webkit-text-fill-color: #111827 !important;
                    -webkit-box-shadow: 0 0 0 30px #e5e7eb inset !important;
                    transition: background-color 5000s ease-in-out 0s;
                }
                
                .social-link {
                    display: inline-block;
                    padding: 0.5rem;
                    border-radius: 9999px;
                    background-color: #1f2937;
                    color: #9ca3af;
                    transition: all 0.3s ease-in-out;
                }
                .social-link:hover {
                    background-color: #14b8a6;
                    color: #000000;
                }

                .text-glow {
                    text-shadow: 0 0 10px var(--glow-color), 0 0 25px var(--glow-color);
                }
                 .text-glow-subtle {
                    text-shadow: 0 0 8px var(--glow-color);
                }
                .heading-glow {
                     text-shadow: 0 0 15px var(--glow-color-heading);
                }
                .hover-lift {
                    transition: transform 0.5s ease-out;
                }
                 .hover-lift:hover {
                    transform: translateY(-8px);
                }
            `}</style>
        </div>
    );
}
