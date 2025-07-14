// src/components/Skills.tsx
import React from 'react';
import styles from '../styles/Skills.module.css';

export default function Skills() {
    return (
        <section className={styles.skillsSection}>
            <h2>Skills</h2>
            <ul className={styles.skillsList}>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>React</li>
                <li>Node.js</li>
                <li>SQL</li>
                <li>Zustand</li>
                {/* Add more as needed */}
            </ul>
        </section>
    );
}
