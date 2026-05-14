"use client"
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/common/MagneticButton';

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

        // Defer until after paint so ScrollTrigger is fully ready
        const timer = setTimeout(() => {
            const cards = section.querySelectorAll<HTMLElement>('.program-card');
            const gridEl = section.querySelector<HTMLElement>('.programs-grid');

            const headerAnim = gsap.from(
                section.querySelectorAll('.programs-header'),
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
                const image = card.querySelector<HTMLElement>('.program-image')!;
                const content = card.querySelector<HTMLElement>('.program-content')!;
                const desc = card.querySelector<HTMLElement>('.program-desc')!;
                const explore = card.querySelector<HTMLElement>('.program-explore')!;

                const enter = () => {
                    gsap.to(image, { scale: 1.1, duration: 0.8, ease: 'power3.out' });
                    gsap.to(content, { y: -30, duration: 0.5, ease: 'power3.out' });
                    gsap.to(desc, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
                    gsap.to(explore, { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'power3.out' });
                };

                const leave = () => {
                    gsap.to(image, { scale: 1, duration: 0.8, ease: 'power3.out' });
                    gsap.to(content, { y: 0, duration: 0.5, ease: 'power3.out' });
                    gsap.to(desc, { y: 80, opacity: 0, duration: 0.4, ease: 'power3.out' });
                    gsap.to(explore, { opacity: 0, y: 20, duration: 0.3, ease: 'power3.out' });
                };

                card.addEventListener('mouseenter', enter);
                card.addEventListener('mouseleave', leave);
                cleanups.push(() => {
                    card.removeEventListener('mouseenter', enter);
                    card.removeEventListener('mouseleave', leave);
                });
            });

            ScrollTrigger.refresh();

            // Store for cleanup
            (section as any)._gsapCleanup = () => {
                headerAnim.scrollTrigger?.kill();
                headerAnim.kill();
                cardAnim.scrollTrigger?.kill();
                cardAnim.kill();
                cleanups.forEach(fn => fn());
            };
        }, 100); // wait for layout to settle

        return () => {
            clearTimeout(timer);
            (section as any)._gsapCleanup?.();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="programs"
            className="py-32 max-w-7xl mx-auto overflow-hidden"
        >
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-end">
                <div className="md:col-span-6 flex flex-col gap-6">
                    <div className="programs-header glass px-4 py-1 rounded-full text-[12px] tracking-[0.15em] font-sans text-muted border-white/10 self-start">
                        OUR PROGRAMS
                    </div>

                    <h2 className="programs-header text-section leading-none">
                        TRAIN WITH
                        <br />
                        <span className="text-muted">PURPOSE.</span>
                    </h2>
                </div>

                <div className="md:col-span-6 md:pb-2">
                    <p className="programs-header text-muted font-sans text-lg max-w-sm mb-6">
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
                        className="program-card group relative h-130 rounded-3xl overflow-hidden cursor-none"
                    >
                        {/* Image */}
                        <img
                            src={program.image}
                            alt={program.title}
                            className="program-image absolute inset-0 w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-bg/95 via-transparent to-transparent opacity-80" />

                        {/* Category */}
                        <div className="absolute top-6 left-6 glass px-3 py-1 rounded-full text-[11px] tracking-widest font-sans uppercase">
                            {program.category}
                        </div>

                        {/* Content */}
                        <div className="program-content absolute bottom-8 left-8 right-8">
                            <h3 className="text-4xl text-white leading-[0.9] mb-3">
                                {program.title}
                            </h3>

                            <p className="text-muted text-sm font-sans tracking-wide mb-6">
                                {program.duration}
                            </p>

                            <div className="overflow-hidden">
                                <p className="program-desc text-white/80 font-sans text-sm opacity-0 translate-y-20">
                                    {program.description}
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="program-explore absolute bottom-8 left-8 opacity-0 translate-y-5">
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