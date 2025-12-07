import type {Project} from "../types";
import {ImagesClients, VideoClients, ImagesLanguages} from "../utils/images";

export const portfolioData: Project[] = [
    {
        id: 1,
        slug: 'gallinas-en-casa',
        title: 'Gallinas en casa',
        date: '2023',
        projectType: 'Aplicación Movil Multiplataforma',
        imageUrl: ImagesClients.gallinasCasa,
        videoUrl: '',
        shortDescription: 'Una herramienta pensada para los avicultores caseros, que no cuentan con la tecnologia a la mano.',
        objective: 'Crear una plataforma visualmente impactante para mostrar portafolios de fotografía, con un enfoque en la velocidad de carga y la experiencia de usuario en cualquier dispositivo.',
        fullDescription: [
            'El proyecto "Sendero de Hierro" nació de la necesidad de los fotógrafos de tener un espacio digital que no solo almacenara sus imágenes, sino que las presentara de una manera que contara una historia. La interfaz minimalista está diseñada para que nada distraiga de la obra visual.',
            'Se implementó un sistema de carga progresiva de imágenes (lazy loading) y se optimizaron todos los activos para garantizar tiempos de carga inferiores a 2 segundos, un factor crucial para la retención de usuarios en sitios de contenido visual.'
        ],
        techStack: [
            { name: 'Flutter', icon: ImagesLanguages.flutter, category: 'Framework Multiplataforma' },
            { name: 'Firebase', icon: ImagesLanguages.firebase, category: 'DevOps' },
        ],
        links: [
            { type: 'download', url: 'https://drive.google.com/drive/u/1/folders/1LGo5ZVnZOV1qxDQeWG-r8JL8DKJPb4zC', label: 'Descarga Apk' },
        ],
    },
    {
        id: 2,
        slug: 'proyecto-productivas',
        title: 'Proyecto Productivas',
        date: '2024',
        projectType: 'Aplicación Web',
        imageUrl: '',
        videoUrl: VideoClients.productivasVideo,
        shortDescription: 'Aplicativo Web para la gestion y acompañamiento de aprendices SENA en etapas productivas.',
        objective: 'Desarrollar un aplicativo en donde se pudieran gestionar multiples perfiles como directivos, instructores y aprendices, unificando la información y mejorando los procesos en etapas productivas.',
        fullDescription: [
            'Este proyecto se desarrolló bajo un modelo MVC (Modelo Vista Controlador). A partir de una versión inicial, se estructuró la base de datos para gestionar múltiples aspectos de la plataforma, incluyendo: usuarios, aprendices, fichas de aprendizaje, seguimiento de etapas lectivas y productivas, trazabilidad de procesos, y asignación de roles.',
            'La arquitectura se basó en tres perfiles principales:',
            'Directivos, con control total para visualizar, crear, editar y eliminar información en toda la plataforma',
            'Instructores, con permisos para gestionar a sus aprendices y supervisar bitácoras.',
            'Aprendices, con la capacidad de cargar sus bitácoras, realizar correcciones, mantener sus datos actualizados y acceder a todos los formatos necesarios para su etapa productiva.'
        ],
        techStack: [
            { name: 'Bootstrap', icon: ImagesLanguages.bootstrap, category: 'Frontend' },
            { name: 'PHP', icon: ImagesLanguages.php, category: 'Backend' },
            { name: 'MySQL', icon: ImagesLanguages.mysql, category: 'Base de Datos' },
            { name: 'JavaScript', icon: ImagesLanguages.javascript, category: 'Frontend' },
            { name: 'Ubuntu', icon: ImagesLanguages.ubuntu, category: 'Servidores' },
        ],
        links: [
            { type: 'live', url: 'https://tecnoparquenodocucuta.com/web/cedrum_productivas/', label: 'Visitar Proyecto' },
        ],
    },
    // ... Puedes añadir más proyectos aquí
];