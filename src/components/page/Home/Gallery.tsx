"use client";
import {
    useState,
    useRef,
    useEffect,
    type MouseEvent as ReactMouseEvent,
    type TouchEvent as ReactTouchEvent,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/common/MagneticButton';
import SectionHeader from '@/components/common/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const transformations = [
    {
        name: 'DAVID CHEN',
        duration: '6 MONTHS',
        before: 'https://images.unsplash.com/photo-1510832198440-a52376950479?auto=format&fit=crop&q=80&w=1600&h=900',
        after: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=1600&h=900',
        tags: ['Building', '6 Months']
    },
    {
        name: 'SARAH J.',
        duration: '3 MONTHS',
        before: 'https://images.unsplash.com/photo-1510832198440-a52376950479?auto=format&fit=crop&q=80&w=1600&h=900',
        after: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=1600&h=900',
        tags: ['Cutting', '3 Months']
    },
    {
        name: 'MIKE ROSS',
        duration: '1 YEAR',
        before: 'https://images.unsplash.com/photo-1510832198440-a52376950479?auto=format&fit=crop&q=80&w=1600&h=900',
        after: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=1600&h=900',
        tags: ['Building', '1 Year']
    },
    {
        name: 'EMILY W.',
        duration: '6 MONTHS',
        before: 'https://images.unsplash.com/photo-1510832198440-a52376950479?auto=format&fit=crop&q=80&w=1600&h=900',
        after: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=1600&h=900',
        tags: ['Cutting', '6 Months']
    }
];

const filters = ['All', '3 Months', '6 Months', '1 Year'];

export default function Gallery() {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredItems =
        activeFilter === 'All'
            ? transformations
            : transformations.filter(item => item.tags.includes(activeFilter));

    return (
        <section className="py-16 md:py-24 px-[clamp(16px,5vw,80px)]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-12 mb-12 md:mb-20">
                    <SectionHeader
                        label="TRANSFORMATION"
                        heading={"REAL RESULTS.\nREAL PEOPLE."}
                        accentWord="REAL PEOPLE."
                        animationClass="your-anim-class"
                    />

                    <div className="flex flex-wrap gap-3">
                        {filters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={cn(
                                    "px-5 md:px-8 py-2 md:py-3 rounded-full font-display text-sm tracking-widest transition-all",
                                    activeFilter === filter
                                        ? "bg-accent text-black"
                                        : "glass text-white hover:bg-white/10"
                                )}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {filteredItems.map(item => (
                        <ComparisonCard key={`${activeFilter}-${item.name}`} {...item} />
                    ))}
                </div>

                <div className="mt-12 md:mt-20 flex justify-center">
                    <MagneticButton> LOAD MORE RESULTS </MagneticButton>
                </div>
            </div>
        </section>
    );
}

function ComparisonCard({
    before,
    after,
    name,
    duration
}: typeof transformations[0]) {
    const [sliderPos, setSliderPos] = useState(50);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const min_pos = 2;
    const max_pos = 98;

    useEffect(() => {
        if (!cardRef.current) return;

        const card = cardRef.current;

        const timer = setTimeout(() => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const calculatePosition = (clientX: number, container: DOMRect) => {
        const pos = ((clientX - container.left) / container.width) * 100;
        return Math.min(max_pos, Math.max(min_pos, pos));
    };

    // ── JSX handlers: keep React types ──────────────────────────────
    const handleMove = (e: ReactMouseEvent | ReactTouchEvent) => {
        if (!cardRef.current) return;
        const container = cardRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as ReactMouseEvent).clientX;
        const pos = calculatePosition(clientX, container);
        setSliderPos(pos);
    };

    const handleStart = (e: ReactMouseEvent | ReactTouchEvent) => {
        e.preventDefault();
        setIsDragging(true);
        handleMove(e);
    };

    const handleEnd = () => {
        setIsDragging(false);
    };

    // ── Window listeners: use NATIVE DOM types ──────────────────────
    useEffect(() => {
        if (!isDragging) return;

        const onMove = (e: MouseEvent | TouchEvent) => {   // ← native DOM types now
            if (!cardRef.current) return;
            const container = cardRef.current.getBoundingClientRect();
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const pos = calculatePosition(clientX, container);
            setSliderPos(pos);
        };

        const onMouseMove = (e: MouseEvent) => onMove(e);
        const onTouchMove = (e: TouchEvent) => onMove(e);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('mouseup', handleEnd);
        window.addEventListener('touchend', handleEnd);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging]);

    return (
        <div
            ref={cardRef}
            className="relative rounded-lg md:rounded-3xl overflow-hidden aspect-11/9 md:aspect-video group select-none"
            onMouseMove={isDragging ? handleMove : undefined}
            onTouchMove={handleMove}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            style={{ cursor: isDragging ? 'ew-resize' : 'ew-resize' }}
        >
            {/* After Image - Full Background */}
            <img
                src={after}
                alt={`${name} - After transformation`}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                referrerPolicy="no-referrer"
            />

            {/* Before Image - Clipped by sliderPos width */}
            <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${sliderPos}%` }}
            >
                <img
                    src={before}
                    alt={`${name} - Before transformation`}
                    className="absolute top-0 left-0 h-full object-cover grayscale"
                    style={{
                        width: `${10000 / sliderPos}%`,
                        maxWidth: 'none'
                    }}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>

            {/* Divider Line + Handle */}
            <div
                className="absolute inset-y-0 w-0.5 bg-accent z-10 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
            >
                <div
                    className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass border-accent flex items-center justify-center transition-transform",
                        isDragging && "scale-110"
                    )}
                >
                    <div className="flex gap-1">
                        <div className="w-1 h-3 bg-accent rounded-full" />
                        <div className="w-1 h-3 bg-accent rounded-full" />
                    </div>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute top-6 left-6 glass px-3 py-1 rounded-full text-[10px] tracking-widest font-sans uppercase pointer-events-none">
                BEFORE
            </div>
            <div className="absolute top-6 right-6 glass px-3 py-1 rounded-full text-[10px] tracking-widest font-sans uppercase pointer-events-none">
                AFTER
            </div>

            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pt-12 bg-linear-to-t from-bg via-bg/40 to-transparent pointer-events-none">
                <h3 className="font-display text-xl md:text-2xl text-white uppercase">{name}</h3>
                <span className="font-sans text-xs md:text-sm text-accent md:tracking-[0.2em]">
                    {duration} PROGRESS
                </span>
            </div>

            {/* Visual hint for interactivity */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/60 text-xs font-sans tracking-wider">
                    ← DRAG →
                </div>
            </div>
        </div>
    );
}