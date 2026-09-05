import styles from '../styles/ProjectsGrid.module.css';
import ChordFinderLogo from '../ChordFinder.png';
import DoughLoopsLogo from '../DoughLoops2-2.png';
import SynthPuttyLogo from '../SynthPuttyLogo.png';
import MatlabLogo from '../Matlab_Logo.png';

/*
 * Logos are imported rather than read from PUBLIC_URL so they go through the
 * bundler: content-hashed filenames mean a replaced logo is picked up instead
 * of being served from cache until someone hard-refreshes.
 */
const PROJECTS = [
    {
        title: 'DoughLoops',
        description: 'Make unique beats and rhythms!',
        link: 'https://evanczako.github.io/DoughLoops2/',
        img: DoughLoopsLogo,
    },
    {
        title: 'ChordFinder',
        description: 'Identify harmonies and chord voicings!',
        link: 'https://evanczako.github.io/ChordFinder2/',
        img: ChordFinderLogo,
    },
    {
        title: 'SynthPutty',
        description: 'Build synthesizers from the ground up!',
        link: 'https://evanczako.github.io/SynthPutty/',
        img: SynthPuttyLogo,
    },
    {
        title: 'MATLAB Central',
        description: 'Check out my MATLAB Central profile!',
        link: 'https://www.mathworks.com/matlabcentral/profile/authors/13527609',
        img: MatlabLogo,
    },
] as const;

export default function ProjectsGrid() {
    return (
        <section className={styles.projectSection} aria-labelledby="projects-heading">
            <h2 id="projects-heading" className={styles.heading}>
                Projects
            </h2>

            <ul className={styles.grid}>
                {PROJECTS.map((project) => (
                    <li key={project.title}>
                        <a
                            href={project.link}
                            className={styles.card}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className={styles.thumb}>
                                {/* The link is named by the title below, so the
                                    logo is decorative and stays out of the
                                    accessible name. */}
                                <img
                                    className={styles.thumbImage}
                                    src={project.img}
                                    alt=""
                                    loading="lazy"
                                />
                            </span>
                            <span className={styles.info}>
                                <span className={styles.title}>{project.title}</span>
                                <span className={styles.description}>{project.description}</span>
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
