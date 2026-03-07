import styles from "./Skills.module.css";
import { FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaGithubAlt } from "react-icons/fa";

type IconComponent = React.ElementType;

type SkillRow = {
  title: string;
  keywords: string[];
  color?: string;
  icon?: IconComponent;
};

const skillData: SkillRow[] = [
  {
    title: "React",
    keywords: ["Hooks", "Context", "Suspense", "Testing", "SSR"],
    icon: FaReact,
    color: "#61DBFB",
  },
  {
    title: "Full‑stack development",
    keywords: ["Next.js", "Node.js", "Express", "GraphQL", "Docker"],
    icon: RiNextjsFill,
  },
  {
    title: "JavaScript",
    keywords: ["ES2022", "TypeScript", "Async/Await", "Modules"],
    icon: IoLogoJavascript,
    color: "#f0db4f",
  },
  {
    title: "HTML / CSS / Design",
    keywords: ["Tailwind", "SCSS", "BEM", "Accessibility", "Animations"],
    icon: FaCss3Alt,
    color: "#DD3A0A",
  },
  {
    title: "Tooling",
    keywords: [
      "Webpack",
      "AWS Cloud/Deployment",
      "GitHub",
      "CI/CD",
      "Storybook",
    ],
    icon: FaGithubAlt,
  },
];

export default function Skills() {
  return (
    <section className={styles.skills} id="skills">
      <h2 className={styles.heading}>Skills</h2>
      <div className={styles.table}>
        {skillData.map(({ title, keywords, color, icon: Icon }) => {
          return (
            <div key={title} className={styles.row}>
              <div className={styles.title}>
                {" "}
                {Icon && (
                  <Icon
                    className={styles.icon}
                    color={color}
                    aria-hidden="true"
                  />
                )}{" "}
                {title}
              </div>
              <ul className={styles.keywords}>
                {keywords.map((kw) => (
                  <li key={kw}>{kw}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
