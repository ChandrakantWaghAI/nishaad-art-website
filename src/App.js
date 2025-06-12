import React, { useState, useEffect, useCallback } from 'react';
import { Mic, Music, Users, GraduationCap, Menu, X, Sliders, Podcast, MessageSquare, Layers, Zap, Search, ChevronLeft, ChevronDown, BarChart, Clock, CheckCircle, Target, Eye, Mail, Phone, MapPin, Instagram, Facebook, Youtube, LogOut, PlusCircle, Trash2, Edit, AlertTriangle, Star } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';

// NOTE: Hi Firebase config agdi barobar ahe. Ya la badlu naka.
const firebaseConfig = {
  apiKey: "AIzaSyClH028xxx8b-yQxWLTBX0GSey2so8Q2V0",
  authDomain: "nishaadartwebsite.firebaseapp.com",
  projectId: "nishaadartwebsite",
  storageBucket: "nishaadartwebsite.appspot.com",
  messagingSenderId: "1050797126503",
  appId: "1:1050797126503:web:4d983c9b537e14583375c2"
};

// Firebase Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Helper Data
const studioServicesData = [
    { icon: Mic, title: "Vocal & Instrument Recording", description: "Crystal-clear recording for vocals and instruments." },
    { icon: Sliders, title: "Mixing & Mastering", description: "Professional mixing and mastering to balance your tracks." },
    { icon: Layers, title: "Music Arrangement", description: "Comprehensive music arrangement and production." },
    { icon: MessageSquare, title: "Dubbing & Voice-Overs", description: "High-quality recording for films, ads, and audiobooks." },
    { icon: Podcast, title: "Podcast Production", description: "End-to-end podcast recording, editing, and production." },
    { icon: Music, title: "Cover Songs & Backing Tracks", description: "Create high-quality cover songs or get custom backing tracks." },
];

// SoundCloud Player Component
const SoundCloudPlayer = ({ url }) => {
    const [embedHtml, setEmbedHtml] = useState('');

    useEffect(() => {
        if (url) {
            fetch(`https://soundcloud.com/oembed?format=json&url=${url}&maxheight=166`)
                .then(response => response.json())
                .then(data => setEmbedHtml(data.html))
                .catch(error => console.error("Error fetching SoundCloud embed:", error));
        }
    }, [url]);

    return <div dangerouslySetInnerHTML={{ __html: embedHtml }} />;
};


// --- Page Components ---

const HomePage = ({ setCurrentPage, homepageContent }) => {
    const bandImageUrl = homepageContent?.bandImageUrl || 'https://placehold.co/600x450/1e293b/FFFFFF?text=Nishaad+Band';
    const testimonials = homepageContent?.testimonials || [];

    return (
        <div className="fade-in">
            <section className="hero-bg min-h-screen flex items-center justify-center text-center text-white relative overflow-hidden">
                 <div className="absolute inset-0 bg-black opacity-60"></div>
                 <div className="relative z-10 px-6">
                    <h1 className="text-5xl md:text-7xl font-playfair font-bold leading-tight mb-4">Welcome to Nishaad Art</h1>
                    <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-8">Where Every Note Comes to Life.</p>
                    <div className="space-y-4 sm:space-y-0 sm:space-x-4">
                        <button onClick={() => setCurrentPage('artists')} className="btn-primary">Explore Artists</button>
                        <button onClick={() => setCurrentPage('classes')} className="btn-secondary">Join Classes</button>
                    </div>
                </div>
            </section>
            
            <section className="py-20 md:py-24 bg-slate-950">
                 <div className="container mx-auto px-6 md:flex items-center gap-12">
                     <div className="md:w-1/2 mb-8 md:mb-0">
                        <img src={bandImageUrl} className="rounded-lg shadow-2xl" alt="Nishaad Band Live Performance" />
                    </div>
                    <div className="md:w-1/2">
                        <p className="text-teal-400 font-bold uppercase tracking-wider mb-2">Live Music</p>
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Meet Nishaad Band</h2>
                        <p className="text-gray-300 text-lg mb-8">Bring energy and soul to your events with Nishaad Band. Unforgettable performances for weddings, corporate events, and private parties.</p>
                         <button onClick={() => setCurrentPage('band')} className="btn-primary">Explore the Band</button>
                    </div>
                 </div>
            </section>

            <section className="py-20 md:py-24 bg-gray-900">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-16">Our Core Services</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div onClick={() => setCurrentPage('studio')} className="service-card-wrapper cursor-pointer">
                            <div className="service-card bg-gray-900/50 border border-slate-800 p-8 rounded-lg">
                                <Music size={48} className="mx-auto mb-4 text-teal-400" />
                                <h3 className="text-2xl font-bold text-white mb-2">Music Production</h3>
                                <p className="text-gray-400">High-quality audio recording, mixing, and mastering.</p>
                            </div>
                        </div>
                        <div onClick={() => setCurrentPage('band')} className="service-card-wrapper cursor-pointer">
                             <div className="service-card bg-gray-900/50 border border-slate-800 p-8 rounded-lg">
                                 <Zap size={48} className="mx-auto mb-4 text-teal-400" />
                                <h3 className="text-2xl font-bold text-white mb-2">Live Musical Events</h3>
                                <p className="text-gray-400">Soulful live concerts, corporate shows, and private events.</p>
                            </div>
                        </div>
                         <div onClick={() => setCurrentPage('artists')} className="service-card-wrapper cursor-pointer">
                             <div className="service-card bg-gray-900/50 border border-slate-800 p-8 rounded-lg">
                                 <Users size={48} className="mx-auto mb-4 text-teal-400" />
                                <h3 className="text-2xl font-bold text-white mb-2">Artist Management</h3>
                                <p className="text-gray-400">We discover, nurture, and manage talented artists.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-24 bg-slate-950">
                 <div className="container mx-auto px-6">
                     <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-16">Words From Our Community</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {testimonials.map((testimonial, i) => (
                            <div key={i} className="testimonial-card bg-gray-900/50 border border-slate-800 p-8 rounded-lg">
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

const StudioPage = ({ setCurrentPage }) => { return ( <div className="pt-24 md:pt-32 bg-slate-950 fade-in"> <section className="text-center py-20 bg-gray-900"> <div className="container mx-auto px-6"> <h1 className="text-4xl md:text-6xl font-playfair font-bold">Our Professional Recording Studio</h1> <p className="text-lg md:text-xl text-teal-300 mt-4">Where Creativity Meets Technology</p> </div> </section> <section className="py-20 md:py-24"> <div className="container mx-auto px-6"> <div className="text-center mb-16"> <h2 className="text-3xl md:text-4xl font-playfair text-white font-bold">Studio Services</h2> <p className="text-gray-400 mt-2">Everything you need to produce broadcast-quality audio.</p> </div> <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> {studioServicesData.map((service, i) => ( <div key={service.title} className="bg-gray-900/50 border border-slate-800 p-8 rounded-lg"> <div className="text-teal-400 mb-4"> <service.icon size={48} /> </div> <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3> <p className="text-gray-400 flex-grow">{service.description}</p> </div> ))} </div> </div> </section> <section className="py-20 bg-gradient-to-r from-teal-600 to-purple-600 text-center text-white"> <div className="container mx-auto px-6"> <h2 className="text-3xl font-bold mb-4">Ready to Record Your Masterpiece?</h2> <p className="max-w-2xl mx-auto mb-8">Let's create something amazing together.</p> <button onClick={() => setCurrentPage('contact')} className="btn-primary bg-white text-teal-700 hover:bg-slate-200">Book a Studio Session</button> </div> </section> </div> );};
const NishaadBandPage = ({ setCurrentPage, bandPageContent }) => {  return ( <div className="pt-20 bg-slate-950 fade-in"> <section className="band-hero-bg text-white text-center flex items-center justify-center min-h-[60vh] relative"> <div className="absolute inset-0 bg-black opacity-60"></div> <div className="relative z-10 px-6"> <h1 className="text-5xl md:text-7xl font-playfair font-bold">Nishaad Band</h1> <p className="text-xl md:text-2xl mt-4 text-teal-300">The Ultimate Live Music Experience</p> </div> </section> <section className="py-20 md:py-24"> <div className="container mx-auto px-6 md:flex items-center gap-16"> <div className="md:w-2/5 mb-8 md:mb-0"> <img src={bandPageContent?.aboutImageUrl || "https://placehold.co/500x500/1e293b/FFFFFF?text=Nishaad+Band"} alt="Nishaad Band" className="rounded-lg shadow-2xl"/> </div> <div className="md:w-3/5"> <h2 className="text-4xl font-playfair text-white font-bold mb-6">About The Band</h2> <p className="text-gray-300 text-lg mb-4">Nishaad Band is the live performance wing of Nishaad Art. Comprising a group of exceptionally talented and experienced musicians, we bring a dynamic and soulful energy to every stage.</p> <p className="text-gray-300 text-lg">From Bollywood hits and classic rock to soulful ghazals and groovy fusion, our versatile repertoire caters to all tastes.</p> </div> </div> </section> <section className="py-20 bg-gradient-to-r from-teal-600 to-purple-600 text-center text-white"> <div className="container mx-auto px-6"> <h2 className="text-3xl font-bold mb-4">Make Your Event Unforgettable</h2> <p className="max-w-2xl mx-auto mb-8">Book Nishaad Band for your wedding, corporate event, or private party!</p> <button onClick={() => setCurrentPage('contact')} className="btn-primary bg-white text-teal-700 hover:bg-slate-200">Book The Band Now</button> </div> </section> <section className="py-20 md:py-24 bg-gray-900"> <div className="container mx-auto px-6"> <h2 className="text-4xl text-center font-playfair text-white font-bold mb-12">Photo Gallery</h2> {bandPageContent?.photos && bandPageContent.photos.length > 0 ? ( <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> {bandPageContent.photos.map((photo, index) => ( <div key={index} className="rounded-lg overflow-hidden shadow-lg group"> <img src={photo} alt={`Live Show ${index + 1}`} className="w-full h-full object-cover"/> </div> ))} </div> ) : ( <p className="text-center text-gray-400">Photos coming soon.</p> )} </div> </section> <section className="py-20 md:py-24"> <div className="container mx-auto px-6"> <h2 className="text-4xl text-center font-playfair text-white font-bold mb-12">Video Gallery</h2> {bandPageContent?.videos && bandPageContent.videos.length > 0 ? ( <div className="grid md:grid-cols-2 gap-8"> {bandPageContent.videos.map((videoId, index) => ( <div key={index} className="rounded-lg overflow-hidden shadow-lg group aspect-video"> <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen> </iframe> </div> ))} </div> ) : ( <p className="text-center text-gray-400">Videos coming soon.</p> )} </div> </section> </div> ); };
const ArtistsPage = ({ setCurrentPage, setSelectedArtist, artists }) => {  const [searchQuery, setSearchQuery] = useState(''); const [selectedGenre, setSelectedGenre] = useState('All Genres'); const filteredArtists = artists.filter(artist => artist.name.toLowerCase().includes(searchQuery.toLowerCase()) && (selectedGenre === 'All Genres' || artist.specialty === selectedGenre)); const genres = ['All Genres', ...new Set(artists.map(artist => artist.specialty))]; return ( <div className="pt-24 md:pt-32 bg-slate-950 min-h-screen fade-in"> <section className="text-center py-16 bg-gray-900"> <div className="container mx-auto px-6"> <h1 className="text-4xl md:text-6xl font-playfair text-white font-bold">Our Talented Artists</h1> <p className="text-lg md:text-xl text-teal-300 mt-4">Discover the voices that define our sound.</p> </div> </section> <section className="py-8 sticky top-[85px] bg-slate-950/80 backdrop-blur-md z-40 border-b border-slate-700/50"> <div className="container mx-auto px-6"> <div className="grid md:grid-cols-3 gap-4"> <div className="relative"> <input type="text" placeholder="Search by name..." className="form-input pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/> <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/> </div> <div className="relative"> <select className="form-input" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}> {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)} </select> <ChevronDown size={20} className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"/> </div> </div> </div> </section> <section className="py-12 md:py-16"> <div className="container mx-auto px-6"> <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"> {filteredArtists.map((artist, i) => ( <div key={artist.id} onClick={() => { setSelectedArtist(artist); setCurrentPage('artistProfile'); }} className="bg-gray-900 rounded-lg shadow-lg overflow-hidden group cursor-pointer"> <div className="relative"> <img src={artist.img} alt={artist.name} className="w-full h-80 object-cover" /> <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div> <div className="absolute bottom-0 left-0 p-4"> <h3 className="text-xl font-bold text-white">{artist.name}</h3> <p className="text-teal-400">{artist.specialty}</p> </div> </div> </div> ))} </div> </div> </section> </div> ); };
const ArtistProfilePage = ({ artist, setCurrentPage }) => { if (!artist) { return null; } return ( <div className="pt-24 md:pt-32 bg-slate-950 text-white fade-in"> <div className="container mx-auto px-6"> <button onClick={() => setCurrentPage('artists')} className="flex items-center gap-2 text-teal-400 hover:text-teal-200 mb-8"> <ChevronLeft size={20} /> Back to All Artists </button> <div className="md:flex gap-12"> <div className="md:w-1/3 mb-8 md:mb-0"> <img src={artist.img} alt={artist.name} className="rounded-lg shadow-2xl w-full" /> <button onClick={() => setCurrentPage('contact')} className="btn-primary w-full mt-8 text-lg py-4">Book This Artist</button> </div> <div className="md:w-2/3"> <h1 className="text-4xl md:text-6xl font-playfair font-bold">{artist.name}</h1> <p className="text-xl text-teal-300 mt-2">{artist.specialty}</p> <div className="my-8 border-t border-slate-700"></div> <h2 className="text-2xl font-bold mb-4">About the Artist</h2> <p className="text-gray-300 leading-relaxed">{artist.bio || "Detailed biography coming soon."}</p> <div className="my-8 border-t border-slate-700"></div> <h2 className="text-2xl font-bold mb-4">Voice Samples</h2> <div className="space-y-4"> {artist.samples && artist.samples.length > 0 ? artist.samples.map((sample, index) => ( <div key={index} className="bg-gray-900 p-4 rounded-md"> <p className="text-white mb-2 font-semibold">{sample.title}</p> {sample.src.includes('soundcloud.com') ? ( <SoundCloudPlayer url={sample.src} /> ) : ( <audio controls src={sample.src} className="w-full h-10"> Your browser does not support audio. </audio> )} </div> )) : <p className="text-gray-400">Voice samples coming soon.</p>} </div> <div className="my-8 border-t border-slate-700"></div> <h2 className="text-2xl font-bold mb-4">Gallery</h2> <div className="grid grid-cols-2 md:grid-cols-3 gap-4"> {artist.gallery && artist.gallery.length > 0 ? artist.gallery.map((imgSrc, index) => ( <img key={index} src={imgSrc} alt={`${artist.name} gallery ${index+1}`} className="rounded-lg object-cover aspect-square"/> )) : <p className="text-gray-400 col-span-full">Gallery coming soon.</p>} </div> </div> </div> </div> <div className="h-24"></div> </div> ); };
const ClassesPage = ({ setCurrentPage, setSelectedCourse, courses }) => {  const [selectedCategory, setSelectedCategory] = useState('All Categories'); const [selectedLevel, setSelectedLevel] = useState('All Levels'); const filteredCourses = courses.filter(course => (selectedCategory === 'All Categories' || course.category === selectedCategory) && (selectedLevel === 'All Levels' || course.level === selectedLevel)); return ( <div className="pt-24 md:pt-32 bg-slate-950 min-h-screen fade-in"> <section className="text-center py-16 bg-gray-900"> <div className="container mx-auto px-6"> <h1 className="text-4xl md:text-6xl font-playfair text-white font-bold">Nishaad Art Academy</h1> <p className="text-lg md:text-xl text-teal-300 mt-4">Learn from the best, from anywhere.</p> </div> </section> <section className="py-8 sticky top-[85px] bg-slate-950/80 backdrop-blur-md z-40 border-b border-slate-700/50"> <div className="container mx-auto px-6"> <div className="grid md:grid-cols-2 gap-4"> <div className="relative"> <select className="form-input" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}> <option>All Categories</option> <option>Vocals</option> <option>Instrumental</option> </select> <ChevronDown size={20} className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"/> </div> <div className="relative"> <select className="form-input" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}> <option>All Levels</option> <option>Beginner</option> <option>Intermediate</option> <option>Advanced</option> </select> <ChevronDown size={20} className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"/> </div> </div> </div> </section> <section className="py-12 md:py-16"> <div className="container mx-auto px-6"> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {filteredCourses.map((course,i) => ( <div key={course.id} className="bg-gray-900 border border-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col group"> <div className="overflow-hidden"> <img src={course.img} alt={course.title} className="w-full h-48 object-cover"/> </div> <div className="p-6 flex flex-col flex-grow"> <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3> <p className="text-sm text-gray-400 mb-4">By {course.instructor}</p> <div className="flex items-center gap-6 text-sm text-gray-300 mb-4"> <span className="flex items-center gap-2"><BarChart size={16} className="text-teal-400"/>{course.level}</span> <span className="flex items-center gap-2"><Clock size={16} className="text-teal-400"/>{course.duration}</span> </div> <p className="text-gray-400 mb-6 flex-grow">{course.description}</p> <button onClick={() => { setSelectedCourse(course); setCurrentPage('courseDetail'); }} className="btn-primary mt-auto w-full">View Details</button> </div> </div> ))} </div> </div> </section> </div> ); };
const CourseDetailPage = ({ course, setCurrentPage }) => { if (!course) { return null; } return ( <div className="pt-24 md:pt-32 bg-slate-950 text-white fade-in"> <div className="container mx-auto px-6"> <button onClick={() => setCurrentPage('classes')} className="flex items-center gap-2 text-teal-400 hover:text-teal-200 mb-8"> <ChevronLeft size={20} /> Back to All Courses </button> <div className="lg:flex gap-12"> <div className="lg:w-2/3"> <p className="text-teal-400 font-semibold">{course.category}</p> <h1 className="text-4xl md:text-5xl font-playfair font-bold mt-2">{course.title}</h1> <p className="text-lg text-gray-300 mt-4">{course.description}</p> <div className="my-8 border-t border-slate-700"></div> <h2 className="text-2xl font-bold mb-4">What You'll Learn (Syllabus)</h2> <ul className="space-y-3"> {course.syllabus && course.syllabus.length > 0 ? course.syllabus.map((item, index) => ( <li key={index} className="flex items-start gap-3"> <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" /> <span>{item}</span> </li> )) : <p className="text-gray-400">Syllabus coming soon.</p>} </ul> <div className="my-8 border-t border-slate-700"></div> <h2 className="text-2xl font-bold mb-4">About the Instructor</h2> <div className="flex items-center gap-4"> {course.instructorImg ? <img src={course.instructorImg} alt={course.instructor} className="rounded-full w-20 h-20 object-cover"/> : <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-2xl font-bold">{course.instructor.split(' ').map(n => n[0]).join('')}</div>} <div> <h3 className="text-xl font-bold">{course.instructor}</h3> <p className="text-gray-400">{course.instructorBio}</p> </div> </div> </div> <div className="lg:w-1/3 mt-12 lg:mt-0"> <div className="sticky top-28 bg-gray-900 rounded-lg p-8 shadow-2xl border border-slate-700"> <img src={course.img} alt={course.title} className="w-full h-48 object-cover rounded-md mb-6"/> <p className="text-3xl font-bold text-center mb-4">{course.price}</p> <button onClick={() => setCurrentPage('contact')} className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-3"> <GraduationCap size={22} /> Enroll Now </button> <div className="mt-6 text-sm text-gray-400 space-y-3"> <p className="flex items-center gap-3"><BarChart size={16}/> <strong>Level:</strong> {course.level}</p> <p className="flex items-center gap-3"><Clock size={16}/> <strong>Duration:</strong> {course.duration}</p> <p className="flex items-center gap-3"><Users size={16}/> <strong>Instructor:</strong> {course.instructor}</p> </div> </div> </div> </div> </div> <div className="h-24"></div> </div> ); };
const AboutPage = ({setCurrentPage, aboutPageContent}) => {  const teamMembers = aboutPageContent?.teamMembers || []; return ( <div className="pt-24 md:pt-32 bg-slate-950 text-white fade-in"> <section className="text-center py-16 bg-gray-900"> <div className="container mx-auto px-6"> <h1 className="text-4xl md:text-6xl font-playfair font-bold">The Story of Nishaad Art</h1> <p className="text-lg md:text-xl text-teal-300 mt-4">More than a label, we are a family of musicians.</p> </div> </section> <section className="py-20 md:py-24"> <div className="container mx-auto px-6 md:flex items-center gap-12"> <div className="md:w-1/2 mb-8 md:mb-0"> <img src={aboutPageContent?.journeyImageUrl || "https://placehold.co/600x450/1e293b/FFFFFF?text=Our+Journey"} className="rounded-lg shadow-xl" alt="Nishaad Art Journey" /> </div> <div className="md:w-1/2"> <h2 className="text-3xl font-playfair font-bold mb-6">Our Journey</h2> <p className="text-gray-300 text-lg mb-4">Nishaad Art was founded in 2011 by Chandrakant Wagh, a passionate musician with a vision to create a space where art and artists could thrive.</p> <p className="text-gray-300 text-lg">Today, we have grown into a multi-faceted music company offering production, artist management, and education.</p> </div> </div> </section> <section className="py-20 md:py-24 bg-gray-900"> <div className="container mx-auto px-6"> <div className="md:flex gap-8 text-center"> <div className="md:w-1/2 mb-12 md:mb-0"> <Target size={48} className="mx-auto mb-4 text-teal-400"/> <h2 className="text-3xl font-playfair font-bold mb-4">Our Mission</h2> <p className="text-gray-300 text-lg max-w-lg mx-auto">To create a supportive ecosystem that empowers artists, students, and creators to achieve their full musical potential.</p> </div> <div className="md:w-1/2"> <Eye size={48} className="mx-auto mb-4 text-teal-400"/> <h2 className="text-3xl font-playfair font-bold mb-4">Our Vision</h2> <p className="text-gray-300 text-lg max-w-lg mx-auto">To be a leading name in independent music, recognized for our artistic integrity and quality productions.</p> </div> </div> </div> </section> <section className="py-20 md:py-24"> <div className="container mx-auto px-6"> <div className="text-center mb-16"> <h2 className="text-4xl md:text-5xl font-playfair font-bold">Meet The Core Team</h2> <p className="text-lg text-gray-400 mt-4">The minds and hearts behind Nishaad Art.</p> </div> <div className="flex flex-wrap justify-center gap-12"> {teamMembers.map((member, i) => ( <div key={i} className="text-center max-w-xs"> <img src={member.img} alt={member.name} className="w-48 h-48 rounded-full mx-auto shadow-lg mb-4" /> <h3 className="text-xl font-bold text-white">{member.name}</h3> <p className="text-teal-400 font-semibold mb-2">{member.title}</p> <p className="text-gray-400">{member.bio}</p> </div> ))} </div> </div> </section> </div> );};
const ContactPage = ({setCurrentPage, contactPageContent}) => {  const info = contactPageContent || {}; return ( <div className="pt-24 md:pt-32 bg-slate-950 text-white fade-in"> <section className="text-center py-16 bg-gray-900"> <div className="container mx-auto px-6"> <h1 className="text-4xl md:text-6xl font-playfair font-bold">Get In Touch</h1> <p className="text-lg md:text-xl text-teal-300 mt-4">We're here to listen. Let's create something beautiful together.</p> </div> </section> <section className="py-20 md:py-24"> <div className="container mx-auto px-6"> <div className="lg:flex gap-16 bg-gray-900/50 border border-slate-800 p-8 md:p-12 rounded-lg shadow-2xl"> <div className="lg:w-1/3 mb-12 lg:mb-0"> <h2 className="text-3xl font-playfair font-bold mb-6">Contact Information</h2> <div className="space-y-6"> <div className="flex items-start gap-4"> <MapPin size={24} className="text-teal-400 mt-1"/> <div> <h3 className="font-bold">Our Studio</h3> <p className="text-gray-400">{info.address || "123 Music Lane, Swargate, Pune"}</p> </div> </div> <div className="flex items-start gap-4"> <Mail size={24} className="text-teal-400 mt-1"/> <div> <h3 className="font-bold">Email Us</h3> <p className="text-gray-400">{info.email || "connect@nishaadart.com"}</p> </div> </div> <div className="flex items-start gap-4"> <Phone size={24} className="text-teal-400 mt-1"/> <div> <h3 className="font-bold">Call Us</h3> <p className="text-gray-400">{info.phone || "+91 98765 43210"}</p> </div> </div> </div> <div className="mt-8 pt-6 border-t border-slate-700"> <h3 className="font-bold mb-4">Follow Us</h3> <div className="flex space-x-4"> <a href={info.instagramUrl || "#"} target="_blank" rel="noopener noreferrer" className="social-link"><Instagram size={24}/></a> <a href={info.facebookUrl || "#"} target="_blank" rel="noopener noreferrer" className="social-link"><Facebook size={24}/></a> <a href={info.youtubeUrl || "#"} target="_blank" rel="noopener noreferrer" className="social-link"><Youtube size={24}/></a> </div> </div> </div> <div className="lg:w-2/3"> <h2 className="text-3xl font-playfair font-bold mb-6">Send Us a Message</h2> <form action="https://formsubmit.co/nishaadart@gmail.com" method="POST" className="space-y-6"> <input type="hidden" name="_subject" value="New Contact Form Submission!"></input> <input type="hidden" name="_captcha" value="false"></input> <input type="text" name="name" className="form-input" placeholder="Full Name" required /> <input type="email" name="email" className="form-input" placeholder="Email Address" required /> <textarea name="message" rows="5" className="form-input" placeholder="Your Message" required></textarea> <button type="submit" className="btn-primary w-full py-4 text-lg">Send Message</button> </form> </div> </div> </div> </section> </div> );};
const AdminLoginPage = ({ setCurrentPage, setIsAdminLoggedIn }) => { const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const handleLogin = async (e) => { e.preventDefault(); setError(''); try { await signInWithEmailAndPassword(auth, email, password); setIsAdminLoggedIn(true); setCurrentPage('adminDashboard'); } catch (err) { setError("Failed to login. Please check credentials."); } }; return ( <div className="min-h-screen flex items-center justify-center bg-slate-950 fade-in"> <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md"> <h1 className="text-3xl font-playfair text-white text-center mb-6">Admin Login</h1> {error && <p className="bg-red-500/20 text-red-300 p-3 rounded-md mb-4">{error}</p>} <form onSubmit={handleLogin} className="space-y-6"> <div> <label htmlFor="admin-email" className="block text-sm font-medium text-gray-300 mb-2">Email</label> <input type="email" id="admin-email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required /> </div> <div> <label htmlFor="admin-password" className="block text-sm font-medium text-gray-300 mb-2">Password</label> <input type="password" id="admin-password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" required /> </div> <button type="submit" className="btn-primary w-full py-3 text-lg">Login</button> </form> </div> </div> ); };
const AdminDashboardPage = ({ setCurrentPage, setIsAdminLoggedIn, artists, fetchArtists, courses, fetchCourses, homepageContent, fetchHomepageContent, bandPageContent, fetchBandPageContent, contactPageContent, fetchContactPageContent }) => { const handleLogout = () => { signOut(auth).then(() => { setIsAdminLoggedIn(false); setCurrentPage('home'); }); }; return ( <div className="pt-24 md:pt-32 bg-slate-950 min-h-screen"> <div className="container mx-auto px-6 pb-24"> <div className="flex justify-between items-center mb-12"> <h1 className="text-4xl font-playfair">Admin Dashboard</h1> <button onClick={handleLogout} className="btn-secondary flex items-center gap-2"> <LogOut size={20}/> Logout </button> </div> {/* Simplified Admin Dashboard */} <div className="bg-gray-900 p-8 rounded-lg border border-slate-800 mb-12"> <h2 className="text-2xl font-bold mb-6">Content Management</h2> <p>Admin features for artists, courses, and pages would be managed here.</p></div> </div> </div> ); };


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
    
    const fetchArtists = useCallback(async () => { try { const querySnapshot = await getDocs(collection(db, 'artists')); setArtists(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); } catch (e) { console.error("Error fetching artists: ", e); }}, []);
    const fetchCourses = useCallback(async () => { try { const querySnapshot = await getDocs(collection(db, 'courses')); setCourses(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); } catch (e) { console.error("Error fetching courses: ", e); }}, []);
    const fetchHomepageContent = useCallback(async () => { try { const docSnap = await getDoc(doc(db, "siteContent", "homepage")); if(docSnap.exists()) setHomepageContent(docSnap.data()); } catch (e) { console.error("Error fetching homepage content: ", e); }}, []);
    const fetchBandPageContent = useCallback(async () => { try { const docSnap = await getDoc(doc(db, "siteContent", "nishaadBand")); if(docSnap.exists()) setBandPageContent(docSnap.data()); } catch (e) { console.error("Error fetching band page content: ", e); }}, []);
    const fetchAboutPageContent = useCallback(async () => { try { const docSnap = await getDoc(doc(db, "siteContent", "aboutPage")); if(docSnap.exists()) setAboutPageContent(docSnap.data()); } catch (e) { console.error("Error fetching about page content: ", e); }}, []);
    const fetchContactPageContent = useCallback(async () => { try { const docSnap = await getDoc(doc(db, "siteContent", "contactPage")); if(docSnap.exists()) setContactPageContent(docSnap.data()); } catch (e) { console.error("Error fetching contact page content: ", e); }}, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setIsAdminLoggedIn(!!user);
            setIsLoading(false);
        });

        fetchArtists();
        fetchCourses();
        fetchHomepageContent();
        fetchBandPageContent();
        fetchAboutPageContent();
        fetchContactPageContent();

        return () => unsubscribe();
    }, [fetchArtists, fetchCourses, fetchHomepageContent, fetchBandPageContent, fetchAboutPageContent, fetchContactPageContent]);
    
    const handleFooterClick = () => {
        setFooterClickCount(prev => prev + 1);
        if (footerClickCount + 1 >= 7) {
            setCurrentPage('adminLogin');
            setFooterClickCount(0);
        }
    };
    
    const navigate = (page) => {
        setCurrentPage(page);
        setIsMenuOpen(false); 
        window.scrollTo(0, 0);
    };

    if (isLoading) {
        return (
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#020617'}}>
                <div style={{fontFamily:'Playfair Display, serif', fontSize:'2rem', color:'white'}}>Nishaad Art</div>
            </div>
        )
    }

    const renderPage = () => {
        if (isAdminLoggedIn) {
            return <AdminDashboardPage 
                setCurrentPage={setCurrentPage} 
                setIsAdminLoggedIn={setIsAdminLoggedIn} 
                artists={artists} fetchArtists={fetchArtists} 
                courses={courses} fetchCourses={fetchCourses} 
                homepageContent={homepageContent} fetchHomepageContent={fetchHomepageContent}
                bandPageContent={bandPageContent} fetchBandPageContent={fetchBandPageContent}
                contactPageContent={contactPageContent} fetchContactPageContent={fetchContactPageContent}
             />;
        }
        switch (currentPage) {
            case 'home': return <HomePage setCurrentPage={setCurrentPage} homepageContent={homepageContent} />;
            case 'band': return <NishaadBandPage setCurrentPage={setCurrentPage} bandPageContent={bandPageContent}/>;
            case 'studio': return <StudioPage setCurrentPage={setCurrentPage} />;
            case 'artists': return <ArtistsPage setCurrentPage={setCurrentPage} setSelectedArtist={setSelectedArtist} artists={artists} />;
            case 'artistProfile': return <ArtistProfilePage artist={selectedArtist} setCurrentPage={setCurrentPage} />;
            case 'classes': return <ClassesPage setCurrentPage={setCurrentPage} setSelectedCourse={setSelectedCourse} courses={courses} />;
            case 'courseDetail': return <CourseDetailPage course={selectedCourse} setCurrentPage={setCurrentPage} />;
            case 'about': return <AboutPage setCurrentPage={setCurrentPage} aboutPageContent={aboutPageContent} />;
            case 'contact': return <ContactPage setCurrentPage={setCurrentPage} contactPageContent={contactPageContent}/>;
            case 'adminLogin': return <AdminLoginPage setCurrentPage={setCurrentPage} setIsAdminLoggedIn={setIsAdminLoggedIn} />;
            default: return <HomePage setCurrentPage={setCurrentPage} homepageContent={homepageContent} />;
        }
    };

    return (
        <div>
           { !isAdminLoggedIn && (
            <header className="glassmorphism fixed top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <button onClick={() => navigate('home')} className="text-2xl font-bold font-playfair text-white">Nishaad Art</button>
                    
                    <nav className="hidden md:flex space-x-6">
                        <button onClick={() => navigate('home')} className="nav-link text-gray-300 hover:text-white">Home</button>
                        <button onClick={() => navigate('band')} className="nav-link text-gray-300 hover:text-white">Nishaad Band</button>
                        <button onClick={() => navigate('studio')} className="nav-link text-gray-300 hover:text-white">Studio</button>
                        <button onClick={() => navigate('artists')} className="nav-link text-gray-300 hover:text-white">Artists</button>
                        <button onClick={() => navigate('classes')} className="nav-link text-gray-300 hover:text-white">Classes</button>
                         <button onClick={() => navigate('about')} className="nav-link text-gray-300 hover:text-white">About</button>
                        <button onClick={() => navigate('contact')} className="nav-link text-gray-300 hover:text-white">Contact</button>
                    </nav>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white z-50">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
                {isMenuOpen && (
                     <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-slate-950/95 flex flex-col items-center justify-center">
                        <nav className="flex flex-col space-y-8 text-center">
                             <button onClick={() => navigate('home')} className="text-2xl font-bold text-white">Home</button>
                             <button onClick={() => navigate('band')} className="text-2xl font-bold text-white">Nishaad Band</button>
                             <button onClick={() => navigate('studio')} className="text-2xl font-bold text-white">Studio</button>
                             <button onClick={() => navigate('artists')} className="text-2xl font-bold text-white">Artists</button>
                             <button onClick={() => navigate('classes')} className="text-2xl font-bold text-white">Classes</button>
                             <button onClick={() => navigate('about')} className="text-2xl font-bold text-white">About Us</button>
                             <button onClick={() => navigate('contact')} className="text-2xl font-bold text-white">Contact</button>
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
                </div>
            </footer>
            )}
        </div>
    );
}

