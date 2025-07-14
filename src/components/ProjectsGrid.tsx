import React from 'react';
import styles from '../styles/ProjectsGrid.module.css';

const projects = [
    {
        title: 'DoughLoops',
        description: 'Beat making app',
        link: '/doughloops',
    },
    { title: 'Another App', description: 'Project description', link: '/app2' },
    // Add more
];

export default function ProjectsGrid() {
    return (
        <section className={styles.projectSection}>
            <h2>
                My Projects
            </h2>
            <div>
                {projects.map((project, idx) => (
					<div className={styles.projectWrapper}>
						<a
							key={idx}
							href={project.link}
						>
							<h3>
								{project.title}
							</h3>
							<p>{project.description}</p>
						</a>
					</div>

                ))}
            </div>
        </section>
    );
}
