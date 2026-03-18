import { useEffect } from 'react';
import AboutSection from './components/AboutSection';
import ProjectsGrid from './components/ProjectsGrid';
import MouseRing from './components/MouseRing';
import Footer from './components/Footer';
import Skills from './components/Skills';
import styles from './App.module.css';
import { useStore } from './store';

export default function App() {
    const updateVw = useStore(s => s.updateVw);

    useEffect(() => {
        updateVw();
        let debounceTimer: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(updateVw, 100);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(debounceTimer);
        };
    }, [updateVw]);

    return (
        <main className={styles.app}>
            <MouseRing />
            <header className={styles.siteHeader}>
                <span className={styles.siteName}>Dough's Lab</span>
                <Footer variant="header" />
            </header>
            <div className={styles.contentContainer}>
                <div className={styles.mainGrid}>
                    <AboutSection />
                    <ProjectsGrid />
                </div>
            </div>
            <Skills />
            <Footer />
        </main>
    );
}
