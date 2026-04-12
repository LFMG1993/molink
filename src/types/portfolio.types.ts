export interface ProjectLink {
    type: 'live' | 'github' | 'download' | 'video';
    url: string;
    label: string;
    labelEn?: string;
}

export interface TechStackItem {
    name: string;
    icon: string;
    category: 'Frontend' | 'Backend' | 'Base de Datos' | 'DevOps' | 'Diseño' | 'Framework Multiplataforma' | 'Servidores';
}

export interface Project {
    id: number;
    slug: string;
    title?: string;
    titleEn?: string;
    date: string;
    projectType?: string;
    projectTypeEn?: string;
    imageUrl: string;
    videoUrl?: string;
    featured?: boolean;
    // Tarjeta del portafolio
    shortDescription?: string;
    shortDescriptionEn?: string;
    // Página de detalles
    objective?: string;
    objectiveEn?: string;
    fullDescription?: string[];
    fullDescriptionEn?: string[];
    techStack: TechStackItem[];
    links: ProjectLink[];
}