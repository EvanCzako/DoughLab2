import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import { useStore } from '../store';
import styles from '../styles/AboutSection.module.css';

const GithubIcon = FaGithub as React.FC<React.SVGProps<SVGSVGElement>>;
const LinkedinIcon = FaLinkedin as React.FC<React.SVGProps<SVGSVGElement>>;
const FileIcon = FaFileAlt as React.FC<React.SVGProps<SVGSVGElement>>;

export default function AboutSection() {
    const fontSize = useStore(s => s.fontSize);

    return (
        <section className={styles.aboutSection} style={{ fontSize }}>
            <h1>Evan Czako</h1>
            <p>
                I'm a full-stack developer passionate about building interactive
                and performant web applications.
            </p>
            <p>
                Yo! So blah blah blahawa w ;o; ao; ajawef io a jwefawe. ahweif
                awef haiwef iu awefa ihu iauwe ui hiu iuaiwuhefiuhaewiuh aiuwe
                ahef awefi ae aoew aew a aewiufh iu uhauehi ahiu euhi a hiua ewf
                awehiu. , aoeif uiawe ihuaewiuh ahiuwe fuhiaewf auhie fhaiue f.
                aowe hoi ew!
            </p>
            <p>
                blahawa w ;o; ao; ajawef io a jwefawe. ahweif awef haiwef iu
                awefa ihu iauwe ui hiu iuaiwuhefiuhaewiuh aiuwe ahef awefi ae
                aoew aew a aewiufh iu uhauehi ahiu euhi a hiua ewf awehiu. ,
            </p>
            <p>
                aoeif uiawe ihuaewiuh ahiuwe fuhiaewf auhie fhaiue f. aowe hoi
                ew!
            </p>
        </section>
    );
}
