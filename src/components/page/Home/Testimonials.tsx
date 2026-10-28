"use client"

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        quote: "GymForge transformed not just my body, but my psychological approach to performance. The coaching here is truly world-class.",
        author: "Alex Rivers",
        role: "Pro Athlete",
        since: "Member since 2021",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    },
    {
        quote: "The bio-mechanic analysis changed everything. I'm lifting heavier than ever with zero pain. This is the future of fitness.",
        author: "Elena Vance",
        role: "Fitness Model",
        since: "Member since 2020",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    },
    {
        quote: "Finally a gym that respects the science of training. No fluff, just results and an incredibly supportive community of beasts.",
        author: "Marcus Wright",
        role: "CEO, TechFlow",
        since: "Member since 2022",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    },
];

export default function Testimonials() {
    const [index, setIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLParagraphElement>(null);
    const authorRef = useRef<HTMLDivElement>(null);
    const starsRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const animateSlide = (newIndex: number) => {
        if (newIndex === index || isAnimating) return;

        setIsAnimating(true);

        const direction = newIndex > index ? 1 : -1;

        const tl = gsap.timeline({
            onComplete: () => setIsAnimating(false),
        });

        // Exit animation
        tl.to(
            [starsRef.current, quoteRef.current, authorRef.current],
            {
                opacity: 0,
                x: direction * -40,
                duration: 0.22,
                stagger: 0.03,
                ease: 'power2.inOut',
            }
        )

            // Change content
            .add(() => setIndex(newIndex))

            // Enter animation
            .fromTo(
                [starsRef.current, quoteRef.current, authorRef.current],
                {
                    opacity: 0,
                    x: direction * 40,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.45,
                    stagger: 0.04,
                    ease: 'power3.out',
                    clearProps: 'all',
                }
            );
    };

    const next = () => animateSlide((index + 1) % testimonials.length);
    const prev = () => animateSlide((index - 1 + testimonials.length) % testimonials.length);

    // Auto-advance
    useEffect(() => {
        intervalRef.current = setInterval(next, 8000);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [index]);

    // Scroll reveal
    useEffect(() => {
        if (!sectionRef.current) return;
        const section = sectionRef.current;

        const timer = setTimeout(() => {
            gsap.from(
                section.querySelectorAll('.testimonial-header'),
                {
                    opacity: 0,
                    y: 40,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        once: true,
                    },
                }
            );

            gsap.from(cardRef.current, {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 85%',
                    once: true,
                },
            });

            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="testimonial-section bg-surface py-16 md:py-24 px-[clamp(16px,5vw,80px)] overflow-hidden relative"
        >
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-accent/5 blur-[140px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <SectionHeader
                    label="TESTIMONIALS"
                    heading={"WHAT\nMEMBERS SAY."}
                    accentWord="SAY."
                    animationClass="your-anim-class"
                />
            </div>

            {/* Card */}
            <div className="max-w-4xl mx-auto relative px-4">
                <div
                    ref={cardRef}
                    className="glass p-12 lg:p-20 rounded-[40px] border border-white/5 relative overflow-hidden"
                >
                    {/* Large decorative quote */}
                    <Quote className="absolute top-8 left-8 w-20 h-20 text-accent opacity-[0.07]" />

                    <div className="flex flex-col items-center gap-10 text-center">

                        {/* Stars */}
                        <div ref={starsRef} className="flex gap-1.5 will-change-transform">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                            ))}
                        </div>

                        {/* Quote */}
                        <p
                            ref={quoteRef}
                            className="font-sans text-2xl lg:text-3xl text-white leading-relaxed font-light italic max-w-3xl will-change-transform"
                        >
                            {`"${testimonials[index].quote}"`}
                        </p>

                        {/* Divider */}
                        <div className="h-px w-20 bg-accent/30" />

                        {/* Author */}
                        <div ref={authorRef} className="flex items-center gap-5 text-left will-change-transform">
                            <div className="relative shrink-0">
                                <img
                                    src={testimonials[index].avatar}
                                    alt={testimonials[index].author}
                                    className="w-16 h-16 rounded-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 rounded-full border-2 border-accent/30" />
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <span className="font-display text-xl text-white tracking-widest">
                                    {testimonials[index].author}
                                </span>
                                <span className="font-sans text-sm text-muted uppercase tracking-widest">
                                    {testimonials[index].role} · {testimonials[index].since}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mt-10">
                    <button
                        onClick={prev}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-black hover:border-accent transition-all duration-300"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-2 items-center">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => animateSlide(i)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${index === i
                                    ? 'w-8 bg-accent'
                                    : 'w-2 bg-white/20 hover:bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-black hover:border-accent transition-all duration-300"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Counter */}
                <div className="flex justify-center mt-6">
                    <span className="font-mono text-[11px] text-muted tracking-widest">
                        {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </section>
    );
}