"use client"

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: "WHAT ARE YOUR OPENING HOURS?",
        answer:
            "We are open 24/7 for our Pro Elite and Ultimate members. Starter members have access from 05:00 to 23:00 on weekdays and 06:00 to 21:00 on weekends.",
    },
    {
        question: "DO YOU OFFER PERSONAL TRAINING?",
        answer:
            "Yes, we have a team of certified elite coaches specializing in strength, HIIT, bodybuilding, and mobility. Personal training can be booked as part of our Ultimate plan or as individual sessions.",
    },
    {
        question: "CAN I CANCEL MY MEMBERSHIP AT ANY TIME?",
        answer:
            "All our monthly memberships are contract-free and can be cancelled at any time through our member portal or at the front desk with 30 days' notice.",
    },
    {
        question: "DO YOU HAVE A FREE TRIAL?",
        answer:
            "Absolutely. We offer a 7-day free trial for first-time visitors so you can experience our high-performance facility and coaching before committing.",
    },
    {
        question: "WHAT EQUIPMENT DO YOU HAVE?",
        answer:
            "Our facility is equipped with state-of-the-art Rogue and Eleiko strength equipment, Keiser pneumatic machines, and a dedicated recovery zone with cold plunges and infrared saunas.",
    },
    {
        question: "ARE THERE GROUP CLASSES INCLUDED?",
        answer:
            "Yes, group classes like HIIT, Yoga Flow, and Powerlifting are included in the Pro Elite and Ultimate plans. Starter members can join classes for a small drop-in fee.",
    },
    {
        question: "DO YOU HAVE LOCKER ROOM FACILITIES?",
        answer:
            "We provide premium locker rooms with private showers, towel service, and digital lockers. Ultimate members also receive a private permanent locker and laundry service.",
    },
    {
        question: "IS THERE A DISCOUNT FOR ANNUAL MEMBERSHIPS?",
        answer:
            "Yes, choosing an annual billing cycle saves you 20% compared to monthly payments. We also offer discounts for first responders, students, and corporate groups.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const sectionRef = useRef<HTMLElement>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Initial open state
    useEffect(() => {
        if (contentRefs.current[0]) {
            gsap.set(contentRefs.current[0], {
                height: 'auto',
                opacity: 1,
            });
        }
    }, []);

    // Scroll animations
    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from('.faq-left', {
                opacity: 0,
                x: -40,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    once: true,
                },
            });

            gsap.from('.faq-item', {
                opacity: 0,
                y: 24,
                stagger: 0.06,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.faq-right',
                    start: 'top 85%',
                    once: true,
                },
            });
        }, sectionRef.current);

        return () => ctx.revert();
    }, []);

    const toggle = (i: number) => {
        const current = contentRefs.current[i];

        if (!current) return;

        // Close current
        if (openIndex === i) {
            gsap.to(current, {
                height: 0,
                opacity: 0,
                duration: 0.28,
                ease: 'power2.out',
            });

            setOpenIndex(null);
            return;
        }

        // Close previous
        if (openIndex !== null) {
            const prev = contentRefs.current[openIndex];

            if (prev) {
                gsap.to(prev, {
                    height: 0,
                    opacity: 0,
                    duration: 0.25,
                    ease: 'power2.out',
                });
            }
        }

        // Open current
        setOpenIndex(i);

        gsap.fromTo(
            current,
            {
                height: 0,
                opacity: 0,
            },
            {
                height: 'auto',
                opacity: 1,
                duration: 0.32,
                ease: 'power2.out',
            }
        );
    };

    return (
        <section
            ref={sectionRef}
            id="faq"
            className="py-20 px-[clamp(16px,5vw,80px)]"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                {/* LEFT */}
                <div className="faq-left lg:col-span-5 flex flex-col items-start gap-8 lg:sticky lg:top-32 h-fit">

                    <div className="relative">
                        <span className="font-display text-[160px] text-accent/10 absolute -top-10 -left-8 leading-none select-none">
                            [
                        </span>

                        <div className="relative z-10 flex flex-col gap-6">

                            <div className="glass px-4 py-1 rounded-full text-[12px] tracking-[0.15em] font-sans text-muted border-white/10 uppercase self-start">
                                FREQUENTLY ASKED
                            </div>

                            <h2 className="text-section leading-none">
                                GOT
                                <br />
                                QUESTIONS?
                            </h2>

                            <p className="text-muted font-sans text-lg max-w-sm">
                                Everything you need to know about starting your
                                fitness journey at GymForge.
                            </p>

                            <a
                                href="#contact"
                                className="group flex items-center gap-2 text-accent uppercase font-display text-xl mt-4 transition-opacity duration-300 hover:opacity-80"
                            >
                                CAN&apos;T FIND AN ANSWER? CHAT WITH US →
                            </a>

                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="faq-right lg:col-span-7 flex flex-col">

                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="faq-item border-b border-border last:border-0"
                        >
                            <button
                                onClick={() => toggle(i)}
                                className="w-full py-8 flex items-center justify-between gap-6 text-left"
                            >
                                <span
                                    className={cn(
                                        "font-sans text-lg lg:text-xl font-bold transition-colors duration-300",
                                        openIndex === i
                                            ? "text-accent"
                                            : "text-white hover:text-white/80"
                                    )}
                                >
                                    {faq.question}
                                </span>

                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0",
                                        openIndex === i
                                            ? "bg-accent text-black rotate-45"
                                            : "bg-surface-2 text-white"
                                    )}
                                >
                                    <Plus className="w-5 h-5" />
                                </div>
                            </button>

                            {/* Content */}
                            <div
                                ref={(el) => {
                                    contentRefs.current[i] = el;
                                }}
                                className="overflow-hidden h-0 opacity-0 will-change-transform"
                            >
                                <div className="pb-8 pr-12">
                                    <p className="text-muted font-sans text-lg leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}