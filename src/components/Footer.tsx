import { FC, SVGProps } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import styles from '../styles/Footer.module.css';

/* react-icons ships its components typed as `IconType`, which React 18's JSX
 * namespace will not accept as an element directly. */
const GithubIcon = FaGithub as FC<SVGProps<SVGSVGElement>>;
const LinkedinIcon = FaLinkedin as FC<SVGProps<SVGSVGElement>>;

/* The résumé link and public/resume_fullstack.pdf were both removed
 * deliberately: nothing should serve a résumé at a stable public URL right now.
 * Dropping only the link would have left the PDF reachable and indexable, since
 * GitHub Pages cannot send an X-Robots-Tag header. Restore from git history if
 * it is ever wanted again, and re-add a Disallow line at the same time. */
const LINKS = [
    { label: 'GitHub', href: 'https://github.com/EvanCzako', Icon: GithubIcon },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/evan-czako/', Icon: LinkedinIcon },
] as const;

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.links}>
                {LINKS.map(({ label, href, Icon }) => (
                    <li key={label}>
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                            /* The visual is an icon, so the link needs a name
                               of its own; the title makes it discoverable to
                               sighted users too. */
                            aria-label={label}
                            title={label}
                        >
                            <Icon aria-hidden="true" focusable="false" />
                        </a>
                    </li>
                ))}
            </ul>

            <p className={styles.colophon}>
                Built with React, TypeScript and CSS Modules · © {new Date().getFullYear()} Evan
                Czako
            </p>
        </footer>
    );
}
