import { FC, SVGProps } from 'react';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import styles from '../styles/Footer.module.css';

/* react-icons ships its components typed as `IconType`, which React 18's JSX
 * namespace will not accept as an element directly. */
const GithubIcon = FaGithub as FC<SVGProps<SVGSVGElement>>;
const LinkedinIcon = FaLinkedin as FC<SVGProps<SVGSVGElement>>;
const FileIcon = FaFileAlt as FC<SVGProps<SVGSVGElement>>;

/* PUBLIC_URL rather than an absolute evanczako.github.io/DoughLab2/ link: the
 * site moved to its own domain, and the hardcoded path was serving whichever
 * resume happened to be deployed under the old project page. */
const RESUME_URL = `${process.env.PUBLIC_URL}/resume_fullstack.pdf`;

const LINKS = [
    { label: 'GitHub', href: 'https://github.com/EvanCzako', Icon: GithubIcon },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/evan-czako/', Icon: LinkedinIcon },
    { label: 'Résumé (PDF)', href: RESUME_URL, Icon: FileIcon },
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
