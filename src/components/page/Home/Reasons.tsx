"use client"
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Users, Shield, Award } from 'lucide-react';
import MagneticButton from '@/components/common/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
    {
        title: 'ELITE PERFORMANCE',
        subtitle: 'State of the art bio-mechanics analysis.',
        value: 87,
        icon: <Target className="w-6 h-6" />,
    },
    {
        title: 'COMMUNITY SPIRIT',
        subtitle: 'A tribe that pushes your boundaries.',
        value: 94,
        icon: <Users className="w-6 h-6" />,
    },
    {
        title: 'EXPERT COACHING',
        subtitle: 'Certified world-class professionals.',
        value: 91,
        icon: <Award className="w-6 h-6" />,
    },
    {
        title: 'SAFETY FIRST',
        subtitle: 'Professional-grade sanitation & safety.',
        value: 88,
        icon: <Shield className="w-6 h-6" />,
    },
];

function ReasonItem({
    title,
    subtitle,
    value,
    icon,
}: {
    title: string;
    subtitle: string;
    value: number;
    icon: ReactNode;
}) {
    const itemRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!itemRef.current || !progressRef.current || !iconRef.current) return;

        const item = itemRef.current;
        const progress = progressRef.current;
        const icon = iconRef.current;

        const timer = setTimeout(() => {
            const revealAnim = gsap.from(item, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    once: true,
                },
            });

            const progressAnim = gsap.to(progress, {
                width: `${value}%`,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    once: true,
                },
            });

            const onEnter = () => {
                gsap.to(icon, {
                    backgroundColor: '#C8FF00',
                    color: '#000',
                    scale: 1.08,
                    duration: 0.3,
                    ease: 'power3.out',
                });
            };

            const onLeave = () => {
                gsap.to(icon, {
                    backgroundColor: '#1A1A1A',
                    color: '#C8FF00',
                    scale: 1,
                    duration: 0.3,
                    ease: 'power3.out',
                });
            };

            item.addEventListener('mouseenter', onEnter);
            item.addEventListener('mouseleave', onLeave);

            (item as any)._gsapCleanup = () => {
                revealAnim.scrollTrigger?.kill();
                revealAnim.kill();
                progressAnim.scrollTrigger?.kill();
                progressAnim.kill();
                item.removeEventListener('mouseenter', onEnter);
                item.removeEventListener('mouseleave', onLeave);
            };
        }, 100);

        return () => {
            clearTimeout(timer);
            (item as any)._gsapCleanup?.();
        };
    }, [value]);

    return (
        <div ref={itemRef} className="flex flex-col gap-4 group">
            <div className="flex items-center gap-6">
                <div
                    ref={iconRef}
                    className="w-14 h-14 rounded-full bg-surface-2 flex items-center justify-center text-accent"
                >
                    {icon}
                </div>

                <div className="flex flex-col">
                    <h4 className="font-display text-xl text-white">{title}</h4>
                    <p className="font-sans text-sm text-muted">{subtitle}</p>
                </div>

                <span className="ml-auto font-mono text-accent text-lg">{value}%</span>
            </div>

            <div className="h-0.5 bg-border w-full relative overflow-hidden">
                <div ref={progressRef} className="absolute top-0 left-0 h-full bg-accent w-0" />
            </div>
        </div>
    );
}

export default function Reasons() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const section = sectionRef.current;

        const timer = setTimeout(() => {
            const imageAnim = gsap.from(
                section.querySelector('.reasons-image'),
                {
                    opacity: 0,
                    x: -60,
                    duration: 1.2,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        once: true,
                    },
                }
            );

            const badgeAnim = gsap.from(
                section.querySelector('.experience-badge'),
                {
                    opacity: 0,
                    scale: 0.7,
                    y: 40,
                    duration: 0.8,
                    delay: 0.3,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        once: true,
                    },
                }
            );

            const contentAnim = gsap.from(
                section.querySelectorAll('.reasons-content'),
                {
                    opacity: 0,
                    y: 40,
                    stagger: 0.15,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        once: true,
                    },
                }
            );

            ScrollTrigger.refresh();

            (section as any)._gsapCleanup = () => {
                imageAnim.scrollTrigger?.kill();
                imageAnim.kill();
                badgeAnim.scrollTrigger?.kill();
                badgeAnim.kill();
                contentAnim.scrollTrigger?.kill();
                contentAnim.kill();
            };
        }, 100);

        return () => {
            clearTimeout(timer);
            (section as any)._gsapCleanup?.();
        };
    }, []);

    return (
        <section ref={sectionRef} className="bg-surface py-20">
            <div className="px-[clamp(16px,32px,40px)] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center overflow-hidden">
                {/* Left Column */}
                <div className="lg:col-span-5 relative">
                    <div className="reasons-image relative rounded-3xl overflow-hidden aspect-3/4">
                        <img
                            src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800"
                            alt="Trainer"
                            className="w-full h-full object-cover grayscale"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent" />
                    </div>

                    {/* Floating Badge */}
                    <div className="experience-badge absolute -bottom-8 -left-8 glass p-8 rounded-2xl flex flex-col items-start gap-1">
                        <span className="font-display text-5xl text-accent">10+</span>
                        <span className="font-sans text-[11px] tracking-widest text-muted uppercase">
                            Years Experience
                        </span>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-7 flex flex-col items-start gap-10">
                    <div className="flex flex-col gap-6">
                        <div className="reasons-content glass px-4 py-1 rounded-full text-[12px] tracking-[0.15em] font-sans text-muted border-white/10 self-start uppercase">
                            WHY CHOOSE US
                        </div>

                        <h2 className="reasons-content text-section leading-none">
                            ENGINEERED FOR
                            <br />
                            <span className="text-accent underline underline-offset-8 decoration-accent/30">
                                RESULTS.
                            </span>
                        </h2>

                        <p className="reasons-content text-muted font-sans text-lg max-w-xl">
                            We don't just provide a gym; we provide a high-performance
                            ecosystem designed to optimize every aspect of your physical potential.
                        </p>
                    </div>

                    <div className="w-full space-y-8">
                        {reasons.map((reason, i) => (
                            <ReasonItem
                                key={i}
                                title={reason.title}
                                subtitle={reason.subtitle}
                                value={reason.value}
                                icon={reason.icon}
                            />
                        ))}
                    </div>

                    <div className="reasons-content flex flex-col items-start gap-4">
                        <MagneticButton className="px-10 py-5 text-xl">
                            START YOUR JOURNEY
                        </MagneticButton>
                        <span className="font-sans text-[12px] text-muted tracking-widest uppercase">
                            No contract · Cancel anytime
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}