import { useEffect, useRef } from 'react';
import { useStore } from '../store';
import styles from '../styles/AboutSection.module.css';
import EvanImg from '../Evan.jpg';
import EvanImg2 from '../Evan2.jpg';

export default function AboutSection() {
    const preloadRefs = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        const img1 = new Image();
        img1.src = EvanImg;
        const img2 = new Image();
        img2.src = EvanImg2;
        preloadRefs.current = [img1, img2];
    }, []);

    const vw = useStore(s => s.vw);

    return (
        <div className={styles.aboutCard}>
            <div className={styles.aboutRow}>
                <div className={styles.textContent}>
                    {vw <= 9 && (
                        <img
                            src={EvanImg2}
                            alt=""
                            className={styles.aboutImageMobile}
                        />
                    )}
                    <div className={styles.bioText}>
                        <p>
                            Hi, I'm Evan Czako — a fullstack developer with a
                            passion for building dynamic, engaging, and
                            educational applications.
                        </p>
                        <p>
                            I earned my engineering degree from Cornell
                            University in 2018 and began my career as an
                            optical process engineer at ASML, where I developed
                            deep technical expertise using tools like MATLAB.
                            Eager to shift toward software development, I
                            completed the rigorous App Academy coding bootcamp
                            curriculum and began working full-time as a fintech
                            software engineer at Bloomberg from 2022 - 2025.
                            Along the way, I've built up a strong skill set
                            across the full stack, including React, SolidJS,
                            Express, MongoDB, SQL, Ruby on Rails, Redux,
                            Zustand, Python, and more.
                        </p>
                        <p>
                            But what truly excites me is building tools that
                            intersect with my creative passions. My portfolio
                            includes projects like DoughLoops, a fully
                            customizable drum machine and step sequencer with
                            user authentication and beat-saving features, and
                            ChordFinder, a MIDI-compatible chord identifier for
                            musicians and learners alike. I've also spent years
                            developing games in Unity and Godot, further
                            blending code with creativity.
                        </p>
                        <p>
                            All of my applications are built to be responsive,
                            mobile-friendly, and user-centered. I'm always
                            looking to collaborate, learn, and create—so if
                            anything resonates with you, feel free to reach
                            out!
                        </p>
                    </div>
                </div>
                <div className={styles.imageSide}>
                    <img src={EvanImg} alt="" className={styles.aboutImage} />
                </div>
            </div>
        </div>
    );
}
