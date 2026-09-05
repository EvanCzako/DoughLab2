import styles from '../styles/Skills.module.css';

const SKILLS = [
    'React',
    'SolidJS',
    'Redux',
    'Zustand',
    'TypeScript',
    'Python',
    'Java',
    'Ruby on Rails',
    'Express',
    'MongoDB',
    'SQL',
    'MATLAB',
] as const;

export default function Skills() {
    return (
        <section className={styles.skillsSection} aria-labelledby="skills-heading">
            <h2 id="skills-heading" className={styles.heading}>
                Skills
            </h2>
            <ul className={styles.list}>
                {SKILLS.map((skill) => (
                    <li key={skill} className={styles.pill}>
                        {skill}
                    </li>
                ))}
            </ul>
        </section>
    );
}
