// Contenido del sitio centralizado. Redacción en español con capitalización normal de oraciones.
import type { ImageMetadata } from 'astro';

import abel from '../assets/team/abel-acuna.jpg';
import alexandro from '../assets/team/alexandro-bazan.jpg';
import carlos from '../assets/team/carlos-correa.jpg';
import felix from '../assets/team/felix-lamadrid.jpg';
import jaime from '../assets/team/jaime-saenz.jpg';
import joseMiguel from '../assets/team/jose-miguel-amaya.jpg';
import juan from '../assets/team/juan-alberto-quintana.jpg';
import oliver from '../assets/team/oliver-sandoval.jpg';
import william from '../assets/team/william-wong.jpg';
import yosbi from '../assets/team/yosbi-golles.jpg';

export const site = {
  name: 'Piura AI',
  title: 'Piura AI | Comunidad de inteligencia artificial en Piura, Perú',
  description:
    'Piura AI es la comunidad tecnológica regional que impulsa el desarrollo responsable, la innovación práctica y la ética en inteligencia artificial en Piura, Perú.',
  locale: 'es_PE',
  foundingYear: 2025,
  // Grupo de WhatsApp de la comunidad.
  joinUrl: 'https://chat.whatsapp.com/DGupofUTcSI5Ef8CChMfme?mode=gi_t',
  // TODO: reemplazar por los enlaces reales cuando estén disponibles.
  email: 'contacto@piura-ai.org',
  codeOfConductUrl: null as string | null,
  socials: [
    { label: 'LinkedIn', href: null as string | null },
    { label: 'Instagram', href: null as string | null },
    { label: 'X', href: null as string | null },
    { label: 'YouTube', href: null as string | null },
  ],
};

export const nav = [
  { label: 'Manifiesto', href: '#manifiesto' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Comunidad', href: '#comunidad' },
  { label: 'Aliados', href: '#aliados' },
];

export const stats = [
  { value: '2', label: 'Eventos anuales' },
  { value: '+500', label: 'Personas capacitadas en IA' },
  { value: '2025', label: 'Año de fundación' },
  { value: 'Piura, Perú', label: 'Sede de la comunidad', small: true },
];

export type PrincipleIcon = 'shield' | 'education' | 'region' | 'network';

export const principles: { icon: PrincipleIcon; title: string; text: string }[] = [
  {
    icon: 'shield',
    title: 'Uso responsable',
    text: 'Principios éticos para el desarrollo de soluciones algorítmicas locales.',
  },
  {
    icon: 'education',
    title: 'Talento y educación',
    text: 'Talleres, masterclasses y espacios de formación continua.',
  },
  {
    icon: 'region',
    title: 'Impacto regional',
    text: 'Aplicación práctica de la IA en sectores clave de la región: agro, pymes y servicios.',
  },
  {
    icon: 'network',
    title: 'Colaboración abierta',
    text: 'Co-organización y sinergia con comunidades aliadas.',
  },
];

export const events = [
  {
    tag: 'En el marco de Piura Conecta',
    title: 'Panel “AI for devs”',
    text: 'Panel especializado en herramientas de desarrollo, agentes y flujos de trabajo con inteligencia artificial.',
    href: 'https://luma.com/655deag3',
  },
  {
    tag: 'Con Google Developer Group Piura',
    title: 'Full day de comunidades',
    text: 'Encuentro intercolectivo con talleres prácticos y networking tech, coorganizado con GDG Piura.',
    href: 'https://gdg.community.dev/events/details/google-gdg-piura-presents-full-day-de-comunidades/',
  },
];

export const timeline = [
  {
    year: '2025',
    title: 'Fundación de Piura AI',
    text: 'Nace como comunidad tecnológica regional dedicada a la IA en Piura.',
  },
  {
    year: '2025',
    title: 'Primer Barcamp Piura AI',
    text: 'Encuentro abierto y colaborativo sobre IA y tecnología.',
    link: { label: 'Ver el histórico', href: 'https://piura-ai-barcamp.vercel.app' },
  },
  {
    year: '2025–26',
    title: '+500 personas capacitadas',
    text: 'A través de talleres, masterclasses y sesiones abiertas de la comunidad.',
  },
  {
    year: '2026',
    title: 'Agenda anual de 2 eventos',
    text: 'Arranca con el panel “AI for devs” y el full day de comunidades.',
  },
];

export type Founder = {
  name: string;
  role: string;
  bio: string;
  photo: ImageMetadata;
  linkedin: string;
};

export const founders: Founder[] = [
  {
    name: 'William Wong Garay',
    role: 'AI Engineering Lead',
    bio: 'Arquitectura de agentes de IA, RAG y orquestación multi-agente en producción.',
    photo: william,
    linkedin: 'https://www.linkedin.com/in/willywg/',
  },
  {
    name: 'Juan Alberto Quintana Effio',
    role: 'AI, Data & SEO Consultant',
    bio: 'Analítica de datos, automatización de procesos y chatbots comerciales de IA.',
    photo: juan,
    linkedin: 'https://www.linkedin.com/in/juanalbertoq/',
  },
  {
    name: 'Jose Miguel Amaya Camacho',
    role: 'Backend Developer & Python Specialist',
    bio: 'Desarrollo backend con Python, LLMs y agentes con LangChain y LangGraph.',
    photo: joseMiguel,
    linkedin: 'https://www.linkedin.com/in/miguelamaya99/',
  },
  {
    name: 'Oliver Sandoval',
    role: 'Tech Lead & Software Engineer',
    bio: 'Liderazgo técnico de arquitecturas de software; fundador de Developer.pe.',
    photo: oliver,
    linkedin: 'https://www.linkedin.com/in/oliver-sandoval-developer/',
  },
  {
    name: 'Yosbi J. Golles',
    role: 'Applied Mathematician & Data Scientist',
    bio: 'Optimización matemática, modelado metaheurístico y ciencia de datos.',
    photo: yosbi,
    linkedin: 'https://www.linkedin.com/in/yosbijgolles/',
  },
  {
    name: 'Abel Acuña',
    role: 'Founder, Agiliza360AI',
    bio: 'Agentes de IA para automatizar flujos operativos vía WhatsApp.',
    photo: abel,
    linkedin: 'https://www.linkedin.com/in/abelacunacoronado/',
  },
  {
    name: 'Jaime Sáenz',
    role: 'Tech Professional & Innovator',
    bio: 'Adopción estratégica de TI y desarrollo comunitario regional.',
    photo: jaime,
    linkedin: 'https://www.linkedin.com/in/jaimesaenzdedios/',
  },
  {
    name: 'Carlos Correa',
    role: 'Tech Entrepreneur & Community Builder',
    bio: 'Seguridad digital, software libre e integración macro-regional.',
    photo: carlos,
    linkedin: 'https://www.linkedin.com/in/calu777/',
  },
  {
    name: 'Felix Lamadrid Morales',
    role: 'Full Stack Software Developer',
    bio: 'Desarrollo web full stack con JavaScript, Python e integraciones con OpenAI.',
    photo: felix,
    linkedin: 'https://www.linkedin.com/in/felix-lm/',
  },
  {
    name: 'Alexandro Bazán Ladines',
    role: 'Product Engineer & Frontend Tech Lead',
    bio: 'Ex-CTO enfocado en construir productos digitales impulsados por IA.',
    photo: alexandro,
    linkedin: 'https://www.linkedin.com/in/alexandrobazla/',
  },
];

export const allies = [
  'GDG Piura',
  'Piura Conecta',
  'Cámara de Comercio de Piura',
  'INNOSPACE / CAMCO',
  'Universidad de Piura',
  'Hub UDEP',
];
