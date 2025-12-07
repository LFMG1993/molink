export interface ProjectLink {
    type: 'live' | 'github' | 'download' | 'video';
    url: string;
    label: string;
}

export interface TechStackItem {
    name: string;
    icon: string;
    category: 'Frontend' | 'Backend' | 'Base de Datos' | 'DevOps' | 'Diseño' | 'Framework Multiplataforma' | 'Servidores';
}

export interface Project {
    id: number;
    slug: string; // Para URLs amigables (ej: /portfolio/sendero-de-hierro)
    title: string;
    date: string;
    projectType: string; // Ej: "Aplicación Web", "E-commerce", "Sitio Corporativo"
    imageUrl: string; // Imagen para la tarjeta principal
    videoUrl?: string; // URL del video para la página de detalles

    // Para la tarjeta del portafolio
    shortDescription: string;

    // Para la página de detalles
    objective: string; // El propósito del proyecto
    fullDescription: string[]; // Un array de párrafos para una descripción detallada
    techStack: TechStackItem[];
    links: ProjectLink[];
}