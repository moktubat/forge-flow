"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/common/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

type Unit = 'metric' | 'imperial';

const bmiScale = [
    { label: 'UNDER', range: '< 18.5', color: '#3b82f6', width: '18%' },
    { label: 'NORMAL', range: '18.5–24.9', color: '#C8FF00', width: '22%' },
    { label: 'OVER', range: '25–29.9', color: '#eab308', width: '20%' },
    { label: 'OBESE', range: '≥ 30', color: '#ef4444', width: '40%' },
];

export default function BMICalculator() {
    const [unit, setUnit] = useState<Unit>('metric');
    const [height, setHeight] = useState('175');
    const [heightFt, setHeightFt] = useState('5');
    const [heightIn, setHeightIn] = useState('9');
    const [weight, setWeight] = useState('75');
    const [result, setResult] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const bmiNumberRef = useRef<HTMLSpanElement>(null);
    const pointerRef = useRef<HTMLDivElement>(null);

    // Scroll reveal
    useEffect(() => {
        if (!sectionRef.current) return;
        const section = sectionRef.current;

        const timer = setTimeout(() => {
            gsap.from(section.querySelectorAll('.bmi-left-content'), {
                opacity: 0,
                x: -60,
                duration: 1,
                stagger: 0.15,
                ease: 'power4.out',
                scrollTrigger: { trigger: section, start: 'top 80%', once: true },
            });

            gsap.from(section.querySelectorAll('.bmi-right-content'), {
                opacity: 0,
                x: 60,
                duration: 1,
                stagger: 0.15,
                ease: 'power4.out',
                scrollTrigger: { trigger: section, start: 'top 80%', once: true },
            });

            gsap.to(section.querySelectorAll('.bmi-dot'), {
                backgroundColor: '#C8FF00',
                boxShadow: '0 0 10px #C8FF00',
                scale: 0.6,
                opacity: 0.6,
                duration: 1.4,
                stagger: { each: 0.03, repeat: -1, yoyo: true },
                ease: 'power1.inOut',
            });

            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Result animation + pointer
    useEffect(() => {
        if (!result || !resultRef.current || !bmiNumberRef.current) return;

        gsap.fromTo(
            resultRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power4.out' }
        );

        gsap.fromTo(
            bmiNumberRef.current,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.8)' }
        );

        // Animate pointer on scale
        if (pointerRef.current) {
            const clamped = Math.min(Math.max(result, 10), 40);
            const pct = ((clamped - 10) / 30) * 100;
            gsap.to(pointerRef.current, {
                left: `${pct}%`,
                duration: 0.8,
                ease: 'power3.out',
            });
        }
    }, [result]);

    const calculateBMI = () => {
        let h = 0;
        const w = parseFloat(weight);

        if (unit === 'metric') {
            h = parseFloat(height) / 100;
        } else {
            const totalInches = parseFloat(heightFt) * 12 + parseFloat(heightIn);
            h = totalInches * 0.0254;
        }

        if (h > 0 && w > 0) {
            setResult(parseFloat((w / (h * h)).toFixed(1)));
        }
    };

    const getCategory = (bmi: number) => {
        if (bmi < 18.5) return { label: 'UNDERWEIGHT', color: '#3b82f6' };
        if (bmi < 25) return { label: 'NORMAL WEIGHT', color: '#E6FF4D' };
        if (bmi < 30) return { label: 'OVERWEIGHT', color: '#eab308' };
        return { label: 'OBESE', color: '#ef4444' };
    };

    return (
        <section ref={sectionRef} className="bmi-section border-y border-border overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">

                {/* LEFT */}
                <div className="bg-accent">
                    <div className="max-w-175 ml-auto p-12 lg:p-24 flex flex-col justify-center relative min-h-162.5 overflow-hidden">

                        {/* Dot pattern */}
                        <div className="absolute top-0 right-0 p-8 opacity-20 hidden lg:block">
                            <div className="grid grid-cols-5 gap-2">
                                {[...Array(25)].map((_, i) => (
                                    <div key={i} className="bmi-dot w-1.5 h-1.5 rounded-full bg-black" />
                                ))}
                            </div>
                        </div>

                        <h2 className="bmi-left-content text-section text-black mb-6 leading-none">
                            KNOW YOUR<br />BMI.
                        </h2>

                        <p className="bmi-left-content text-black/60 font-sans text-lg max-w-sm mb-12 leading-relaxed">
                            Your Body Mass Index is a simple calculation using
                            your height and weight. A quick way to know your body composition.
                        </p>

                        {/* BMI Scale with pointer */}
                        <div className="bmi-left-content space-y-4">
                            {/* Bar */}
                            <div className="relative">
                                <div className="flex h-3 rounded-full overflow-hidden">
                                    {bmiScale.map((s, i) => (
                                        <div key={i} style={{ width: s.width, backgroundColor: s.color }} />
                                    ))}
                                </div>

                                {/* Pointer triangle */}
                                <div
                                    ref={pointerRef}
                                    className="absolute -top-1 transition-none"
                                    style={{ left: '0%', transform: 'translateX(-50%)' }}
                                >
                                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-8 border-l-transparent border-r-transparent border-t-black" />
                                </div>
                            </div>

                            {/* Labels */}
                            <div className="flex justify-between">
                                {bmiScale.map((s, i) => (
                                    <div key={i} className="flex flex-col items-center gap-0.5" style={{ width: s.width }}>
                                        <span className="font-display text-[10px] text-black tracking-widest">{s.label}</span>
                                        <span className="font-mono text-[9px] text-black/50">{s.range}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="bg-surface">
                    <div className="max-w-175 mr-auto p-12 lg:p-24 flex flex-col justify-center min-h-162.5">
                        <div className="max-w-md w-full space-y-8">

                            {/* Unit toggle */}
                            <div className="bmi-right-content flex rounded-xl overflow-hidden border border-border w-fit">
                                {(['metric', 'imperial'] as Unit[]).map((u) => (
                                    <button
                                        key={u}
                                        onClick={() => { setUnit(u); setResult(null); }}
                                        className={cn(
                                            'px-6 py-2.5 font-display text-sm tracking-widest transition-all duration-300',
                                            unit === u
                                                ? 'bg-accent text-black'
                                                : 'text-muted hover:text-white'
                                        )}
                                    >
                                        {u === 'metric' ? 'METRIC' : 'IMPERIAL'}
                                    </button>
                                ))}
                            </div>

                            {/* Inputs */}
                            <div className="grid grid-cols-2 gap-6">
                                {unit === 'metric' ? (
                                    <div className="bmi-right-content space-y-2">
                                        <label className="text-[11px] uppercase tracking-widest text-muted">
                                            HEIGHT (CM)
                                        </label>
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 font-mono text-white focus:outline-none focus:border-accent transition-colors duration-300"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div className="bmi-right-content space-y-2">
                                            <label className="text-[11px] uppercase tracking-widest text-muted">
                                                HEIGHT (FT)
                                            </label>
                                            <input
                                                type="number"
                                                value={heightFt}
                                                onChange={(e) => setHeightFt(e.target.value)}
                                                className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 font-mono text-white focus:outline-none focus:border-accent transition-colors duration-300"
                                            />
                                        </div>
                                        <div className="bmi-right-content space-y-2">
                                            <label className="text-[11px] uppercase tracking-widest text-muted">
                                                HEIGHT (IN)
                                            </label>
                                            <input
                                                type="number"
                                                value={heightIn}
                                                onChange={(e) => setHeightIn(e.target.value)}
                                                className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 font-mono text-white focus:outline-none focus:border-accent transition-colors duration-300"
                                            />
                                        </div>
                                    </>
                                )}

                                <div className={cn("bmi-right-content space-y-2", unit === 'imperial' && 'col-span-2')}>
                                    <label className="text-[11px] uppercase tracking-widest text-muted">
                                        WEIGHT ({unit === 'metric' ? 'KG' : 'LBS'})
                                    </label>
                                    <input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 font-mono text-white focus:outline-none focus:border-accent transition-colors duration-300"
                                    />
                                </div>
                            </div>

                            {/* Button */}
                            <div className="bmi-right-content">
                                <MagneticButton onClick={calculateBMI} className="w-full py-4 text-xl">
                                    CALCULATE BMI
                                </MagneticButton>
                            </div>

                            {/* Result */}
                            {result && (
                                <div
                                    ref={resultRef}
                                    className="rounded-2xl p-6 glass border border-white/10 flex flex-col items-center justify-center min-h-55 gap-3"
                                >
                                    <span
                                        ref={bmiNumberRef}
                                        className="font-display text-8xl lg:text-9xl leading-none"
                                        style={{ color: getCategory(result).color }}
                                    >
                                        {result}
                                    </span>

                                    <span
                                        className="font-display text-2xl tracking-widest text-center"
                                        style={{ color: getCategory(result).color }}
                                    >
                                        {getCategory(result).label}
                                    </span>

                                    <p className="text-muted text-sm font-sans text-center max-w-xs leading-relaxed">
                                        Consult with our professional trainers for a
                                        detailed body composition analysis.
                                    </p>
                                </div>
                            )}

                            {/* Placeholder when no result */}
                            {!result && (
                                <div className="rounded-2xl p-6 glass border border-white/5 flex flex-col items-center justify-center min-h-55 gap-3 opacity-30">
                                    <span className="font-display text-7xl leading-none text-muted">--.-</span>
                                    <span className="font-display text-xl tracking-widest text-muted">BMI RESULT</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}