import React from 'react';
import AboutSection from './components/AboutSection';
import ProjectsGrid from './components/ProjectsGrid';
import MouseRing from './components/MouseRing';
import Footer from './components/Footer';
import Skills from './components/Skills';
import styles from './App.module.css';

export default function App() {
    return (
		<main className={styles.app}>
			<div className={styles.scrollArea}>
				<div className={styles.appLayout}>
				<div className={styles.aboutWrapper}>
					<AboutSection />
				</div>
				<div className={styles.projectWrapper}>
					<ProjectsGrid />
				</div>
				</div>
			</div>

			<div className={styles.fullWidth}>
				<Skills />
				<Footer />
			</div>
		</main>

    );
}
