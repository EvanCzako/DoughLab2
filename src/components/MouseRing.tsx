import { useEffect, useRef } from 'react';
import styles from '../styles/MouseRing.module.css';

export default function MouseRing() {
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let rafId: number;
        const moveRing = (e: MouseEvent) => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                if (ringRef.current) {
                    ringRef.current.style.transform = `translate(${e.clientX - 400}px, ${e.clientY - 400}px)`;
                }
            });
        };

        window.addEventListener('mousemove', moveRing);
        return () => {
            window.removeEventListener('mousemove', moveRing);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return <div ref={ringRef} className={styles.mouseRing} />;
}
