import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import { useStore } from '../store';
import styles from '../styles/AboutSection.module.css';
import EvanImg from '../Evan.jpg';
import EvanImg2 from '../Evan2.jpg';

const GithubIcon = FaGithub as React.FC<React.SVGProps<SVGSVGElement>>;
const LinkedinIcon = FaLinkedin as React.FC<React.SVGProps<SVGSVGElement>>;
const FileIcon = FaFileAlt as React.FC<React.SVGProps<SVGSVGElement>>;

export default function AboutSection() {
    const fontSize = useStore(s => s.fontSize);
	const vw = useStore(s => s.vw);

    return (
		<div className={styles.aboutSectionWrapper}>
			
			<div className={styles.aboutSection} style={{ fontSize }}>
				<h1 className={styles.name}>Evan Czako</h1>
				{vw <= 6 && <img src={EvanImg2} alt="" className={styles.aboutImage} style={{height: `${6.32*fontSize*2.2}px`, width: `${9.504*fontSize*2.2}px`}}/>}
				<p>
					Hi, I’m Evan Czako — a fullstack developer with a passion for building dynamic, engaging, and educational applications.
				</p>
				<p>
					I earned my engineering degree from Cornell University and began my career as an optical process engineer at ASML, where I developed deep technical expertise using tools like MATLAB. Eager to shift toward software development, I completed the rigorous App Academy coding bootcamp curriculum and now work full-time as a fintech software engineer. Along the way, I’ve built up a strong skill set across the full stack, including React, SolidJS, Express, MongoDB, SQL, Ruby on Rails, Redux, Zustand, Python, and more.
				</p>
				<p>
					But what truly excites me is building tools that intersect with my creative passions. My portfolio includes projects like DoughLoops, a fully customizable drum machine and step sequencer with user authentication and beat-saving features, and ChordFinder, a MIDI-compatible chord identifier for musicians and learners alike. I’ve also spent years developing games in Unity and Godot, further blending code with creativity.
				</p>
				<p>
					All of my applications are built to be responsive, mobile-friendly, and user-centered. I’m always looking to collaborate, learn, and create—so if anything resonates with you, feel free to reach out!
				</p>
			</div>
			{vw > 6 && <img src={EvanImg} alt="" className={styles.aboutImage} style={{height: `${13.58*fontSize*1.3}px`, width: `${10*fontSize*1.3}px`}}/>}
			
			
		</div>

    );
}
