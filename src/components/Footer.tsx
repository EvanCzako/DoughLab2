import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import { useStore } from '../store';
import styles from '../styles/Footer.module.css';

const GithubIcon = FaGithub as React.FC<React.SVGProps<SVGSVGElement>>;
const LinkedinIcon = FaLinkedin as React.FC<React.SVGProps<SVGSVGElement>>;
const FileIcon = FaFileAlt as React.FC<React.SVGProps<SVGSVGElement>>;

export default function Footer() {
    const fontSize = useStore(s => s.fontSize);

    return (
        <section className={styles.footer} style={{ fontSize }}>
            <div className={styles.linksContainer}>
                <a
                    href="https://github.com/EvanCzako"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                >
                    <GithubIcon className="social-link" />
                </a>
                <a
                    href="https://www.linkedin.com/in/evan-czako/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                >
                    <LinkedinIcon className="social-link" />
                </a>
				<a
					href="/resume.pdf"
					// target="_blank"
					rel="noopener noreferrer"
					className={styles.socialLink}
				>
					<FileIcon />
				</a>
            </div>
        </section>
    );
}
