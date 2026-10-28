"use client"
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { number: '500+', label: 'Active Members' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '12K+', label: 'Sessions Completed' },
    { number: '15+', label: 'Expert Trainers' },
];

export default function Stats() {
    return (
        <section className="bg-surface px-4 py-8 md:py-20 border-y border-border overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 divide-y divide-border md:grid-cols-4 md:divide-y-0 md:divide-x">
                {stats.map((stat, i) => (
                    <StatBlock
                        key={i}
                        number={stat.number}
                        label={stat.label}
                    />
                ))}
            </div>
        </section>
    );
}

function StatBlock({
    number,
    label,
}: {
    number: string;
    label: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLSpanElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (
            !ref.current ||
            !lineRef.current ||
            !numberRef.current ||
            !labelRef.current
        )
            return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 85%',
                    once: true,
                },
            });

            // Accent line animation
            tl.fromTo(
                lineRef.current,
                {
                    width: 0,
                },
                {
                    width: 40,
                    duration: 0.8,
                    ease: 'power3.out',
                }
            )

                // Number animation
                .fromTo(
                    numberRef.current,
                    {
                        opacity: 0,
                        y: 30,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power4.out',
                    },
                    '-=0.4'
                )

                // Label animation
                .fromTo(
                    labelRef.current,
                    {
                        opacity: 0,
                        y: 15,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                    },
                    '-=0.5'
                );
        }, ref);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={ref}
            className="px-8 pb-8 md:pb-0 flex flex-col items-center md:items-start text-center md:text-left gap-2 group"
        >
            {/* Accent Line */}
            <div
                ref={lineRef}
                className="hidden md:block h-0.5 w-0 bg-accent mb-2"
            />

            {/* Number */}
            <span
                ref={numberRef}
                className="font-display text-6xl md:text-8xl text-accent leading-none opacity-0"
            >
                {number}
            </span>

            {/* Label */}
            <span
                ref={labelRef}
                className="font-sans text-sm md:text-base tracking-widest uppercase text-white/50 font-medium opacity-0"
            >
                {label}
            </span>
        </div>
    );
}