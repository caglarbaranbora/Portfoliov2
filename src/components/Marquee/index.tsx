import styles from "./style.module.scss";
const skills = [
  {
    skill: "HTML",
    image: "/assets/skills/html.svg",
  },
  {
    skill: "CSS",
    image: "/assets/skills/css.svg",
  },
  {
    skill: "SASS",
    image: "/assets/skills/sass.svg",
  },
  {
    skill: "TAILWINDCSS",
    image: "/assets/skills/tailwind.svg",
  },
  {
    skill: "JAVASCRIPT",
    image: "/assets/skills/javascript.svg",
  },
  {
    skill: "TYPESCRIPT",
    image: "/assets/skills/typescript.svg",
  },
  {
    skill: "REACT",
    image: "/assets/skills/react.svg",
  },
  {
    skill: "REACT NATIVE",
    image: "/assets/skills/react-native.svg",
  },
  {
    skill: "NEXT.JS",
    image: "/assets/skills/next.svg",
  },
  {
    skill: "GIT",
    image: "/assets/skills/git.svg",
  },
  {
    skill: "FIGMA",
    image: "/assets/skills/figma.svg",
  },
  {
    skill: "FRAMER MOTION",
    image: "/assets/skills/framer.svg",
  },
];

export default function Marquee() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.marquee}>
        <div className={styles.marquee_content}>
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-8 h-8 flex-shrink-0">
                <img
                  src={skill.image}
                  alt={skill.skill}
                  className="w-full h-full object-contain"
                  onError={() => {
                    console.log(`Error loading image: ${skill.image}`);
                  }}
                />
              </div>
              <span className="text-xl md:text-2xl font-medium text-gray-400 uppercase tracking-wider">
                {skill.skill}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.marquee_content} aria-hidden="true">
          {skills.map((skill, index) => (
            <div
              key={`duplicate-${index}`}
              className="flex items-center gap-2"
              aria-hidden="true"
            >
              <div className="w-8 h-8 flex-shrink-0">
                <img
                  src={skill.image}
                  alt={skill.skill}
                  className="w-full h-full object-contain"
                  onError={() => {
                    console.log(`Error loading image: ${skill.image}`);
                  }}
                />
              </div>
              <span className="text-xl md:text-2xl font-medium text-gray-400 uppercase tracking-wider">
                {skill.skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
