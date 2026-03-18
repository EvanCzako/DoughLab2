import styles from '../styles/ProjectsGrid.module.css';
import ChordFinder from '../ChordFinder.png';
import DoughLoops2 from '../DoughLoops2-2.png';
import SynthPutty from '../SynthPuttyLogo.png';

const projects = [
    {
        title: 'DoughLoops',
        description: 'Make unique beats and rhythms!',
        link: 'https://evanczako.github.io/DoughLoops2/',
        img: DoughLoops2,
    },
    {
        title: 'ChordFinder',
        description: 'Identify harmonies and chord voicings!',
        link: 'https://evanczako.github.io/ChordFinder2/',
        img: ChordFinder,
    },
    {
        title: 'SynthPutty',
        description: 'Build synthesizers from the ground up!',
        link: 'https://evanczako.github.io/SynthPutty/',
        img: SynthPutty,
    },
    {
        title: 'MATLAB Central',
        description: 'Check out my MATLAB Central profile!',
        link: 'https://www.mathworks.com/matlabcentral/profile/authors/13527609',
        img: `${process.env.PUBLIC_URL}/Matlab_Logo.png`,
    },
];

export default function ProjectsGrid() {
    return (
        <section className={styles.projectSection}>
            <h2>Projects</h2>
            <div className={styles.gridWrapper}>
                {projects.map(project => (
                    <a
                        key={project.title}
                        href={project.link}
                        className={styles.projectWrapper}
                        rel="noopener noreferrer"
                    >
                        <div className={styles.projectLink}>
                            <img
                                className={styles.projectImage}
                                src={project.img}
                                alt={project.title}
                                loading="lazy"
                            />
                        </div>
                        <div className={styles.projectInfo}>
                            <div className={styles.projectTitle}>
                                {project.title}
                            </div>
                            <div className={styles.projectDescription}>
                                {project.description}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
