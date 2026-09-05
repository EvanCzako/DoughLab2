import AboutSection from './components/AboutSection';
import ProjectsGrid from './components/ProjectsGrid';
import MouseRing from './components/MouseRing';
import Footer from './components/Footer';
import Skills from './components/Skills';
import ThemeSwitcher from './components/ThemeSwitcher';
import styles from './App.module.css';

/*
 * The page is a plain document: header, one content band, footer.
 *
 * Projects and Skills share a wrapper rather than being placed individually in
 * the band's grid: the bio is far taller than either, and a grid item spanning
 * two auto rows distributes its extra height across them, which opened a
 * hundred-pixel hole between the two right-hand panels.
 *
 * There used to be a zustand store here whose only job was to publish the
 * viewport width so AboutSection could pick between two portrait images. The
 * stylesheet already branched on the same breakpoint, and two mechanisms for
 * one decision drift -- so the branch moved into CSS and the store, the
 * debounced resize listener and the unread --vw/--vh custom properties it
 * wrote all went with it.
 */
export default function App() {
    return (
        <div className={styles.page}>
            <MouseRing />

            <header className={styles.siteHeader}>
                <span className={styles.siteName}>Dough Boi's Bakery</span>
                <ThemeSwitcher />
            </header>

            <main className={styles.mainGrid}>
                <AboutSection />
                <div className={styles.sideColumn}>
                    <ProjectsGrid />
                    <Skills />
                </div>
            </main>

            <Footer />
        </div>
    );
}
