import type {Project} from "../../types";
import {ImagesClients, VideoClients, ImagesLanguages} from "../../utils/images.ts";

export const portfolioData: Project[] = [
    {
        id: 1,
        slug: 'gallinas-en-casa',
        date: '2023',
        imageUrl: ImagesClients.gallinasCasa,
        videoUrl: '',
        featured: true,
        techStack: [
            { name: 'Flutter', icon: ImagesLanguages.flutter, category: 'Framework Multiplataforma' },
            { name: 'Firebase', icon: ImagesLanguages.firebase, category: 'DevOps' },
        ],
        links: [
            { type: 'download', url: 'https://drive.google.com/drive/u/1/folders/1LGo5ZVnZOV1qxDQeWG-r8JL8DKJPb4zC', label: 'download_apk' },
        ],
    },
    {
        id: 2,
        slug: 'proyecto-productivas',
        date: '2024',
        imageUrl: ImagesClients.sena2023,
        videoUrl: VideoClients.productivasVideo,
        techStack: [
            { name: 'Bootstrap', icon: ImagesLanguages.bootstrap, category: 'Frontend' },
            { name: 'PHP', icon: ImagesLanguages.php, category: 'Backend' },
            { name: 'MySQL', icon: ImagesLanguages.mysql, category: 'Base de Datos' },
            { name: 'JavaScript', icon: ImagesLanguages.javascript, category: 'Frontend' },
            { name: 'Ubuntu', icon: ImagesLanguages.ubuntu, category: 'Servidores' },
        ],
        links: [
            { type: 'live', url: 'https://tecnoparquenodocucuta.com/web/cedrum_productivas/', label: 'visit_project' },
        ],
    },
    {
        id: 3,
        slug: 'encontrable',
        date: '2025',
        imageUrl: ImagesClients.encontrable,
        videoUrl: VideoClients.encontrableVideo,
        techStack: [
            { name: 'HTML', icon: ImagesLanguages.html, category: 'Frontend' },
            { name: 'PHP', icon: ImagesLanguages.php, category: 'Backend' },
            { name: 'MySQL', icon: ImagesLanguages.mysql, category: 'Base de Datos' },
            { name: 'JavaScript', icon: ImagesLanguages.javascript, category: 'Frontend' },
            { name: 'React', icon: ImagesLanguages.react, category: 'Frontend' },
            { name: 'Ubuntu', icon: ImagesLanguages.ubuntu, category: 'Servidores' },
        ],
        links: [
            { type: 'live', url: 'https://encontrable.com/', label: 'visit_project' },
        ],
    },
    {
        id: 4,
        slug: 'power-teams',
        date: '2025',
        imageUrl: ImagesClients.powerTeam,
        videoUrl: '',
        techStack: [
            { name: 'ExpressJS', icon: ImagesLanguages.express, category: 'Backend' },
            { name: 'MongoDB', icon: ImagesLanguages.mongodb, category: 'Base de Datos' },
            { name: 'TypeScript', icon: ImagesLanguages.typescript, category: 'Frontend' },
            { name: 'React', icon: ImagesLanguages.react, category: 'Frontend' },
            { name: 'Ubuntu', icon: ImagesLanguages.ubuntu, category: 'Servidores' },
        ],
        links: [],
    },
    {
        id: 5,
        slug: 'advise-services',
        date: '2025',
        imageUrl: ImagesClients.advise,
        videoUrl: '',
        techStack: [
            { name: 'ExpressJS', icon: ImagesLanguages.express, category: 'Backend' },
            { name: 'MySQL', icon: ImagesLanguages.mysql, category: 'Base de Datos' },
            { name: 'TypeScript', icon: ImagesLanguages.typescript, category: 'Frontend' },
            { name: 'React', icon: ImagesLanguages.react, category: 'Frontend' },
            { name: 'Ubuntu', icon: ImagesLanguages.ubuntu, category: 'Servidores' },
        ],
        links: [
            { type: 'live', url: 'https://advisecredito.com/', label: 'visit_project' },
        ],
    },
    {
        id: 6,
        slug: 'distribuciones-liderplast',
        date: '2025',
        imageUrl: ImagesClients.liderplast,
        videoUrl: VideoClients.liderplastVideo,
        featured: true,
        techStack: [
            { name: 'Typescript', icon: ImagesLanguages.typescript, category: 'Backend' },
            { name: 'MySQL', icon: ImagesLanguages.mysql, category: 'Base de Datos' },
            { name: 'React', icon: ImagesLanguages.react, category: 'Frontend' },
            { name: 'CloudFlare', icon: ImagesLanguages.cloudflare, category: 'DevOps' },
        ],
        links: [
            { type: 'live', url: 'https://distribucioneslider.com.co/', label: 'visit_project' },
        ],
    },
    {
        id: 7,
        slug: 'congelados',
        date: '2025',
        imageUrl: ImagesClients.congelados,
        videoUrl: VideoClients.congeladosVideo,
        featured: true,
        techStack: [
            { name: 'Firestore DataBase', icon: ImagesLanguages.firebase, category: 'Base de Datos' },
            { name: 'TypeScript', icon: ImagesLanguages.typescript, category: 'Frontend' },
            { name: 'React', icon: ImagesLanguages.react, category: 'Frontend' },
            { name: 'CloudFlare', icon: ImagesLanguages.cloudflare, category: 'DevOps' },
        ],
        links: [
            { type: 'live', url: 'https://congelados.com.co/', label: 'visit_project' },
        ],
    },
    {
        id: 8,
        slug: 'siempre-modo-leon',
        date: '2026',
        imageUrl: ImagesClients.masterYoel,
        videoUrl: '',
        techStack: [
            { name: 'TailwindCSS', icon: ImagesLanguages.tailwindcss, category: 'Frontend' },
            { name: 'CSS', icon: ImagesLanguages.css, category: 'Frontend' },
        ],
        links: [
            { type: 'live', url: 'https://siempremodoleon.com/', label: 'visit_project' },
        ],
    },
    {
        id: 9,
        slug: 'toche-on',
        date: '2026',
        imageUrl: ImagesClients.tocheOn,
        videoUrl: '',
        featured: true,
        techStack: [
            { name: 'TailwindCSS', icon: ImagesLanguages.tailwindcss, category: 'Frontend' },
            { name: 'React', icon: ImagesLanguages.react, category: 'Frontend' },
            { name: 'Typescript', icon: ImagesLanguages.typescript, category: 'Frontend' },
            { name: 'Firebase', icon: ImagesLanguages.firebase, category: 'Backend' },
            { name: 'Cloudinary', icon: ImagesLanguages.cloudinary, category: 'DevOps' },
            { name: 'Cloudflare', icon: ImagesLanguages.cloudflare, category: 'DevOps' },
        ],
        links: [
            { type: 'live', url: 'https://tocheon.pages.dev/', label: 'visit_project' },
        ],
    }
];
