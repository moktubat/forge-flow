import { useRef, type ReactNode, type MouseEvent } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function MagneticButton({
    children,
    className,
    onClick,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current || !textRef.current) return;

        const { clientX, clientY } = e;
        const rect = buttonRef.current.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Button magnetic movement
        gsap.to(buttonRef.current, {
            x: distanceX * 0.4,
            y: distanceY * 0.4,
            duration: 0.35,
            ease: 'power3.out',
        });

        // Text parallax movement
        gsap.to(textRef.current, {
            x: distanceX * 0.2,
            y: distanceY * 0.2,
            duration: 0.35,
            ease: 'power3.out',
        });
    };

    const handleMouseLeave = () => {
        if (!buttonRef.current || !textRef.current) return;

        gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.4)',
        });

        gsap.to(textRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.4)',
        });
    };

    return (
        <button
            ref={buttonRef}
            data-magnetic
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={cn(
                'relative rounded-full bg-accent text-black font-display text-lg px-8 py-3 active:scale-95 cursor-none will-change-transform',
                className
            )}
        >
            <div
                ref={textRef}
                className="relative z-10 flex items-center gap-2 will-change-transform"
            >
                {children}
            </div>
        </button>
    );
}