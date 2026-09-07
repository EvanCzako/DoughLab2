import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { THEMES, DEFAULT_THEME, ThemeId, applyTheme, readStoredTheme } from '../theme';
import styles from '../styles/ThemeSwitcher.module.css';

/* Gap between the trigger and the panel below it. */
const PANEL_OFFSET_PX = 8;

/* Smallest gap left between the panel and the edge of the viewport. Matches
 * the 20px total that .panel's `width: min(400px, calc(100vw - 20px))`
 * reserves, so on a narrow screen the panel lands centred in the space that
 * width leaves it. */
const VIEWPORT_MARGIN_PX = 10;

const TONE_GROUPS = [
    { tone: 'dark', label: 'Dark' },
    { tone: 'light', label: 'Light' },
] as const;

/*
 * The panel is portalled to <body> and fixed-positioned because .app and
 * .panel both clip overflow, so an absolutely positioned popover would be cut
 * off at the header's edge.
 */
export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<ThemeId>(readStoredTheme);
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState({ top: 0, right: 0 });

    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => applyTheme(theme), [theme]);

    useLayoutEffect(() => {
        if (!open) return;

        const place = () => {
            const rect = triggerRef.current?.getBoundingClientRect();
            const panel = panelRef.current;
            if (!rect || !panel) return;

            /*
             * The panel hangs from the trigger's right edge, which silently
             * assumes the trigger sits within ~10px of the viewport edge --
             * true in the sibling apps, whose header is inset only by a 5px
             * panel gap and its own padding.
             *
             * Here the header is inset by the page gutter AND its own 1.5rem
             * padding, putting the trigger 37px in. At 390px the panel is
             * 370px wide, so 390 - 37 - 370 left it hanging 17px off the far
             * side of the screen. Clamping the anchor keeps the left edge on
             * screen; where the trigger is already near the edge the clamp
             * does not bind and the panel stays flush with it as before.
             */
            const maxRight = Math.max(
                VIEWPORT_MARGIN_PX,
                window.innerWidth - panel.offsetWidth - VIEWPORT_MARGIN_PX
            );

            setPos({
                top: rect.bottom + PANEL_OFFSET_PX,
                right: Math.min(window.innerWidth - rect.right, maxRight),
            });
        };

        place();
        window.addEventListener('resize', place);
        return () => window.removeEventListener('resize', place);
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const onPointerDown = (e: MouseEvent) => {
            const target = e.target as Node;
            if (!panelRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
                setOpen(false);
            }
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };

        document.addEventListener('mousedown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('mousedown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    const currentLabel = THEMES.find((t) => t.id === theme)?.label ?? theme;

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                className={styles.trigger}
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-haspopup="dialog"
                aria-label={`Theme: ${currentLabel}`}
                title="Theme"
            >
                <span className={styles.swatches} aria-hidden="true">
                    <i style={{ background: 'var(--seed-accent)' }} />
                    <i style={{ background: 'var(--seed-active)' }} />
                    <i style={{ background: 'var(--seed-playhead)' }} />
                </span>
            </button>

            {open &&
                createPortal(
                    <div
                        ref={panelRef}
                        className={styles.panel}
                        style={{ top: `${pos.top}px`, right: `${pos.right}px` }}
                        role="dialog"
                        aria-label="Theme"
                    >
                        {TONE_GROUPS.map((group) => (
                            <div key={group.tone}>
                                <div className={styles.groupLabel}>{group.label}</div>
                                <div className={styles.swatchGrid}>
                                    {THEMES.filter((t) => t.tone === group.tone).map((option) => (
                                        <button
                                            key={option.id}
                                            type="button"
                                            /* Each swatch carries its own data-theme, so the
                                               seeds inside it resolve to that theme rather
                                               than the active one. */
                                            data-theme={
                                                option.id === DEFAULT_THEME ? undefined : option.id
                                            }
                                            className={`${styles.swatch} ${
                                                option.id === theme ? styles.swatchActive : ''
                                            }`}
                                            aria-pressed={option.id === theme}
                                            onClick={() => setTheme(option.id)}
                                        >
                                            <span className={styles.swatchChip} aria-hidden="true">
                                                <i style={{ background: 'var(--seed-bg)' }} />
                                                <i style={{ background: 'var(--seed-accent)' }} />
                                                <i style={{ background: 'var(--seed-active)' }} />
                                                <i style={{ background: 'var(--seed-playhead)' }} />
                                            </span>
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>,
                    document.body
                )}
        </>
    );
}
