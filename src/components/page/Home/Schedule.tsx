"use client"
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

interface Class {
    time: string;
    name: string;
    trainer: string;
    avatar: string;
    duration: string;
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    spots: string;
}

const rawSchedule: Record<string, Class[]> = {
    MON: [
        { time: '06:00 AM', name: 'MORNING MOBILITY', trainer: 'LUNA GREY', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100', duration: '45 MIN', level: 'BEGINNER', spots: '18/25' },
        { time: '07:00 AM', name: 'POWERLIFTING 101', trainer: 'SARAH CONNOR', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', duration: '60 MIN', level: 'BEGINNER', spots: '5/20' },
        { time: '09:00 AM', name: 'HIIT BLAST', trainer: 'JAXON REED', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100', duration: '45 MIN', level: 'INTERMEDIATE', spots: '12/15' },
        { time: '12:00 PM', name: 'CORE & BURN', trainer: 'LUNA GREY', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100', duration: '30 MIN', level: 'BEGINNER', spots: '10/20' },
        { time: '05:00 PM', name: 'BOXING PRO', trainer: 'MARCUS THOR', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100', duration: '90 MIN', level: 'ADVANCED', spots: '2/10' },
        { time: '07:00 PM', name: 'NIGHT STRENGTH', trainer: 'SARAH CONNOR', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', duration: '60 MIN', level: 'INTERMEDIATE', spots: '9/15' },
    ],
    TUE: [
        { time: '07:00 AM', name: 'YOGA FLOW', trainer: 'LUNA GREY', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100', duration: '75 MIN', level: 'BEGINNER', spots: '15/25' },
        { time: '09:00 AM', name: 'KETTLEBELL POWER', trainer: 'MARCUS THOR', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100', duration: '60 MIN', level: 'INTERMEDIATE', spots: '7/12' },
        { time: '12:00 PM', name: 'SPRINT INTERVALS', trainer: 'JAXON REED', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100', duration: '45 MIN', level: 'ADVANCED', spots: '3/10' },
        { time: '06:00 PM', name: 'STRENGTH & CONDITIONING', trainer: 'SARAH CONNOR', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', duration: '60 MIN', level: 'INTERMEDIATE', spots: '8/12' },
        { time: '08:00 PM', name: 'STRETCH & RECOVER', trainer: 'LUNA GREY', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100', duration: '45 MIN', level: 'BEGINNER', spots: '20/25' },
    ],
    WED: [
        { time: '06:00 AM', name: 'EARLY HIIT', trainer: 'JAXON REED', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100', duration: '45 MIN', level: 'INTERMEDIATE', spots: '6/15' },
        { time: '08:00 AM', name: 'FUNCTIONAL FITNESS', trainer: 'MARCUS THOR', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100', duration: '60 MIN', level: 'BEGINNER', spots: '14/20' },
        { time: '11:00 AM', name: 'PILATES CORE', trainer: 'LUNA GREY', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100', duration: '60 MIN', level: 'BEGINNER', spots: '18/20' },
        { time: '05:30 PM', name: 'DEADLIFT CLINIC', trainer: 'SARAH CONNOR', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', duration: '90 MIN', level: 'ADVANCED', spots: '4/8' },
        { time: '07:30 PM', name: 'BOXING BASICS', trainer: 'MARCUS THOR', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100', duration: '60 MIN', level: 'BEGINNER', spots: '9/15' },
    ],
    THU: [
        { time: '07:00 AM', name: 'POWER YOGA', trainer: 'LUNA GREY', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100', duration: '75 MIN', level: 'INTERMEDIATE', spots: '11/20' },
        { time: '09:30 AM', name: 'METABOLIC BURN', trainer: 'JAXON REED', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100', duration: '45 MIN', level: 'ADVANCED', spots: '2/12' },
        { time: '12:00 PM', name: 'LUNCH LIFT', trainer: 'SARAH CONNOR', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', duration: '45 MIN', level: 'INTERMEDIATE', spots: '7/15' },
        { time: '06:00 PM', name: 'FULL BODY BLAST', trainer: 'MARCUS THOR', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100', duration: '60 MIN', level: 'INTERMEDIATE', spots: '10/15' },
        { time: '08:00 PM', name: 'NIGHT MOBILITY', trainer: 'LUNA GREY', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100', duration: '30 MIN', level: 'BEGINNER', spots: '22/25' },
    ],
    FRI: [
        { time: '06:00 AM', name: 'FRIDAY FIRE HIIT', trainer: 'JAXON REED', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100', duration: '45 MIN', level: 'ADVANCED', spots: '1/12' },
        { time: '08:00 AM', name: 'SQUAT MASTERCLASS', trainer: 'SARAH CONNOR', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', duration: '90 MIN', level: 'INTERMEDIATE', spots: '6/10' },
        { time: '10:00 AM', name: 'FLOW & RESTORE', trainer: 'LUNA GREY', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100', duration: '60 MIN', level: 'BEGINNER', spots: '16/25' },
        { time: '05:00 PM', name: 'COMBAT CONDITIONING', trainer: 'MARCUS THOR', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100', duration: '75 MIN', level: 'ADVANCED', spots: '3/10' },
        { time: '07:00 PM', name: 'WEEKEND PREP', trainer: 'JAXON REED', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100', duration: '45 MIN', level: 'INTERMEDIATE', spots: '8/15' },
    ],
    SAT: [
        { time: '08:00 AM', name: 'WEEKEND WARRIOR', trainer: 'MARCUS THOR', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100', duration: '90 MIN', level: 'ADVANCED', spots: '4/10' },
        { time: '10:00 AM', name: 'COMMUNITY YOGA', trainer: 'LUNA GREY', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100', duration: '75 MIN', level: 'BEGINNER', spots: '20/30' },
        { time: '12:00 PM', name: 'OPEN LIFTING', trainer: 'SARAH CONNOR', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', duration: '120 MIN', level: 'INTERMEDIATE', spots: '9/20' },
        { time: '03:00 PM', name: 'CARDIO PARTY', trainer: 'JAXON REED', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100', duration: '60 MIN', level: 'BEGINNER', spots: '13/25' },
    ],
    SUN: [
        { time: '09:00 AM', name: 'SUNDAY STRETCH', trainer: 'LUNA GREY', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100', duration: '60 MIN', level: 'BEGINNER', spots: '22/25' },
        { time: '11:00 AM', name: 'ACTIVE RECOVERY', trainer: 'SARAH CONNOR', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', duration: '45 MIN', level: 'BEGINNER', spots: '17/20' },
        { time: '01:00 PM', name: 'INTRO TO LIFTING', trainer: 'MARCUS THOR', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100', duration: '75 MIN', level: 'BEGINNER', spots: '8/15' },
        { time: '04:00 PM', name: 'ENDURANCE RUN', trainer: 'JAXON REED', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100', duration: '60 MIN', level: 'INTERMEDIATE', spots: '5/12' },
    ],
};

function ScheduleRow({ time, name, trainer, avatar, duration, level, spots }: Class) {
    const available = parseInt(spots.split('/')[0]);
    const total = parseInt(spots.split('/')[1]);
    const isFull = available >= total;
    const isLow = available < 5 && !isFull;
    const fillPct = Math.round((available / total) * 100);

    return (
        <div className="grid grid-cols-7 gap-4 px-8 py-6 items-center border-x border-b border-border bg-bg/20 hover:bg-surface-2 transition-all duration-300 group relative overflow-hidden">
            {/* Hover accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.75 bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

            {/* Time */}
            <div className="font-mono text-sm text-muted">{time}</div>

            {/* Class name */}
            <div className="col-span-2">
                <h4 className="font-display text-2xl text-white group-hover:text-accent transition-colors duration-300 leading-none">
                    {name}
                </h4>
            </div>

            {/* Trainer */}
            <div className="flex items-center gap-3">
                <img
                    src={avatar}
                    alt={trainer}
                    className="w-9 h-9 rounded-full object-cover border border-border"
                    referrerPolicy="no-referrer"
                />
                <span className="font-sans text-xs font-bold text-white/80">{trainer}</span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2 text-muted text-sm font-sans">
                <Timer className="w-4 h-4 shrink-0" />
                {duration}
            </div>

            {/* Level */}
            <div>
                <span className={cn(
                    'px-3 py-1 rounded-full text-[10px] font-bold tracking-widest',
                    level === 'BEGINNER'
                        ? 'bg-accent/10 text-accent'
                        : level === 'INTERMEDIATE'
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : 'bg-red-500/10 text-red-500'
                )}>
                    {level}
                </span>
            </div>

            {/* Spots */}
            <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 font-mono text-sm">
                    {isLow && <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
                    <span className={cn(isFull ? 'text-red-400' : 'text-white')}>
                        {isFull ? 'FULL' : spots}
                    </span>
                </div>

                {/* Fill bar */}
                <div className="w-16 h-0.5 bg-border rounded-full overflow-hidden">
                    <div
                        className={cn(
                            'h-full rounded-full transition-all',
                            isFull ? 'bg-red-500' : isLow ? 'bg-accent' : 'bg-white/30'
                        )}
                        style={{ width: `${fillPct}%` }}
                    />
                </div>

                <button
                    disabled={isFull}
                    className={cn(
                        'px-5 py-1.5 rounded-full font-display text-[11px] tracking-widest transition-all duration-300',
                        isFull
                            ? 'border border-border text-muted cursor-not-allowed'
                            : 'border border-accent text-accent hover:bg-accent hover:text-black'
                    )}
                >
                    {isFull ? 'WAITLIST' : 'BOOK'}
                </button>
            </div>
        </div>
    );
}

export default function Schedule() {
    const [activeDay, setActiveDay] = useState('MON');
    const [isAnimating, setIsAnimating] = useState(false);
    const rowsRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);
    const activeDayRef = useRef(activeDay);
    activeDayRef.current = activeDay;

    const changeDay = (day: string) => {
        if (day === activeDayRef.current || isAnimating) return;

        const rows = rowsRef.current;
        if (!rows) return;

        setIsAnimating(true);

        gsap.to(rows, {
            opacity: 0,
            y: 10,
            duration: 0.18,
            ease: 'power2.out',
            onComplete: () => {
                setActiveDay(day);
            },
        });
    };

    useEffect(() => {
        const rows = rowsRef.current;
        if (!rows) return;

        gsap.fromTo(
            rows,
            {
                opacity: 0,
                y: 10,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.28,
                ease: 'power2.out',
                clearProps: 'all',
                onComplete: () => setIsAnimating(false),
            }
        );
    }, [activeDay]);

    // Section scroll reveal
    useEffect(() => {
        if (!sectionRef.current) return;
        const section = sectionRef.current;

        const timer = setTimeout(() => {
            gsap.from(section.querySelector('.schedule-header'), {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: { trigger: section, start: 'top 80%', once: true },
            });

            gsap.from(section.querySelector('.schedule-tabs'), {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: { trigger: section, start: 'top 80%', once: true },
            });

            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section ref={sectionRef} className="py-20 px-[clamp(16px,5vw,80px)] overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="schedule-header mb-12">
                    <div className="glass px-4 py-1 rounded-full text-[12px] tracking-[0.15em] font-sans text-muted border-white/10 uppercase self-start inline-flex mb-6">
                        CLASS SCHEDULE
                    </div>
                    <h2 className="text-section leading-none">
                        WEEKLY<br />
                        <span className="text-muted">SCHEDULE.</span>
                    </h2>
                </div>

                {/* Day Tabs */}
                <div className="schedule-tabs flex border-b border-border overflow-x-auto no-scrollbar mb-0">
                    {days.map(day => (
                        <button
                            key={day}
                            onClick={() => changeDay(day)}
                            className={cn(
                                'relative px-8 py-6 font-display text-lg tracking-[0.2em] transition-colors whitespace-nowrap',
                                activeDay === day ? 'text-accent' : 'text-muted hover:text-white'
                            )}
                        >
                            {day}
                            {/* Active underline */}
                            <span className={cn(
                                'absolute bottom-0 left-0 right-0 h-0.5 bg-accent transition-all duration-200 origin-left',
                                activeDay === day ? 'scale-x-100' : 'scale-x-0'
                            )} />
                        </button>
                    ))}
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-7 gap-4 px-8 py-4 bg-bg/50 border-x border-b border-border font-display text-[11px] tracking-widest text-muted mt-0">
                    <div>TIME</div>
                    <div className="col-span-2">CLASS</div>
                    <div>TRAINER</div>
                    <div>DURATION</div>
                    <div>LEVEL</div>
                    <div className="text-right">SPOTS</div>
                </div>

                {/* Rows */}
                <div ref={rowsRef} className="border-border will-change-transform">
                    {rawSchedule[activeDay].map((c, i) => (
                        <ScheduleRow key={`${activeDay}-${i}`} {...c} />
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-6 text-[11px] font-sans tracking-widest text-muted">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent/50 inline-block" />
                            BEGINNER
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-500/50 inline-block" />
                            INTERMEDIATE
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500/50 inline-block" />
                            ADVANCED
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
                            FILLING FAST
                        </div>
                    </div>

                    <span className="font-sans text-[11px] text-muted tracking-widest">
                        {rawSchedule[activeDay].length} CLASSES TODAY
                    </span>
                </div>
            </div>
        </section>
    );
}