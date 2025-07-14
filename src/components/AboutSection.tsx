import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import { useStore } from '../store';
import styles from '../styles/AboutSection.module.css';

const GithubIcon = FaGithub as React.FC<React.SVGProps<SVGSVGElement>>;
const LinkedinIcon = FaLinkedin as React.FC<React.SVGProps<SVGSVGElement>>;
const FileIcon = FaFileAlt as React.FC<React.SVGProps<SVGSVGElement>>;

export default function AboutSection() {
    const fontSize = useStore(s => s.fontSize);

    return (
        <section
            className={styles.aboutSection}
            style={{ fontSize }}
        >
            <h1>Evan Czako</h1>
            <p>
                I'm a full-stack developer passionate about building interactive
                and performant web applications.
            </p>
            <div className={styles.linksContainer}>
                <a href="https://github.com/EvanCzako" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <GithubIcon className="social-link" />
                </a>
                <a href="https://www.linkedin.com/in/evan-czako/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <LinkedinIcon className="social-link" />
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <FileIcon className="social-link" />
                </a>
            </div>
        </section>
    );
}
