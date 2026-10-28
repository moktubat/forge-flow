"use client"
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/common/MagneticButton';
import SectionHeader from '@/components/common/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const plans = [
    {
        name: 'STARTER',
        monthlyPrice: '49',
        annualPrice: '39',
        features: [
            'Access to Main Gym Floor',
            'Basic Performance Tracking',
            '2 HIIT Sessions / Month',
            'Standard Support',
            'Nutritional Guide PDF',
        ],
        featured: false,
    },
    {
        name: 'PRO ELITE',
        monthlyPrice: '99',
        annualPrice: '79',
        features: [
            '24/7 Priority Access',
            'Personal Performance Coach',
            'Unlimited Group Sessions',
            'Priority Support',
            'Premium Analytics Dashboard',
            'Recovery Suite Access',
        ],
        featured: true,
    },
    {
        name: 'ULTIMATE',
        monthlyPrice: '189',
        annualPrice: '149',
        features: [
            'All Pro Elite Features',
            'Daily 1-on-1 Coaching',
            'Custom Diet Protocols',
            'Monthly Bio-metric Scans',
            'Private Locker & Laundry',
            'Guest Passes Every Month',
        ],
        featured: false,
    },
];

export default function Membership() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isAnnual, setIsAnnual] = useState(false);
    const priceRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const toggleBilling = () => {
        // Animate prices out
        priceRefs.current.forEach((el) => {
            if (!el) return;
            gsap.to(el, {
                y: -20,
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => {
                    setIsAnnual(prev => {
                        // Animate prices back in after state update
                        setTimeout(() => {
                            priceRefs.current.forEach((el2) => {
                                if (!el2) return;
                                gsap.fromTo(el2,
                                    { y: 20, opacity: 0 },
                                    { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }
                                );
                            });
                        }, 10);
                        return !prev;
                    });
                },
            });
        });
    };

    useEffect(() => {
        if (!sectionRef.current) return;
        const section = sectionRef.current;

        const timer = setTimeout(() => {
            gsap.from(
                section.querySelectorAll('.membership-header'),
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

            gsap.from(
                section.querySelectorAll('.plan-card'),
                {
                    opacity: 0,
                    y: 60,
                    stagger: 0.15,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: section.querySelector('.plans-grid'),
                        start: 'top 80%',
                        once: true,
                    },
                }
            );

            section.querySelectorAll<HTMLElement>('.plan-card').forEach((card) => {
                const isFeatured = card.dataset.featured === 'true';

                const onEnter = () => {
                    if (!isFeatured) gsap.to(card, {
                        borderColor: '#C8FF00',
                        duration: 0.3
                    });
                };

                const onLeave = () => {
                    if (!isFeatured) gsap.to(card, {
                        borderColor: 'rgba(255,255,255,0.1)',
                        duration: 0.3
                    });
                };

                card.addEventListener('mouseenter', onEnter);
                card.addEventListener('mouseleave', onLeave);
            });

            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-surface overflow-hidden">
            <div className="px-[clamp(16px,5vw,80px)]">
                <div className="relative z-10 max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-8 md:mb-16 space-y-8 md:space-y-12">
                        <SectionHeader
                            label="PRICING"
                            heading={"SIMPLE PRICING.\nSERIOUS GAINS."}
                            accentWord="SERIOUS GAINS."
                            animationClass="your-anim-class"
                            align="center"
                        />

                        {/* Toggle */}
                        <div className="membership-header flex items-center justify-center gap-4">
                            <span className={cn(
                                'font-sans text-sm font-medium transition-colors duration-300',
                                !isAnnual ? 'text-white' : 'text-muted'
                            )}>
                                MONTHLY
                            </span>

                            <button
                                onClick={toggleBilling}
                                className="relative w-14 h-7 rounded-full bg-surface-2 border border-border cursor-pointer focus:outline-none"
                            >
                                <div className={cn(
                                    'absolute top-1 w-5 h-5 rounded-full bg-accent transition-all duration-300 ease-in-out',
                                    isAnnual ? 'left-[calc(100%-24px)]' : 'left-1'
                                )} />
                            </button>

                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    'font-sans text-sm transition-colors duration-300',
                                    isAnnual ? 'text-white' : 'text-muted'
                                )}>
                                    ANNUAL
                                </span>
                                <span className="font-sans text-[10px] font-bold text-black bg-accent px-2 py-0.5 rounded-full tracking-wider">
                                    SAVE 20%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Plans */}
                    <div className="plans-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, i) => (
                            <div
                                key={i}
                                data-featured={plan.featured}
                                className={cn(
                                    'plan-card relative p-6 md:p-10 rounded-4xl border flex flex-col gap-6 md:gap-10 overflow-visible',
                                    plan.featured
                                        ? 'bg-accent text-black border-accent scale-105 z-20'
                                        : 'bg-surface border-border'
                                )}
                            >
                                {/* Badge */}
                                {plan.featured && (
                                    <div className="absolute -top-3 right-6 rotate-3 bg-black text-white px-4 py-1 rounded-full text-[11px] font-bold tracking-widest font-sans z-30 shadow-lg">
                                        MOST POPULAR
                                    </div>
                                )}

                                {/* Title + Price */}
                                <div className="membership-header flex flex-col gap-2">
                                    <h3 className="font-display text-2xl md:text-3xl uppercase">
                                        {plan.name}
                                    </h3>

                                    <div className="flex items-end gap-1 overflow-hidden">
                                        <span
                                            ref={el => { priceRefs.current[i] = el; }}
                                            className="font-display text-5xl md:text-7xl leading-none"
                                        >
                                            ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                                        </span>

                                        <div className="mb-2 flex flex-col">
                                            <span className="font-sans text-sm opacity-60 uppercase tracking-widest leading-none">
                                                / month
                                            </span>
                                            {isAnnual && (
                                                <span className={cn(
                                                    'font-sans text-[10px] tracking-wider mt-1',
                                                    plan.featured ? 'text-black/60' : 'text-accent'
                                                )}>
                                                    BILLED ANNUALLY
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-2 md:space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-2 md:gap-3">
                                            <Check className={cn(
                                                'w-5 h-5 shrink-0 mt-0.5',
                                                plan.featured ? 'text-black' : 'text-accent'
                                            )} />
                                            <span className="font-sans text-[15px] opacity-80">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <MagneticButton
                                    className={cn(
                                        'w-full py-3 md:py-5 text-xl font-bold mt-auto',
                                        plan.featured ? 'bg-black text-white' : 'bg-accent text-black'
                                    )}
                                >
                                    GET STARTED
                                </MagneticButton>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}