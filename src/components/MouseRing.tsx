import { useEffect, useRef } from 'react';
import styles from '../styles/MouseRing.module.css';

/* Half the ring's size in MouseRing.module.css -- the offset that centres it
 * on the pointer. Both must change together. */
const RING_RADIUS_PX = 400;

/*
 * A soft accent glow that trails the cursor.
 *
 * It renders nothing at all on a device without a fine pointer, and nothing
 * until the pointer has actually moved: the element used to mount with no
 * transform, which parked a quarter of an 800px glow in the top-left corner of
 * every phone that never fires a mousemove.
 */
export default function MouseRing() {
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        /* Feature-detected rather than sniffed: a laptop with a touchscreen
         * still has a mouse, and a tablet with a trackpad reports `fine`. */
        const finePointer = window.matchMedia('(pointer: fine)');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!finePointer.matches || reducedMotion.matches) return;

        let frame = 0;
        const move = (e: MouseEvent) => {
            /* Coalesced to one write per frame: mousemove fires far more often
             * than the compositor paints. */
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const ring = ringRef.current;
                if (!ring) return;
                ring.style.transform = `translate3d(${e.clientX - RING_RADIUS_PX}px, ${
                    e.clientY - RING_RADIUS_PX
                }px, 0)`;
                ring.style.opacity = '1';
            });
        };

        window.addEventListener('mousemove', move);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('mousemove', move);
        };
    }, []);

    return <div ref={ringRef} className={styles.mouseRing} aria-hidden="true" />;
}
