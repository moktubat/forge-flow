"use client"
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/common/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const watermarkRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.ticker.fps(60);

        const ctx = gsap.context(() => {
            const marquee = watermarkRef.current;
            const header = document.querySelector('.programs-header');

            if (!marquee) return;

            // ---------------------------
            // GPU OPTIMIZATION
            // ---------------------------
            gsap.set(marquee, {
                willChange: 'transform',
                force3D: true,
            });

            // ---------------------------
            // HEADER ANIMATION (SAFE FIX)
            // ---------------------------
            if (header) {
                gsap.from(header, {
                    opacity: 0,
                    y: 40,
                    duration: 1,
                    ease: 'power4.out',
                });
            }

            // ---------------------------
            // ENTRANCE ANIMATION
            // ---------------------------
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    once: true,
                },
                defaults: {
                    ease: 'power4.out',
                },
            });

            tl.from(marquee, {
                opacity: 0,
                duration: 1,
            })
                .from(subRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                }, '-=0.6')
                .from(titleRef.current, {
                    opacity: 0,
                    y: 60,
                    duration: 0.9,
                }, '-=0.4')
                .from(textRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                }, '-=0.5')
                .from(formRef.current, {
                    opacity: 0,
                    y: 40,
                    duration: 0.7,
                }, '-=0.4');

            // ---------------------------
            // PERFECT MARQUEE (SLOWED + DEBUG)
            // ---------------------------

            let currentX = 0;

            // 🔥 SLOWED DOWN BASE SPEED
            let targetSpeed = -0.05;
            let currentSpeed = -0.05;

            let lastScrollY = window.scrollY;

            const SPEED_MULTIPLIER = 0.6;

            const setX = gsap.quickSetter(marquee, 'xPercent');

            const wrap = gsap.utils.wrap(-50, 0);

            let frame = 0;

            const update = () => {
                frame++;

                const scrollY = window.scrollY;
                const delta = scrollY - lastScrollY;
                lastScrollY = scrollY;

                // ---------------------------
                // DIRECTION CONTROL (SOFT)
                // ---------------------------
                if (Math.abs(delta) > 0.5) {
                    targetSpeed = delta > 0 ? -0.25 : 0.25; // slowed from ±0.9
                } else {
                    targetSpeed *= 0.97;

                    if (Math.abs(targetSpeed) < 0.05) {
                        targetSpeed = targetSpeed < 0 ? -0.05 : 0.05;
                    }
                }

                // ---------------------------
                // SMOOTH LERP
                // ---------------------------
                currentSpeed +=
                    (targetSpeed - currentSpeed) * 0.06;

                // ---------------------------
                // MOTION UPDATE
                // ---------------------------
                currentX +=
                    currentSpeed *
                    gsap.ticker.deltaRatio() *
                    SPEED_MULTIPLIER;

                // ---------------------------
                // PERFECT LOOP
                // ---------------------------
                currentX = wrap(currentX);

                setX(currentX);

                // ---------------------------
                // DEBUG (every 10 frames only)
                // ---------------------------
                if (frame % 10 === 0) {
                    console.log({
                        currentSpeed: currentSpeed.toFixed(3),
                        targetSpeed: targetSpeed.toFixed(3),
                        delta: delta.toFixed(3),
                    });
                }
            };

            gsap.ticker.add(update);

            return () => {
                gsap.ticker.remove(update);
            };
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-32 px-[clamp(16px,5vw,80px)] bg-accent overflow-hidden"
        >
            {/* Watermark */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none flex items-center">
                <div
                    className="flex whitespace-nowrap"
                    ref={watermarkRef}
                >
                    <h2 className="text-[30vw] shrink-0 font-display text-black/5 leading-none">
                        GYMFORGE&nbsp;GYMFORGE&nbsp;GYMFORGE&nbsp;
                    </h2>

                    <h2 className="text-[30vw] shrink-0 font-display text-black/5 leading-none">
                        GYMFORGE&nbsp;GYMFORGE&nbsp;GYMFORGE&nbsp;
                    </h2>
                </div>
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="flex flex-col items-center gap-8">
                    {/* Subheading */}
                    <span
                        ref={subRef}
                        className="font-sans text-sm tracking-[0.3em] text-black font-bold uppercase"
                    >
                        LIMITED TIME OFFER · FIRST 50 MEMBERS
                    </span>

                    {/* Title */}
                    <h2
                        ref={titleRef}
                        className="font-display text-[clamp(56px,8vw,112px)] leading-[0.9] text-black uppercase"
                    >
                        START YOUR FREE
                        <br />
                        7-DAY TRIAL.
                    </h2>

                    {/* Text */}
                    <p
                        ref={textRef}
                        className="text-black/60 font-sans text-xl max-w-lg mb-8"
                    >
                        Experience our high-performance facility and elite
                        coaching without any commitment. No credit card required.
                    </p>

                    {/* Form */}
                    <div
                        ref={formRef}
                        className="flex flex-col md:flex-row items-center gap-4 w-full max-w-xl mx-auto"
                    >
                        <input
                            type="email"
                            placeholder="ENTER YOUR EMAIL"
                            className="flex-1 bg-white rounded-full py-5 px-10 text-black font-sans text-lg focus:outline-none placeholder:text-black/30 shadow-2xl"
                        />

                        <MagneticButton className="bg-black text-white px-12 py-5 text-xl font-bold md:w-auto w-full shadow-2xl">
                            CLAIM TRIAL
                        </MagneticButton>
                    </div>

                    {/* Footer notes */}
                    <div className="flex items-center gap-4 text-black/40 font-sans text-sm uppercase tracking-widest mt-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
                        NO RECURRING FEES
                        <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
                        INSTANT ACCESS
                    </div>
                </div>
            </div>
        </section>
    );
}