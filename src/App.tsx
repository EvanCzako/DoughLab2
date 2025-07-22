import React, {useEffect} from 'react';
import AboutSection from './components/AboutSection';
import ProjectsGrid from './components/ProjectsGrid';
import MouseRing from './components/MouseRing';
import Footer from './components/Footer';
import Skills from './components/Skills';
import styles from './App.module.css';
import { useStore } from './store';

export default function App() {

	const updateFontSize = useStore(s => s.updateFontSize);

	useEffect(() => {
		updateFontSize();
		window.addEventListener('resize', updateFontSize);
		return () => window.removeEventListener('resize', updateFontSize);
	}, [updateFontSize]);

    return (
        <main className={styles.app}>
			<MouseRing/>
            <div className={styles.fullWidth}>
                <Footer />
            </div>
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
