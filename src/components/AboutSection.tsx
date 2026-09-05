import styles from '../styles/AboutSection.module.css';
import EvanTall from '../Evan.jpg';
import EvanWide from '../Evan2.jpg';

/* Must match the .aboutCard breakpoint in AboutSection.module.css, where the
 * card turns from a stack into a row and the portrait slot changes shape. */
const WIDE_LAYOUT = '(min-width: 700px)';

/*
 * One portrait, two crops. <picture> is doing the work rather than two <img>
 * tags toggled with `display`, because a hidden <img> is still fetched -- the
 * page would pull both files at every width. It also replaces the old
 * arrangement, where a zustand store published the viewport width so the JSX
 * could branch at a breakpoint the stylesheet was already branching on.
 */
export default function AboutSection() {
    return (
        <section className={styles.aboutCard} aria-labelledby="about-heading">
            <picture className={styles.portraitFrame}>
                <source media={WIDE_LAYOUT} srcSet={EvanTall} />
                <img src={EvanWide} alt="Evan Czako" className={styles.portrait} />
            </picture>

            <div className={styles.body}>
                <h1 id="about-heading" className={styles.name}>
                    Evan Czako
                </h1>
                <p className={styles.tagline}>Fullstack developer</p>

                <div className={styles.bio}>
                    <p>
                        Hi, I'm Evan Czako — a fullstack developer with a passion for building
                        dynamic, engaging, and educational applications.
                    </p>
                    <p>
                        I earned my engineering degree from Cornell University in 2018 and began my
                        career as an optical process engineer at ASML, where I developed deep
                        technical expertise using tools like MATLAB. Eager to shift toward software
                        development, I completed the rigorous App Academy coding bootcamp curriculum
                        and began working full-time as a fintech software engineer at Bloomberg from
                        2022 - 2025. Along the way, I've built up a strong skill set across the full
                        stack, including React, SolidJS, Express, MongoDB, SQL, Ruby on Rails,
                        Redux, Zustand, Python, and more.
                    </p>
                    <p>
                        But what truly excites me is building tools that intersect with my creative
                        passions. My portfolio includes projects like DoughLoops, a fully
                        customizable drum machine and step sequencer with user authentication and
                        beat-saving features, and ChordFinder, a MIDI-compatible chord identifier
                        for musicians and learners alike. I've also spent years developing games in
                        Unity and Godot, further blending code with creativity.
                    </p>
                    <p>
                        All of my applications are built to be responsive, mobile-friendly, and
                        user-centered. I'm always looking to collaborate, learn, and create—so if
                        anything resonates with you, feel free to reach out!
                    </p>
                </div>
            </div>
        </section>
    );
}
