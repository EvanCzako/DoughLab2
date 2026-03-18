import { FC, SVGProps } from 'react';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import styles from '../styles/Footer.module.css';

const GithubIcon = FaGithub as FC<SVGProps<SVGSVGElement>>;
const LinkedinIcon = FaLinkedin as FC<SVGProps<SVGSVGElement>>;
const FileIcon = FaFileAlt as FC<SVGProps<SVGSVGElement>>;

export default function Footer({
    variant = 'footer',
}: {
    variant?: 'header' | 'footer';
}) {
    const cls = variant === 'header' ? styles.footerHeader : styles.footer;

    return (
        <section className={cls}>
            <div className={styles.linksContainer}>
                <a
                    href="https://github.com/EvanCzako"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                >
                    <GithubIcon />
                </a>
                <a
                    href="https://www.linkedin.com/in/evan-czako/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                >
                    <LinkedinIcon />
                </a>
                <a
                    href="https://evanczako.github.io/DoughLab2/resume_fullstack.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                >
                    <FileIcon />
                </a>
            </div>
        </section>
    );
}
