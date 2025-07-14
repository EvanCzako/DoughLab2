// MouseRing.tsx
import React, { useEffect, useRef } from 'react';
import styles from '../styles/MouseRing.module.css';

export default function MouseRing() {
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moveRing = (e: MouseEvent) => {
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
            }
        };

        window.addEventListener('mousemove', moveRing);
        return () => window.removeEventListener('mousemove', moveRing);
    }, []);

    return <div ref={ringRef} className={styles.mouseRing} />;
}
