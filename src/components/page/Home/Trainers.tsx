"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import SectionHeader from "@/components/common/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

type Trainer = {
    name: string;
    role: string;
    image: string;
    bio: string;
};

const trainers: Trainer[] = [
    {
        name: "SARAH CONNOR",
        role: "ELITE STRENGTH",
        image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80",
        bio: "Former high-performance athlete specializing in raw power development.",
    },
    {
        name: "JAXON REED",
        role: "HIIT SPECIALIST",
        image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80",
        bio: "Transforming stamina through intense high-velocity interval protocols.",
    },
    {
        name: "MARCUS THOR",
        role: "BODYBUILDING",
        image: "https://images.unsplash.com/photo-1704223523169-52feeed90365?w=400&q=80",
        bio: "Master of hypertrophy and professional stage-ready aesthetics.",
    },
    {
        name: "LUNA GREY",
        role: "YOGA & MOBILITY",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
        bio: "Bridging the gap between explosive power and professional mobility.",
    },
];

export default function Trainers() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const cleanups: (() => void)[] = [];

    useEffect(() => {
        if (!sectionRef.current) return;
        const section = sectionRef.current;

        const timer = setTimeout(() => {
            gsap.from(section.querySelectorAll('.trainers-header'), {
                opacity: 0,
                y: 40,
                duration: 1,
                stagger: 0.15,
                ease: 'power4.out',
                scrollTrigger: { trigger: section, start: 'top 80%', once: true },
            });

            gsap.from(section.querySelectorAll('.trainer-card'), {
                opacity: 0,
                y: 60,
                stagger: 0.15,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: section.querySelector('.trainers-grid'),
                    start: 'top 80%',
                    once: true,
                },
            });

            section.querySelectorAll<HTMLElement>(".trainer-card").forEach((card) => {
                const img = card.querySelector<HTMLElement>(".trainer-img")!;
                const info = card.querySelector<HTMLElement>(".trainer-info")!;
                const bio = card.querySelector<HTMLElement>(".trainer-bio")!;
                const socials = card.querySelector<HTMLElement>(".trainer-socials")!;

                gsap.set(img, { scale: 1 });
                gsap.set(info, { y: 0 });

                gsap.set(bio, {
                    height: 0,
                    opacity: 0,
                    y: 10,
                    visibility: "hidden",
                });

                gsap.set(socials, {
                    opacity: 0,
                    y: 10,
                    visibility: "hidden",
                });

                const tl = gsap.timeline({
                    paused: true,
                    defaults: {
                        ease: "power3.out",
                    },
                });

                tl.add(() => {
                    bio.style.visibility = "visible";
                    socials.style.visibility = "visible";
                })

                    .to(
                        img,
                        {
                            scale: 1.1,
                            duration: 0.6,
                        },
                        0
                    )

                    .to(
                        info,
                        {
                            y: -20,
                            duration: 0.45,
                        },
                        0
                    )

                    .to(
                        bio,
                        {
                            height: "auto",
                            opacity: 1,
                            y: 0,
                            duration: 0.4,
                        },
                        0.05
                    )

                    .to(
                        socials,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.35,
                        },
                        0.15
                    );

                tl.eventCallback("onReverseComplete", () => {
                    bio.style.visibility = "hidden";
                    socials.style.visibility = "hidden";
                });

                const onEnter = () => tl.play();
                const onLeave = () => tl.reverse();

                card.addEventListener("mouseenter", onEnter);
                card.addEventListener("mouseleave", onLeave);

                cleanups.push(() => {
                    card.removeEventListener("mouseenter", onEnter);
                    card.removeEventListener("mouseleave", onLeave);
                    tl.kill();
                });
            });

            ScrollTrigger.refresh();
        }, 100);

        return () => {
            clearTimeout(timer);
            cleanups.forEach((fn) => fn());
        };
    }, []);

    return (
        <section ref={sectionRef} id="trainers" className="py-16 md:py-24 overflow-hidden">
            <div className="px-[clamp(16px,5vw,80px)] overflow-hidden">
                {/* Header */}
                <div className="max-w-xl mx-auto text-center mb-8 md:mb-24 flex flex-col items-center gap-4 md:gap-6">
                    <SectionHeader
                        label="ELITE COACHES"
                        heading={"MEET YOUR\nCOACHES."}
                        accentWord="COACHES."
                        align="center"
                        animationClass="trainers-header"
                    />
                    <p className="trainers-header text-white/60 font-sans text-base md:text-lg">
                        Our world-class instructors are dedicated to your evolution. Each is a
                        certified expert in high-performance methodology.
                    </p>
                </div>

                {/* Grid */}
                <div className="trainers-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {trainers.map((trainer, i) => (
                        <div
                            key={i}
                            className="trainer-card group relative h-90 md:h-130 rounded-lg md:rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <img
                                src={trainer.image}
                                alt={trainer.name}
                                className="trainer-img absolute inset-0 w-full h-full object-cover grayscale"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-90" />

                            <div className="trainer-info absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start">
                                <div className="flex flex-col gap-1">
                                    <span className="font-sans text-[11px] text-accent tracking-[0.2em] uppercase font-bold">
                                        {trainer.role}
                                    </span>
                                    <h3 className="font-display text-4xl text-white leading-none">
                                        {trainer.name}
                                    </h3>
                                </div>

                                <div
                                    className="trainer-bio overflow-hidden"
                                    style={{
                                        height: 0,
                                        opacity: 0,
                                        visibility: "hidden",
                                    }}
                                >
                                    <p className="font-sans text-sm text-white/60 mb-6 leading-relaxed">
                                        {trainer.bio}
                                    </p>

                                    <div
                                        className="trainer-socials flex items-center gap-3 invisible"
                                        style={{ opacity: 0, transform: 'translateY(10px)' }}
                                    >
                                        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition">
                                            <FaInstagram className="w-4 h-4" />
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition">
                                            <FaTwitter className="w-4 h-4" />
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition">
                                            <FaLinkedin className="w-4 h-4" />
                                        </button>
                                        <div className="ml-auto flex items-center gap-2 text-accent text-sm font-display tracking-widest hover:underline">
                                            PROFILE
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}