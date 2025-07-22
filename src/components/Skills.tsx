// src/components/Skills.tsx
import React from 'react';
import styles from '../styles/Skills.module.css';

export default function Skills() {
    return (
        <section className={styles.skillsSection}>
            <h2>Skills</h2>
            <ul className={styles.skillsList}>
                <li>React</li>
                <li>SolidJS</li>
                <li>Redux</li>
                <li>Zustand</li>
                <li>Ruby on Rails</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>SQL</li>
                <li>Python</li>
                <li>Java</li>
				<li>TypeScript</li>
                <li>MATLAB</li>
                {/* Add more as needed */}
            </ul>
        </section>
    );
}
