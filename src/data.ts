export const navigation = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Tecnologías', href: '#tecnologias' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Contacto', href: '#contacto' },
];

export const skillGroups = [
  {
    title: 'Lenguajes y web',
    skills: [
      { name: 'JavaScript', icon: 'javascript.svg', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', detail: 'Interactividad y lógica web' },
      { name: 'Python', icon: 'python.svg', url: 'https://www.python.org/', detail: 'Fundamentos y programación' },
      { name: 'HTML5', icon: 'html5.svg', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', detail: 'Estructura semántica' },
      { name: 'CSS3', icon: 'css3.svg', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', detail: 'Estilos y diseño adaptable' },
    ],
  },
  {
    title: 'Bases de datos',
    skills: [
      { name: 'SQL', icon: 'sql.svg', url: 'https://learn.microsoft.com/en-us/sql/', detail: 'Consultas y gestión de datos' },
      { name: 'MySQL', icon: 'mysql.svg', url: 'https://www.mysql.com/', detail: 'Bases de datos relacionales' },
    ],
  },
  {
    title: 'Herramientas',
    skills: [
      { name: 'Git', icon: 'git.svg', url: 'https://git-scm.com/', detail: 'Control de versiones' },
      { name: 'GitHub', icon: 'github.svg', url: 'https://github.com/', detail: 'Colaboración y repositorios' },
      { name: 'VS Code', icon: 'vscode.svg', url: 'https://code.visualstudio.com/', detail: 'Entorno de desarrollo' },
    ],
  },
  {
    title: 'Formas de trabajo',
    skills: [
      { name: 'Scrum', icon: 'scrum.svg', url: 'https://scrumguides.org/', detail: 'Organización ágil de equipos' },
      { name: 'Lógica', icon: 'logic.svg', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Algorithm', detail: 'Algoritmos y resolución de problemas' },
    ],
  },
];

export type PortfolioProject = {
  title: string;
  description: string;
  period: string;
  category: string;
  image: string;
  imageAlt: string;
  technologies: string[];
  repository?: string;
  demo?: string;
};

export const projects: PortfolioProject[] = [
  {
    title: 'Desarrollo Web y Lógica de Programación — Riwi',
    description: 'Desarrollo de proyectos individuales y colaborativos enfocados en programación, lógica algorítmica, estructuras de datos y creación de interfaces web.',
    period: '2025 — Actualidad',
    category: 'Formación · Riwi',
    image: 'assets/images/projects/web-project.svg',
    imageAlt: 'Ilustración abstracta de una interfaz web en construcción; no es una captura de un proyecto publicado',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'Git', 'GitHub'],
  },
];

export const strengths = [
  'Pensamiento analítico',
  'Resolución de problemas',
  'Comunicación asertiva',
  'Aprendizaje continuo',
  'Trabajo en equipo',
  'Adaptabilidad',
];

export const experience = [
  {
    role: 'Agente BPO · Call Center',
    company: 'Altycom S.A.',
    place: 'Barranquilla, Colombia',
    period: 'Julio 2024 — Agosto 2024',
    points: [
      'Promoción y comercialización de servicios de telefonía móvil.',
      'Asesoramiento a clientes y presentación de soluciones según sus necesidades.',
    ],
  },
  {
    role: 'Asesor comercial',
    company: 'El Gran Punto',
    place: 'Barranquilla, Colombia',
    period: 'Abril 2022 — Julio 2024',
    points: [
      'Atención presencial, identificación de necesidades y cierre de ventas.',
      'Control de inventario, organización de exhibiciones y fidelización de clientes.',
    ],
  },
  {
    role: 'Vendedor',
    company: 'Remate.com',
    place: 'Barranquilla, Colombia',
    period: 'Febrero 2016 — Julio 2016',
    points: ['Atención al público, manejo de caja y asesoría comercial directa.'],
  },
];

export const education = [
  {
    credential: 'Developer Junior',
    institution: 'Riwi',
    period: 'Marzo 2025 — Actualidad',
    place: 'Barranquilla, Colombia',
    current: true,
  },
  {
    credential: 'Técnico en Ventas de Productos y Servicios',
    institution: 'SENA',
    period: 'Finalizado en noviembre de 2016',
    place: '',
    current: false,
  },
  {
    credential: 'Bachiller Académico',
    institution: 'Institución Educativa Isaac Newton',
    period: 'Finalizado en noviembre de 2016',
    place: '',
    current: false,
  },
];

export const personalSkills = [
  ['Comunicación asertiva', 'Escucho, comprendo y comparto ideas con claridad.'],
  ['Trabajo en equipo', 'Colaboro con otras personas para alcanzar objetivos comunes.'],
  ['Curiosidad tecnológica', 'Me motiva explorar herramientas y aprender cómo funcionan.'],
  ['Autonomía', 'Asumo responsabilidades y avanzo con iniciativa propia.'],
  ['Adaptabilidad', 'Me ajusto a nuevos retos, contextos y formas de trabajo.'],
  ['Autogestión', 'Organizo mis prioridades y mantengo el foco en mis objetivos.'],
];

export const contact = {
  email: 'jcantill55@gmail.com',
  phone: '+573003771370',
  github: 'https://github.com/joinercantillo',
  linkedin: 'https://linkedin.com/in/joiner-cantillo-512325426',
};
