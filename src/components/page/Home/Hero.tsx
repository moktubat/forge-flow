"use client"

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Dumbbell, Zap, Leaf, Snowflake, Timer, Target } from 'lucide-react';
import MagneticButton from '@/components/common/MagneticButton';

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);

    const sidebarIcons = [
        { icon: <Target className="w-4 h-4" />, label: 'GOALS' },
        { icon: <Dumbbell className="w-4 h-4" />, label: 'TRAINING' },
    ];

    const featureIcons = [
        { icon: <Dumbbell className="w-6 h-6" /> },
        { icon: <Zap className="w-6 h-6" /> },
        { icon: <Leaf className="w-6 h-6" /> },
        { icon: <Snowflake className="w-6 h-6" /> },
        { icon: <Target className="w-6 h-6" /> },
        { icon: <Timer className="w-6 h-6" /> },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Badge
            gsap.from('.hero-badge', {
                opacity: 0,
                y: 20,
                duration: 0.4,
                delay: 0.2,
                ease: 'power3.out',
            });

            // Headings reveal
            gsap.from('.hero-line', {
                yPercent: 100,
                stagger: 0.15,
                duration: 0.9,
                delay: 0.4,
                ease: 'power4.out',
            });

            // Paragraph
            gsap.from('.hero-text', {
                opacity: 0,
                duration: 0.6,
                delay: 1,
                ease: 'power2.out',
            });

            // Cards
            gsap.from('.hero-card', {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.7,
                delay: 1.2,
                ease: 'power3.out',
            });

            // Feature icons
            gsap.from('.feature-icon', {
                opacity: 0,
                scale: 0.8,
                stagger: 0.08,
                duration: 0.4,
                delay: 1,
                ease: 'back.out(1.7)',
            });

            // Scroll indicator loop
            gsap.to('.scroll-indicator', {
                y: 10,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });

            // Hover animations
            gsap.utils.toArray<HTMLElement>('.sidebar-btn').forEach((btn) => {
                btn.addEventListener('mouseenter', () => {
                    gsap.to(btn, {
                        scale: 1.1,
                        borderColor: '#C8FF00',
                        duration: 0.25,
                    });
                });

                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn, {
                        scale: 1,
                        borderColor: '#ffffff10',
                        duration: 0.25,
                    });
                });
            });

            gsap.utils.toArray<HTMLElement>('.feature-icon').forEach((icon) => {
                icon.addEventListener('mouseenter', () => {
                    gsap.to(icon, {
                        scale: 1.1,
                        backgroundColor: '#C8FF00',
                        color: '#000',
                        duration: 0.25,
                    });
                });

                icon.addEventListener('mouseleave', () => {
                    gsap.to(icon, {
                        scale: 1,
                        backgroundColor: 'transparent',
                        color: '#C8FF00',
                        duration: 0.25,
                    });
                });
            });

            // Image zoom hover
            gsap.utils.toArray<HTMLElement>('.image-card').forEach((card) => {
                const image = card.querySelector('img');

                card.addEventListener('mouseenter', () => {
                    gsap.to(image, {
                        scale: 1.1,
                        duration: 0.7,
                        ease: 'power3.out',
                    });

                    gsap.to(image, {
                        filter: 'grayscale(0%)',
                        duration: 0.7,
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(image, {
                        scale: 1,
                        duration: 0.7,
                        ease: 'power3.out',
                    });

                    gsap.to(image, {
                        filter: 'grayscale(100%)',
                        duration: 0.7,
                    });
                });
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-svh w-full flex items-center pt-24 px-[clamp(16px,5vw,80px)]"
        >
            {/* Background */}
            <div className="absolute inset-0 z-[-1]">
                <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920"
                    alt="Gym Interior"
                    className="w-full h-full object-cover grayscale opacity-40"
                    referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-linear-to-tr from-bg via-bg/80 to-transparent" />

                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            {/* Left Sidebar */}
            <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-12">
                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/50 -rotate-90">
                    ABOUT
                </span>

                <div className="flex flex-col gap-4">
                    {sidebarIcons.map((item, i) => (
                        <button
                            key={i}
                            className="sidebar-btn w-10 h-10 rounded-full border border-border flex items-center justify-center text-white/50 hover:text-accent transition-colors"
                        >
                            {item.icon}
                        </button>
                    ))}
                </div>

                <div className="w-px h-32 bg-border" />
            </div>

            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 gap-12 items-center mb-20 overflow-visible">
                {/* Main Content */}
                <div className="flex flex-col gap-4">
                    <div className="w-full">
                        <div className="hero-badge glass inline-flex px-4 py-1.5 rounded-full text-[10px] md:text-[12px] tracking-[0.15em] font-sans text-white/50 border-white/10">
                            EST. 2020 · CERTIFIED TRAINERS
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="overflow-hidden">
                            <h1 className="hero-line text-display">EXPERIENCE</h1>
                            <h1 className="hero-line text-display">EXCEPTIONAL</h1>
                        </div>

                        <div className="w-full flex flex-col md:flex-row justify-between md:items-end">
                            <div>
                                <div className="flex items-center gap-4 flex-wrap">
                                    <MagneticButton className="px-10 py-5 text-xl flex items-center gap-3 mt-4 md:mt-0">
                                        JOIN NOW
                                        <ArrowRight className="w-5 h-5 group-hover:-rotate-45deg transition-transform" />
                                    </MagneticButton>

                                    <div className="overflow-hidden">
                                        <h1 className="hero-line text-display text-accent">FITNESS</h1>
                                    </div>
                                </div>

                                <div className="overflow-hidden">
                                    <h1 className="hero-line text-display">TRAINING</h1>
                                </div>
                            </div>
                            {/* Feature Icons */}
                            <div className="grid grid-cols-3 gap-4 overflow-visible mt-4 md:mt-0">
                                {featureIcons.map((item, i) => (
                                    <div
                                        key={i}
                                        className="feature-icon w-16 h-16 md:w-20 md:h-20 rounded-full border border-border flex items-center justify-center text-accent cursor-pointer glass"
                                    >
                                        {item.icon}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="hero-text text-lg md:text-xl text-white/60 font-sans max-w-lg mt-4">
                        Forge your legacy with elite world-class training and a community
                        that pushes boundaries.
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">

                        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Card 1 */}
                            <div className="hero-card image-card relative h-64 overflow-hidden group border border-white/5 rounded-3xl">
                                <img
                                    src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=600"
                                    alt="Trainer Woman"
                                    className="w-full h-full object-cover grayscale"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-bg/90 via-transparent to-transparent" />
                                <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] tracking-widest font-sans uppercase">
                                    ELITE COACHING
                                </div>
                                {/* Bottom label */}
                                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                                    <div>
                                        <p className="font-display text-lg text-white leading-none">COACHING</p>
                                        <span className="font-sans text-[10px] text-accent tracking-widest">PERSONAL · 1:1</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                        <ArrowRight className="w-3 h-3 text-accent -rotate-45" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="hero-card image-card relative h-64 overflow-hidden group border border-white/5 rounded-3xl">
                                <img
                                    src="https://images.unsplash.com/photo-1701481057396-30fddf7775b6?auto=format&fit=crop&q=80&w=600"
                                    alt="Trainer Man"
                                    className="w-full h-full object-cover grayscale"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-bg/90 via-transparent to-transparent" />
                                <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] tracking-widest font-sans uppercase">
                                    STRENGTH PRO
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                                    <div>
                                        <p className="font-display text-lg text-white leading-none">STRENGTH</p>
                                        <span className="font-sans text-[10px] text-accent tracking-widest">GROUP · CLASSES</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                        <ArrowRight className="w-3 h-3 text-accent -rotate-45" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: CTA card — full height */}
                        <div className="hero-card relative h-64 bg-surface rounded-3xl overflow-hidden border border-white/5 flex flex-col">
                            {/* Accent top block */}
                            <div className="bg-accent px-6 pt-6 pb-10 flex flex-col gap-1 relative group cursor-pointer flex-1">
                                {/* bg texture */}
                                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                                <span className="font-sans text-[10px] tracking-[0.2em] text-black/60 uppercase">Begin today</span>
                                <h3 className="font-display text-3xl text-black leading-tight mt-1">
                                    START YOUR<br />JOURNEY.
                                </h3>
                                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black flex items-center justify-center text-white transition-transform duration-300 group-hover:-rotate-45">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Bottom info block */}
                            <div className="px-5 py-4 flex items-center justify-between border-t border-white/5">
                                <div>
                                    <p className="font-sans text-[13px] text-white/80 leading-snug">
                                        Find your strength.
                                    </p>
                                    <span className="font-sans text-[10px] text-accent tracking-widest">500+ MEMBERS</span>
                                </div>
                                <button className="bg-accent text-black text-[10px] font-bold py-2 px-5 rounded-full tracking-widest uppercase hover:bg-white transition-colors shrink-0">
                                    JOIN NOW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase rotate-90 mb-4">
                    SCROLL
                </span>

                <ArrowRight className="w-4 h-4 rotate-90" />
            </div>
        </section>
    );
}