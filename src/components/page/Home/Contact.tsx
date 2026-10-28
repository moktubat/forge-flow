"use client"
import { useState, useRef, useEffect, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, MapPin, Phone } from 'lucide-react';
import MagneticButton from '@/components/common/MagneticButton';
import SectionHeader from '@/components/common/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const locations = [
    { name: 'DOWNTOWN HQ', address: '123 PERFORMANCE WAY, NY', hours: 'MON-FRI 05-23' },
    { name: 'WESTSIDE STUDIO', address: '456 POWER AVE, NY', hours: 'MON-FRI 06-22' },
    { name: 'INDUSTRIAL PARK', address: '789 RECOVERY RD, NY', hours: 'MON-FRI 05-23' }
];

export default function Contact() {
    const [formSent, setFormSent] = useState(false);

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const formRef = useRef<HTMLDivElement | null>(null);
    const locationsRef = useRef<HTMLDivElement | null>(null);
    const markersRef = useRef<HTMLDivElement[]>([]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setFormSent(true);

        gsap.fromTo(
            '.success-pop',
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
        );

        setTimeout(() => setFormSent(false), 3000);
    };

    // Form reveal
    useEffect(() => {
        if (!formRef.current) return;
        const form = formRef.current;

        const timer = setTimeout(() => {
            gsap.from(form, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: form,
                    start: 'top 80%',
                    once: true,
                },
            });
            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Locations reveal
    useEffect(() => {
        if (!locationsRef.current) return;
        const locations = locationsRef.current;

        const timer = setTimeout(() => {
            gsap.from(Array.from(locations.children), {
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: locations,
                    start: 'top 85%',
                    once: true,
                },
            });
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Markers reveal
    useEffect(() => {
        if (!markersRef.current.length) return;
        const section = sectionRef.current;

        const timer = setTimeout(() => {
            gsap.from(markersRef.current, {
                scale: 0,
                opacity: 0,
                stagger: 0.2,
                duration: 0.6,
                ease: 'back.out(2)',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    once: true,
                },
            });
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section ref={sectionRef} id="contact" className="bg-surface pt-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-[clamp(16px,5vw,80px)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-32">

                    {/* LEFT */}
                    <div className="lg:col-span-5 flex flex-col gap-12">
                        <SectionHeader
                            label="OUR LOCATION"
                            heading="FIND US."
                            accentWord="US."
                            animationClass="your-anim-class"
                        />

                        <div className="flex flex-col gap-10 w-full">
                            <div>
                                <h4 className="flex items-center gap-3 font-display text-xl text-accent">
                                    <MapPin className="w-5 h-5" /> LOCATION
                                </h4>
                                <p className="text-white/50 mt-2">
                                    123 High-Performance Way,<br />Manhattan, New York 10001
                                </p>
                            </div>

                            <div>
                                <h4 className="flex items-center gap-3 font-display text-xl text-accent">
                                    <Phone className="w-5 h-5" /> CONTACT
                                </h4>
                                <div className="flex flex-col text-white/50 mt-2">
                                    <a href="tel:+1234567890" className="hover:text-accent">+1 (234) 567-890</a>
                                    <a href="mailto:hello@gymforge.com" className="hover:text-accent">hello@gymforge.com</a>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-display text-xl text-accent">OPERATING HOURS</h4>
                                <div className="grid grid-cols-2 gap-4 text-white/50 mt-2">
                                    <div>
                                        <span>MON - FRI</span>
                                        <div className="text-white">05:00 - 23:00</div>
                                    </div>
                                    <div>
                                        <span>SAT - SUN</span>
                                        <div className="text-white">06:00 - 21:00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT FORM */}
                    <div ref={formRef} className="lg:col-span-7 w-full">
                        <div className="glass p-10 lg:p-16 rounded-[40px] bg-white/2 border-white/5">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="FULL NAME"
                                        required
                                    />

                                    <input
                                        type="email"
                                        className="input"
                                        placeholder="EMAIL ADDRESS"
                                        required
                                    />
                                </div>

                                <select className="input">
                                    <option>RAW STRENGTH & POWER</option>
                                    <option>WEIGHT LOSS & HIIT</option>
                                    <option>YOGA & FLEXIBILITY</option>
                                    <option>BODYBUILDING & HYPERTROPHY</option>
                                </select>

                                <textarea
                                    rows={4}
                                    className="input"
                                    placeholder="MESSAGE..."
                                />

                                <div className="relative">
                                    <MagneticButton className="w-full py-5 text-xl tracking-[0.2em]">
                                        {formSent ? 'MESSAGE SENT' : 'SEND MESSAGE'}
                                    </MagneticButton>

                                    {formSent && (
                                        <div className="success-pop absolute inset-0 flex items-center justify-center bg-accent rounded-full">
                                            <CheckCircle2 className="w-8 h-8 text-black" />
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAP */}
            <div className="relative h-125 bg-bg border-t border-border">

                <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1920"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40"
                />

                {/* MARKERS */}
                {[
                    {
                        top: '40%',
                        left: '30%',
                        location: 'DOWNTOWN HQ',
                    },
                    {
                        top: '60%',
                        left: '50%',
                        location: 'WESTSIDE STUDIO',
                    },
                    {
                        top: '30%',
                        left: '70%',
                        location: 'INDUSTRIAL PARK',
                    }
                ].map((p, i) => (
                    <div
                        key={i}
                        ref={el => {
                            if (el) markersRef.current[i] = el;
                        }}
                        className="group absolute -translate-x-1/2 -translate-y-1/2 z-30"
                        style={{ top: p.top, left: p.left }}
                    >

                        {/* Tooltip */}
                        <div className="absolute bottom-[140%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-40">
                            <div className="glass px-4 py-3 rounded-2xl border border-white/10 whitespace-nowrap shadow-2xl">
                                <p className="font-display text-sm tracking-[0.15em] text-white">
                                    {p.location}
                                </p>

                                <span className="text-[11px] text-accent tracking-widest">
                                    GYMFORGE LOCATION
                                </span>
                            </div>
                            {/* Arrow */}
                            <div className="w-3 h-3 bg-white/10 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1" />
                        </div>

                        {/* Pin */}
                        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center relative cursor-pointer transition-transform duration-300 group-hover:scale-110">

                            <MapPin className="w-6 h-6 text-black" />

                            {/* Ping */}
                            <div className="absolute inset-0 border-4 border-accent rounded-full animate-ping opacity-30" />

                            {/* Glow */}
                            <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>
                ))}

                {/* LOCATIONS */}
                <div className="absolute bottom-0 w-full p-12 z-10">
                    <div
                        ref={locationsRef}
                        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {locations.map((loc, i) => (
                            <div
                                key={i}
                                className="glass p-8 rounded-2xl hover:bg-white/5 transition"
                            >
                                <h5 className="text-white font-display text-xl">{loc.name}</h5>
                                <p className="text-white/50 text-sm">{loc.address}</p>
                                <span className="text-accent text-[11px] mt-2 block">{loc.hours}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}