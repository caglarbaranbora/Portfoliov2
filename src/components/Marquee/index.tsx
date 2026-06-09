import styles from "./style.module.scss";
import type { IconType } from "react-icons";
import {
  SiVuedotjs,
  SiSwift,
  SiExpo,
  SiCapacitor,
  SiReactquery,
  SiSupabase,
  SiFirebase,
  SiPrisma,
  SiRedux,
  SiZod,
  SiReacthookform,
} from "react-icons/si";

type Skill =
  | { skill: string; image: string }
  | { skill: string; Icon: IconType };

const skills: Skill[] = [
  { skill: "HTML", image: "/assets/skills/html.svg" },
  { skill: "CSS", image: "/assets/skills/css.svg" },
  { skill: "SASS", image: "/assets/skills/sass.svg" },
  { skill: "TAILWINDCSS", image: "/assets/skills/tailwind.svg" },
  { skill: "JAVASCRIPT", image: "/assets/skills/javascript.svg" },
  { skill: "TYPESCRIPT", image: "/assets/skills/typescript.svg" },
  { skill: "REACT", image: "/assets/skills/react.svg" },
  { skill: "REACT NATIVE", image: "/assets/skills/react-native.svg" },
  { skill: "NEXT.JS", image: "/assets/skills/next.svg" },
  { skill: "VUE", Icon: SiVuedotjs },
  { skill: "SWIFT", Icon: SiSwift },
  { skill: "EXPO", Icon: SiExpo },
  { skill: "CAPACITOR", Icon: SiCapacitor },
  { skill: "TANSTACK", Icon: SiReactquery },
  { skill: "REDUX", Icon: SiRedux },
  { skill: "SUPABASE", Icon: SiSupabase },
  { skill: "FIREBASE", Icon: SiFirebase },
  { skill: "PRISMA", Icon: SiPrisma },
  { skill: "ZOD", Icon: SiZod },
  { skill: "REACT HOOK FORM", Icon: SiReacthookform },
  { skill: "GIT", image: "/assets/skills/git.svg" },
  { skill: "FIGMA", image: "/assets/skills/figma.svg" },
  { skill: "FRAMER MOTION", image: "/assets/skills/framer.svg" },
];

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
        {"image" in skill ? (
          <img
            src={skill.image}
            alt={skill.skill}
            className="w-full h-full object-contain"
          />
        ) : (
          <skill.Icon className="w-full h-full text-gray-400" />
        )}
      </div>
      <span className="text-xl md:text-2xl font-medium text-gray-400 uppercase tracking-wider">
        {skill.skill}
      </span>
    </div>
  );
}

export default function Marquee() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.marquee}>
        <div className={styles.marquee_content}>
          {skills.map((skill, index) => (
            <SkillItem key={index} skill={skill} />
          ))}
        </div>
        <div className={styles.marquee_content} aria-hidden="true">
          {skills.map((skill, index) => (
            <SkillItem key={`duplicate-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
