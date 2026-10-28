"use client"

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import MagneticButton from '../common/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const progressRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLSpanElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Programs', href: '#programs' },
        { name: 'Trainers', href: '#trainers' },
        { name: 'About', href: '#about' },
        { name: 'Blog', href: '#blog' },
    ];

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

    useEffect(() => {
        if (!mobileMenuRef.current) return;

        if (isMenuOpen) {
            gsap.to(mobileMenuRef.current, {
                opacity: 1,
                y: 0,
                pointerEvents: 'auto',
                duration: 0.5,
                ease: 'power3.out',
            });

            document.body.style.overflow = 'hidden';
        } else {
            gsap.to(mobileMenuRef.current, {
                opacity: 0,
                y: -30,
                pointerEvents: 'none',
                duration: 0.4,
                ease: 'power3.inOut',
            });

            document.body.style.overflow = 'auto';
        }
    }, [isMenuOpen]);

    return (
        <>
            <div
                ref={progressRef}
                className="fixed top-0 left-0 h-0.5 w-full bg-accent z-2000 origin-left scale-x-0"
            />

            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-1000 transition-all duration-500 ease-out flex items-center px-[clamp(16px,5vw,80px)]',
                    isScrolled
                        ? 'h-20 bg-bg/85 backdrop-blur-xl border-b border-white/10'
                        : 'h-24 bg-transparent'
                )}
            >
                <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-1 group cursor-none">
                        <span className="font-display text-2xl tracking-tighter">
                            GYMFORGE
                        </span>
                        <span
                            ref={dotRef}
                            className="w-2 h-2 rounded-full bg-accent mt-1 opacity-30"
                        />
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="group relative font-sans text-[13px] uppercase tracking-wider text-white/50 hover:text-white transition-colors duration-200 cursor-none"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-accent transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-6">

                        <MagneticButton className="hidden md:block px-6 py-2 text-[15px] tracking-widest">
                            GET STARTED
                        </MagneticButton>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden relative w-10 h-10 flex items-center justify-center cursor-none z-1200"
                        >
                            <div className="relative w-6 h-6">
                                <span
                                    className={cn(
                                        'absolute left-0 top-2 w-6 h-0.5 bg-white transition-all duration-300',
                                        isMenuOpen && 'rotate-45 top-3'
                                    )}
                                />
                                <span
                                    className={cn(
                                        'absolute left-0 top-4 w-4 h-0.5 bg-white transition-all duration-300',
                                        isMenuOpen && 'opacity-0'
                                    )}
                                />
                                <span
                                    className={cn(
                                        'absolute left-0 top-6 w-6 h-0.5 bg-white transition-all duration-300',
                                        isMenuOpen && '-rotate-45 top-3'
                                    )}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className="fixed inset-0 z-900 bg-black/95 backdrop-blur-2xl opacity-0 pointer-events-none -translate-y-7.5 md:hidden"
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">

                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="group relative text-3xl font-display tracking-tight text-white/70 hover:text-white transition-all duration-300"
                            style={{
                                transitionDelay: `${index * 50}ms`
                            }}
                        >
                            {link.name}

                            <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                        </a>
                    ))}

                    <div className="mt-10">
                        <MagneticButton className="px-8 py-3 text-sm tracking-[0.25em]">
                            GET STARTED
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </>
    );
}