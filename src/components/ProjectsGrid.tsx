import React from 'react';
import styles from '../styles/ProjectsGrid.module.css';
import ChordFinder from '../ChordFinder.png';
import DoughLoops2 from '../DoughLoops2-2.png';
import SynthPutty from '../SynthPuttyLogo.png';
import MusicNotes from '../MusicNotes.png';
import { useStore } from '../store';

const projects = [
    {
        title: 'DoughLoops',
        description: 'Make unique beats and rhythms!',
        link: 'https://evanczako.github.io/DoughLoops2/',
		img: DoughLoops2
    },
    { title: 'ChordFinder', description: 'Identify harmonies!', link: 'https://evanczako.github.io/ChordFinder2/', img: ChordFinder },
	{ title: 'SynthPutty', description: 'Build synthesizers from the ground-up!', link: 'https://evanczako.github.io/SynthPutty/', img: SynthPutty },
    { title: 'Music', description: 'A link to my music on Spotify (also on all other platforms)!', link: 'https://open.spotify.com/artist/68GBBhx96KrDxce6eT0Tzz', img: MusicNotes },
];

export default function ProjectsGrid() {

    const fontSize = useStore(s => s.fontSize);
	const vw = useStore(s => s.vw);

    return (
        <section className={styles.projectSection}>
            <h2>Projects</h2>
            <div className={styles.gridWrapper}>
                {projects.map((project, idx) => (
                    <div className={styles.projectWrapper}>
                        <a key={idx} href={project.link} className={styles.projectLink} target='_blank'>
							<img className={styles.projectImage} src={project.img} alt=""/>
                        </a>
                        <div className={styles.projectDescription} style={{fontSize: fontSize*0.8}}>{project.description}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
