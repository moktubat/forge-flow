"use client"
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/common/MagneticButton';
import SectionHeader from '@/components/common/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const programs = [
    {
        title: 'STRENGTH & POWER',
        duration: '60 MIN · 4×/WEEK',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
        description:
            'Master the compound lifts and build raw functional strength.',
        category: 'STRENGTH',
    },
    {
        title: 'HIIT CARDIO',
        duration: '45 MIN · 3×/WEEK',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
        description:
            'Elite conditioning designed to torch calories and boost stamina.',
        category: 'CARDIO',
    },
    {
        title: 'YOGA & FLOW',
        duration: '75 MIN · 2×/WEEK',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
        description:
            'Balance intensity with recovery and professional mobility work.',
        category: 'FLEXIBILITY',
    },
];

export default function Programs() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const section = sectionRef.current;

        const timer = setTimeout(() => {
            const cards = section.querySelectorAll<HTMLElement>('.program-card');
            const gridEl = section.querySelector<HTMLElement>('.programs-grid');

            // --- Scroll-triggered entrance animations ---
            const headerAnim = gsap.from(
                section.querySelectorAll('.section-header-item'),
                {
                    opacity: 0,
                    y: 40,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        once: true,
                    },
                }
            );

            const cardAnim = gsap.from(
                section.querySelectorAll('.program-card'),
                {
                    opacity: 0,
                    y: 60,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: gridEl,
                        start: 'top 80%',
                        once: true,
                    },
                }
            );

            const cleanups: (() => void)[] = [];

            cards.forEach((card) => {
                const image = card.querySelector<HTMLElement>(".program-image")!;
                const content = card.querySelector<HTMLElement>(".program-content")!;
                const desc = card.querySelector<HTMLElement>(".program-desc")!;
                const explore = card.querySelector<HTMLElement>(".program-explore")!;

                gsap.set(image, { scale: 1 });
                gsap.set(content, { y: 0 });

                gsap.set(desc, {
                    opacity: 0,
                    y: 30,
                    visibility: "hidden",
                });

                gsap.set(explore, {
                    opacity: 0,
                    y: 16,
                    visibility: "hidden",
                });

                const tl = gsap.timeline({
                    paused: true,
                    defaults: {
                        ease: "power3.out",
                    },
                });

                tl.add(() => {
                    gsap.set(desc, { visibility: "visible" });
                    gsap.set(explore, { visibility: "visible" });
                })

                    .to(
                        image,
                        {
                            scale: 1.08,
                            duration: 0.8,
                        },
                        0
                    )

                    .to(
                        content,
                        {
                            y: -24,
                            duration: 0.45,
                        },
                        0
                    )

                    .to(
                        desc,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.35,
                        },
                        0.05
                    )

                    .to(
                        explore,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.3,
                        },
                        0.12
                    );

                tl.eventCallback("onReverseComplete", () => {
                    gsap.set(desc, { visibility: "hidden" });
                    gsap.set(explore, { visibility: "hidden" });
                });

                const enter = () => tl.play();
                const leave = () => tl.reverse();

                card.addEventListener("mouseenter", enter);
                card.addEventListener("mouseleave", leave);

                cleanups.push(() => {
                    card.removeEventListener("mouseenter", enter);
                    card.removeEventListener("mouseleave", leave);
                    tl.kill();
                });
            });

            ScrollTrigger.refresh();

            (section as any)._gsapCleanup = () => {
                headerAnim.scrollTrigger?.kill();
                headerAnim.kill();
                cardAnim.scrollTrigger?.kill();
                cardAnim.kill();
                cleanups.forEach(fn => fn());
            };
        }, 100);

        return () => {
            clearTimeout(timer);
            (section as any)._gsapCleanup?.();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="programs"
            className="py-16 md:py-32 max-w-7xl mx-auto overflow-hidden px-4 md:px-0"
        >
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 md:gap-12 mb-20">
                <SectionHeader
                    label="OUR PROGRAMS"
                    heading={"TRAIN WITH\nPURPOSE."}
                    accentWord="PURPOSE."
                    animationClass="section-header-item"
                />

                <div>
                    <p className="section-header-item text-white/60 font-sans text-base base:text-lg max-w-sm mb-4 md:mb-6">
                        Scientific training methodologies meet elite coaching
                        to deliver undeniable results.
                    </p>
                    <MagneticButton>
                        VIEW ALL PROGRAMS
                    </MagneticButton>
                </div>
            </div>

            {/* Cards */}
            <div className="programs-grid grid grid-cols-1 md:grid-cols-3 gap-6">
                {programs.map((program, i) => (
                    <div
                        key={i}
                        className="program-card group relative h-100 md:h-130 rounded-xl md:rounded-3xl overflow-hidden cursor-none"
                    >
                        {/* Image */}
                        <img
                            src={program.image}
                            alt={program.title}
                            className="program-image absolute inset-0 w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />

                        {/* Overlay — slightly stronger gradient so text always reads */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

                        {/* Category */}
                        <div className="absolute top-6 left-6 glass px-3 py-1 rounded-full text-[11px] tracking-widest font-sans uppercase text-white/80">
                            {program.category}
                        </div>

                        {/* Content */}
                        <div className="program-content absolute bottom-12 left-8 right-8">
                            <h3 className="text-4xl text-white leading-[0.9] mb-2">
                                {program.title}
                            </h3>

                            <p className="text-white/50 text-sm font-sans tracking-widest mb-4">
                                {program.duration}
                            </p>

                            <p
                                className="program-desc text-white/60 font-sans text-sm leading-relaxed"
                                style={{ opacity: 0, transform: 'translateY(30px)', visibility: 'hidden' }}
                            >
                                {program.description}
                            </p>
                        </div>

                        <div
                            className="program-explore absolute bottom-8 left-8"
                            style={{ opacity: 0, transform: 'translateY(16px)', visibility: 'hidden' }}
                        >
                            <span className="text-accent uppercase font-display text-lg flex items-center gap-2">
                                EXPLORE PROGRAM
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}