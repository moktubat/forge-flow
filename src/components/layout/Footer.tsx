import { ArrowRight } from 'lucide-react';

const InstagramIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.5A5.5 5.5 0 1017.5 13 5.51 5.51 0 0012 7.5zm0 2A3.5 3.5 0 1112 16a3.5 3.5 0 010-7zm5.75-2.75a1.25 1.25 0 11-1.25 1.25 1.25 1.25 0 011.25-1.25z" />
    </svg>
);

const TwitterIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22 5.8c-.7.3-1.4.5-2.2.6a3.8 3.8 0 001.7-2.1 7.5 7.5 0 01-2.4.9 3.8 3.8 0 00-6.5 3.5A10.8 10.8 0 013 4.9a3.8 3.8 0 001.2 5.1 3.7 3.7 0 01-1.7-.5v.1a3.8 3.8 0 003 3.7 3.8 3.8 0 01-1.7.1 3.8 3.8 0 003.6 2.6A7.6 7.6 0 012 18.1 10.7 10.7 0 007.8 20c7 0 10.8-5.8 10.8-10.8v-.5c.7-.5 1.4-1.2 1.9-2z" />
    </svg>
);

const YoutubeIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3 3 0 002.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 002.1-2.1A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.6 15.5v-7L15.8 12z" />
    </svg>
);

const FacebookIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-3h2.4V9.5c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.5.7-1.5 1.5V12H17l-.5 3h-2.5v7A10 10 0 0022 12z" />
    </svg>
);

export default function Footer() {
    const icons = [InstagramIcon, TwitterIcon, YoutubeIcon, FacebookIcon];

    return (
        <footer className="bg-[#050505] pt-24 pb-12 px-[clamp(16px,5vw,80px)] border-t border-border overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">

                    {/* Brand */}
                    <div className="md:col-span-5 flex flex-col items-start gap-8">
                        <div className="flex items-center gap-1">
                            <span className="font-display text-4xl tracking-tighter uppercase">
                                GYMFORGE
                            </span>
                            <div className="w-2.5 h-2.5 rounded-full bg-accent mt-1.5 animate-pulse" />
                        </div>

                        <p className="text-muted font-sans text-lg max-w-sm">
                            We are the premier destination for serious athletes and dedicated fitness enthusiasts. Forge your destiny with us.
                        </p>

                        <div className="flex items-center gap-4">
                            {icons.map((Icon, i) => (
                                <button
                                    key={i}
                                    className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center text-muted hover:bg-accent hover:text-black transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="md:col-span-2 flex flex-col gap-8">
                        <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted font-medium">
                            EXPLORE
                        </h4>
                        <div className="flex flex-col gap-4">
                            {['Home', 'Programs', 'Trainers', 'About', 'Blog'].map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="font-sans text-sm text-muted hover:text-white transition-colors uppercase tracking-widest"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-8">
                        <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted font-medium">
                            SUPPORT
                        </h4>
                        <div className="flex flex-col gap-4">
                            {['FAQ', 'Contact', 'Privacy', 'Terms', 'Locations'].map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="font-sans text-sm text-muted hover:text-white transition-colors uppercase tracking-widest"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="md:col-span-3 flex flex-col gap-8">
                        <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted font-medium">
                            STAY IN SHAPE
                        </h4>

                        <p className="text-muted font-sans text-sm">
                            Join our mailing list for elite training tips and exclusive offers.
                        </p>

                        <div className="relative w-full group">
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                className="w-full bg-surface-2 border border-border rounded-full py-4 px-6 font-display tracking-widest text-sm focus:outline-none focus:border-accent"
                            />
                            <button className="absolute right-2 top-2 bottom-2 aspect-square rounded-full bg-accent text-black flex items-center justify-center group-hover:scale-105 transition-transform">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
                    <span className="font-sans text-[12px] text-muted/60 uppercase tracking-widest">
                        © 2026 GYMFORGE. ALL RIGHTS RESERVED.
                    </span>
                    <span className="font-sans text-[12px] text-muted/60 uppercase tracking-widest italic">
                        BUILT FOR PERFORMANCE.
                    </span>
                </div>
            </div>
        </footer>
    );
}