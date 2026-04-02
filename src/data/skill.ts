const DEVICON_CDN =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const SIMPLE_ICONS_CDN =
  "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons";

export type Skill = {
  id: string;
  name: string;
  iconSrc: string;
};

function devicon(folder: string, file: string): string {
  return `${DEVICON_CDN}/${folder}/${file}`;
}

export const SKILLS: Skill[] = [
  { id: "docker", name: "Docker", iconSrc: devicon("docker", "docker-original.svg") },
  {
    id: "kubernetes",
    name: "Kubernetes",
    iconSrc: devicon("kubernetes", "kubernetes-plain.svg")
  },
  { id: "vuejs", name: "Vue.js", iconSrc: devicon("vuejs", "vuejs-original.svg") },
  {
    id: "aws",
    name: "AWS",
    iconSrc: `${SIMPLE_ICONS_CDN}/amazonaws.svg`
  },
  {
    id: "nodejs",
    name: "Node.js",
    iconSrc: devicon("nodejs", "nodejs-original.svg")
  },
  { id: "react", name: "React", iconSrc: devicon("react", "react-original.svg") },
  {
    id: "angular",
    name: "Angular",
    iconSrc: devicon("angular", "angular-original.svg")
  },
  {
    id: "python",
    name: "Python",
    iconSrc: devicon("python", "python-original.svg")
  },
  {
    id: "mongodb",
    name: "MongoDB",
    iconSrc: devicon("mongodb", "mongodb-original.svg")
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    iconSrc: devicon("postgresql", "postgresql-original.svg")
  },
  {
    id: "mysql",
    name: "SQL",
    iconSrc: devicon("mysql", "mysql-original.svg")
  },

  { id: "html5", name: "HTML5", iconSrc: devicon("html5", "html5-original.svg") },

  { id: "php", name: "PHP", iconSrc: devicon("php", "php-original.svg") },
  { id: "git", name: "Git", iconSrc: devicon("git", "git-original.svg") },
  { id: "uipath", name: "UiPath", iconSrc: `${SIMPLE_ICONS_CDN}/uipath.svg` },

  { id: "java", name: "Java", iconSrc: devicon("java", "java-original.svg") },
  {
    id: "springboot",
    name: "Spring Boot",
    iconSrc: `${SIMPLE_ICONS_CDN}/springboot.svg`
  },
  {
    id: "github",
    name: "GitHub",
    iconSrc: devicon("github", "github-original.svg")
  },
  {
    id: "typescript",
    name: "TypeScript",
    iconSrc: devicon("typescript", "typescript-original.svg")
  },
  {
    id: "nextjs",
    name: "Next.js",
    iconSrc: devicon("nextjs", "nextjs-original.svg")
  },
  {
    id: "rest",
    name: "REST APIs",
    iconSrc: `${SIMPLE_ICONS_CDN}/postman.svg`
  },
  {
    id: "cybersecurite",
    name: "Cybersécurité",
    iconSrc:
      "https://upload.wikimedia.org/wikipedia/commons/6/64/CNIL_logo_2016.svg"
  },
];