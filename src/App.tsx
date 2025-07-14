import React from 'react';
import AboutSection from './components/AboutSection';
import ProjectsGrid from './components/ProjectsGrid';
import MouseRing from './components/MouseRing';
import Footer from './components/Footer';
import styles from './App.module.css';

export default function App() {
    return (
        <main className={`${styles.app}`}>
			{/* <MouseRing /> */}

			<div className={styles.appLayout}>
				<AboutSection />
				<ProjectsGrid />
			</div>
			
			<Footer/>
        </main>
    );
}
