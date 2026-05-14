"use client"

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
        });

        const moveCursor = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            const isInteractive =
                target.closest('button') ||
                target.closest('a') ||
                target.closest('[data-magnetic]') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isInteractive);

            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.18,
                ease: 'power3.out',
            });
        };

        const handleMouseDown = () => {
            setIsClicked(true);
            gsap.to(cursor, {
                scale: 0.75,
                duration: 0.15,
                ease: 'power2.out',
            });
        };

        const handleMouseUp = () => {
            setIsClicked(false);
            gsap.to(cursor, {
                scale: 1,
                duration: 0.15,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, { opacity: 0, duration: 0.2 });
        };

        const handleMouseEnter = () => {
            gsap.to(cursor, { opacity: 1, duration: 0.2 });
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        gsap.to(cursor, {
            width: isHovering ? 44 : 14,
            height: isHovering ? 44 : 14,
            duration: 0.25,
            ease: 'power3.out',
            backgroundColor: isHovering
                ? 'rgba(200, 255, 0, 0.12)'
                : 'rgba(255, 255, 255, 1)',
            borderWidth: isHovering ? 1 : 0,
            borderColor: isHovering
                ? 'rgba(200, 255, 0, 0.5)'
                : 'transparent',
        });
    }, [isHovering, isClicked]);

    return (
        <div
            ref={cursorRef}
            className="pointer-events-none fixed top-0 left-0 rounded-full border border-transparent"
            style={{
                width: 14,
                height: 14,
                background: '#fff',
                zIndex: 99999,
            }}
        />
    );
}