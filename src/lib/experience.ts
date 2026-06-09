// Professional experience — single source for the About timeline and the
// work-page "experience projects" listing. Newest first.

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  current: boolean;
  // Short description used on the work page (name + job description).
  summary: string;
  // Longer description used on the About timeline.
  detail: string;
  stack: string[];
}

export const experience: Experience[] = [
  {
    id: "guchly",
    role: "Co-Founder",
    company: "Guchly Studio",
    period: "Jul 2025 — Present",
    current: true,
    summary:
      "Leading product strategy, AI integration and end-to-end mobile & web development for the Balance app and two further products.",
    detail:
      "Co-founded Guchly Studio, leading the development and release of the Balance app while managing two additional ongoing products. Responsible for product strategy, AI integration, and end-to-end mobile and web development using Swift, React Native (Expo), Zustand, TanStack, Supabase and Firebase.",
    stack: ["Swift", "React Native", "Expo", "Zustand", "TanStack", "Supabase", "Firebase"],
  },
  {
    id: "adminsoft",
    role: "Mobile & Web Developer",
    company: "Adminsoft",
    period: "Dec 2025 — May 2026",
    current: false,
    summary:
      "Cross-platform delivery: a banking app (iOS/Android via Capacitor), ProposalCRM with RevenueCat paywalls, and a WMS built from scratch with Vue.js web interfaces.",
    detail:
      "Full-time developer delivering cross-platform projects including a banking mobile app (iOS/Android via Capacitor), ProposalCRM with RevenueCat integrations (paywalls & subscriptions), and the Zuhre ecosystem where I built a WMS from scratch and developed Vue.js web interfaces — focusing on scalable architecture and efficient data management.",
    stack: ["Vue", "Capacitor", "RevenueCat", "TypeScript"],
  },
  {
    id: "acun-medya",
    role: "Front-End Developer Intern",
    company: "Acun Medya",
    period: "Feb 2025 — Jul 2025",
    current: false,
    summary:
      "Full-stack web apps with Next.js, Prisma ORM & PostgreSQL — CRUD, JWT auth, form validation (Zod), Zustand state, SEO and Docker.",
    detail:
      "Developed full-stack web applications using Next.js, TypeScript, and Tailwind CSS. Implemented CRUD operations with Prisma ORM and PostgreSQL, JWT-based authentication, and form validation using React Hook Form and Zod. Used Zustand for state management, improved SEO, and containerized the project with Docker.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Zod", "Zustand", "Docker"],
  },
  {
    id: "inspiration-tech",
    role: "Front-End Developer (Part-Time)",
    company: "Inspiration Tech",
    period: "May 2024 — Aug 2024",
    current: false,
    summary:
      "Responsive web apps with Next.js, TypeScript & Tailwind; integrated REST APIs and collaborated with backend teams on performance.",
    detail:
      "Developed responsive web applications using Next.js, TypeScript, and Tailwind CSS. Integrated RESTful APIs for real-time data display. Collaborated with backend teams to improve performance, code quality, and user experience following modern UI/UX principles.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    id: "softalya",
    role: "Front-End Developer Intern",
    company: "Softalya Software",
    period: "Jul 2023 — Dec 2023",
    current: false,
    summary:
      "Responsive web & mobile interfaces with React.js and React Native; API integration with Axios and state with Redux Toolkit.",
    detail:
      "Developed responsive web and mobile interfaces using React.js and React Native. Integrated APIs with Axios and managed application state using Redux and Redux Toolkit. Built reusable UI components and contributed to real-time chat and media-based applications.",
    stack: ["React", "React Native", "Redux", "Axios"],
  },
];

// Subset shown on the work page as "experience projects" (name + description).
export const workExperienceIds = ["adminsoft", "acun-medya", "softalya"];
