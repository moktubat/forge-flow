"use client"
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';


gsap.registerPlugin(ScrollTrigger);

const articles = [
    {
        title: 'THE SCIENCE OF RECOVERY',
        excerpt:
            'High-performance athletes realize that growth happens outside the gym. Master your rest protocols.',
        category: 'SCIENCE',
        date: 'OCT 12, 2025',
        readTime: '6 MIN READ',
        image:
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
        featured: true
    },
    {
        title: 'PEAK PERFORMANCE NUTRITION',
        category: 'DIET',
        date: 'OCT 10, 2025',
        readTime: '4 MIN READ',
        image:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
        featured: false
    },
    {
        title: 'MASTERING THE DEADLIFT',
        category: 'TECHNIQUE',
        date: 'OCT 08, 2025',
        readTime: '8 MIN READ',
        image:
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
        featured: false
    },
    {
        title: 'HIIT PROTOCOLS',
        category: 'TRAINING',
        date: 'OCT 05, 2025',
        readTime: '5 MIN READ',
        image:
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600',
        featured: false
    }
];

export default function Tips() {
    const featuredRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement | null>(null);

    const featured = articles.find(a => a.featured);
    const others = articles.filter(a => !a.featured);

    useEffect(() => {
        const featured = featuredRef.current;
        const cards = cardsRef.current;

        const timer = setTimeout(() => {
            if (featured) {
                gsap.fromTo(
                    featured,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: featured,
                            start: 'top 80%',
                            once: true,
                        },
                    }
                );
            }

            if (cards) {
                gsap.fromTo(
                    Array.from(cards.children),
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: cards,
                            start: 'top 80%',
                            once: true,
                        },
                    }
                );
            }

            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="blog" className="py-20 px-[clamp(16px,5vw,80px)] bg-surface overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-16">
                    <SectionHeader
                        label="EXPERT INSIGHTS"
                        heading={"TRAINING\nTIPS."}
                        accentWord="TIPS."
                        animationClass="your-anim-class"
                    />
                </div>

                {/* Featured */}
                {featured && (
                    <div
                        ref={featuredRef}
                        className="relative h-120 rounded-[40px] overflow-hidden mb-8 group cursor-pointer"
                    >
                        <img
                            src={featured.image}
                            alt={featured.title}
                            className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />

                        <div className="absolute top-10 left-10 glass px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                            {featured.category}
                        </div>

                        <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-4 text-muted text-xs tracking-widest mb-4 uppercase">
                                    <span>{featured.date}</span>
                                    <div className="w-1 h-1 rounded-full bg-muted" />
                                    <span>{featured.readTime}</span>
                                </div>

                                <h3 className="text-4xl md:text-6xl text-white leading-none mb-6 font-display">
                                    {featured.title}
                                </h3>

                                <p className="text-white/60 text-lg line-clamp-2 max-w-xl">
                                    {featured.excerpt}
                                </p>
                            </div>

                            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-black opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shrink-0">
                                <ArrowUpRight className="w-8 h-8" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Cards */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {others.map((article, i) => (
                        <div
                            key={i}
                            className="group flex flex-col gap-8 cursor-pointer relative glass border border-white/5 rounded-4xl p-5 hover:border-accent/20 hover:bg-white/3 transition-all duration-500"
                        >
                            <div className="aspect-video rounded-[24px] overflow-hidden relative">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    referrerPolicy="no-referrer"
                                />

                                <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                    {article.category}
                                </div>

                                {/* Arrow — hidden until hover */}
                                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-black opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-muted text-[10px] tracking-[0.2em] uppercase">
                                    <span>{article.date}</span>
                                    <div className="w-1 h-1 rounded-full bg-muted" />
                                    <span>{article.readTime}</span>
                                </div>

                                <h4 className="font-display text-3xl text-white leading-none group-hover:text-accent transition-colors">
                                    {article.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}