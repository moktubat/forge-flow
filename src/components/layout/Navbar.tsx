"use client"
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import MagneticButton from '../common/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    const progressRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!progressRef.current) return;

        gsap.to(progressRef.current, {
            scaleX: 1,
            ease: 'none',
            transformOrigin: 'left center',
            scrollTrigger: {
                trigger: document.documentElement,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
            },
        });
    }, []);

    useEffect(() => {
        if (!dotRef.current) return;

        gsap.to(dotRef.current, {
            opacity: 1,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        });
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Programs', href: '#programs' },
        { name: 'Trainers', href: '#trainers' },
        { name: 'About', href: '#about' },
        { name: 'Blog', href: '#blog' },
    ];

    return (
        <>
            {/* Scroll Progress */}
            <div
                ref={progressRef}
                className="fixed top-0 left-0 h-0.5 w-full bg-accent z-2000 origin-left scale-x-0"
            />

            {/* Navbar */}
            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-1000 transition-all duration-500 ease-out flex items-center px-[clamp(16px,5vw,80px)]',
                    isScrolled
                        ? 'h-14 bg-bg/85 backdrop-blur-xl border-b border-white/10'
                        : 'h-18 bg-transparent'
                )}
            >
                <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-1 group cursor-none">
                        <span className="font-display text-2xl tracking-tighter">
                            GYMFORGE
                        </span>

                        <span
                            ref={dotRef}
                            className="w-2 h-2 rounded-full bg-accent mt-1 opacity-30"
                        />
                    </div>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="group relative font-sans text-[13px] uppercase tracking-wider text-muted hover:text-white transition-colors duration-200 cursor-none"
                            >
                                {link.name}

                                <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-accent transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                        <MagneticButton className="hidden md:block px-6 py-2 text-[15px] tracking-widest">
                            GET STARTED
                        </MagneticButton>

                        {/* Mobile Menu */}
                        <button className="md:hidden flex flex-col gap-1.5 p-2 cursor-none">
                            <span className="w-6 h-0.5 bg-white" />
                            <span className="w-4 h-0.5 bg-white self-end" />
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}