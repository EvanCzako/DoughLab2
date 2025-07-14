import React from 'react';
import AboutSection from './components/AboutSection';
import ProjectsGrid from './components/ProjectsGrid';
import styles from './App.module.css';

export default function App() {
    return (
        <main className={`${styles.app} ${styles.appLayout}`}>
            <AboutSection />
            <ProjectsGrid />
        </main>
    );
}
