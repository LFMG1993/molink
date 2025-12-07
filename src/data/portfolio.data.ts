import type {Project} from "../types";
import {ImagesClients, VideoClients, ImagesLanguages} from "../utils/images.ts";

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
        objective: 'Crear una aplicación de facil acceso a traves de dispositivos moviles para mayor alcance y beneficio de la comunidad objetivo.',
        fullDescription: [
            'El proyecto Gallinas en casa nacio de un reto que debemos cumplir todos los aprendices del SENA donde debemos presentar un proyecto que beneficie a la comunidad en un entorno real.',
            'Inicie con el analisis de requerimientos basado en la problematica del momento del sector avicultor, donde el SENA buscaba apoyar a familias y pequeños campesinos a optimizar procesos de crianza, cuido y recolección de huevos, siendo este el sustento de muchas familias de mi region Norte de Santander',
            'Al ingresar al proyecto el sistema pedira registro o inicio de sesion, el cual se puede hacer en un formulario gestionado por Autenticator de Firebase o Google como segunda opción',
            'El aplicativo muestra un panel de navegación sencillo, permitiendo gestionar el perfil persona, un libro guia, una herramienta que recomeinda la cantidad de gallinas que deben haber por metro cuadrado y un espacio para foros de apoyo entre la comunidad que use la aplicación.'
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
    {
        id: 3,
        slug: 'encontrable',
        title: 'Encontrable',
        date: '2025',
        projectType: 'Aplicación Web',
        imageUrl: '',
        videoUrl: VideoClients.encontrableVideo,
        shortDescription: 'Aplicativo Web para guiar en la busqueda de sitios a nivel global, clasificando por paises, regiones o ubicaciones mas precisas.',
        objective: 'Contribuimos en el desarrollo de una plataforma que nacio como una herramienta para lograr programar viajes a sitios turisticos, dandole una guia al usuario mas precisa de lugares de interes.',
        fullDescription: [
            'Mis primeros aportes a este proyecto fueron la traducción de textos en diferentes puntos de la aplicación, rapidamente pasamos a empezar a aportar estructura al proyecto como gestionar lugares por paises, categorias de interes, hasta alimentar sitios en puntos conocidos',
            'Rapidamente el sistema fue evolucionando y los usuarios que estaban registrados y querian gestionar sus negocios necesitaban un espacio administrativo, en php nos ocupamos de aportar en crear la api Rest Full que seria consumida por React',
            'La idea principal era que los comercios lograran integrar sus negocios una herramienta que aparte de posicionarlos mejor en la web pudieran por ejemplo restaurantes y cafeterias tener un menu digital mas completo, y muchas otras herramientas que se adaptaban a los diferentes tipos de comercios'
        ],
        techStack: [
            { name: 'HTML', icon: ImagesLanguages.html, category: 'Frontend' },
            { name: 'PHP', icon: ImagesLanguages.php, category: 'Backend' },
            { name: 'MySQL', icon: ImagesLanguages.mysql, category: 'Base de Datos' },
            { name: 'JavaScript', icon: ImagesLanguages.javascript, category: 'Frontend' },
            {name: 'React', icon: ImagesLanguages.react, category: 'Frontend'},
            { name: 'Ubuntu', icon: ImagesLanguages.ubuntu, category: 'Servidores' },
        ],
        links: [
            { type: 'live', url: 'https://encontrable.com/', label: 'Visitar Proyecto' },
        ],
    },
    {
        id: 4,
        slug: 'power-teams',
        title: 'Power Teams',
        date: '2025',
        projectType: 'Aplicación Web y Móvil',
        imageUrl: ImagesClients.powerTeam,
        videoUrl: '',
        shortDescription: 'Aplicativo Web para gestion administrativa y aplicación movil para el uso del usuario final',
        objective: 'Contribuimos en el desarrollo de una plataforma de administración para el negocio y una aplicación movil para el usuario final.',
        fullDescription: [
            'En este proyecto nos encargamos de construir en base a una estructura inicial toda la parte del backend que es gestionado por expressJS usando como base de datos MongoDB debido a que se usarian una gran cantidad de datos agrupados en arreglos, fue la alternativa mas optima para el proyecto',
            'El frontend de la parte administrativa fue construido en React basado principalmente en la libreria Mui Material, ya que ofrece componentes muy dinamicos y estilos modernos para la plataforma.',
            'En el aplicativo movil se construyo el acceso a la plataforma recopilando datos con Autenticator de Firebase y almacenando los datos personales en Mongo para usarlos en diferentes puntos del aplicativo.'
        ],
        techStack: [
            { name: 'ExpressJS', icon: ImagesLanguages.express, category: 'Backend' },
            { name: 'MongoDB', icon: ImagesLanguages.mongodb, category: 'Base de Datos' },
            { name: 'TypeScript', icon: ImagesLanguages.typescript, category: 'Frontend' },
            {name: 'React', icon: ImagesLanguages.react, category: 'Frontend'},
            { name: 'Ubuntu', icon: ImagesLanguages.ubuntu, category: 'Servidores' },
        ],
        links: [
        ],
    },
    {
        id: 5,
        slug: 'advise-services',
        title: 'Advise Services',
        date: '2025',
        projectType: 'Aplicación Web',
        imageUrl: ImagesClients.advise,
        videoUrl: '',
        shortDescription: 'Aplicativo Web para gestion administrativa',
        objective: 'Contribuimos en el desarrollo de una plataforma de administración para llevar el control interno de la empresa',
        fullDescription: [
            'El proyecto fue requerido para mejorar el sistema actual de procesos que manejaba la empresa, se requeria una solucion mas moderna y se empezo a dar forma al proyecto',
            'Para el backend se gestiono con ExpressJS y Mysql como base de datos',
            'El frontend fue construido en React con Typescript el cual se adaptaba perfectamente a las necesidades del comercio.'
        ],
        techStack: [
            { name: 'ExpressJS', icon: ImagesLanguages.express, category: 'Backend' },
            { name: 'MySQL', icon: ImagesLanguages.mysql, category: 'Base de Datos' },
            { name: 'TypeScript', icon: ImagesLanguages.typescript, category: 'Frontend' },
            {name: 'React', icon: ImagesLanguages.react, category: 'Frontend'},
            { name: 'Ubuntu', icon: ImagesLanguages.ubuntu, category: 'Servidores' },
        ],
        links: [
            { type: 'live', url: 'https://advisecredito.com/', label: 'Visitar Proyecto' },
        ],
    },
    {
        id: 6,
        slug: 'distribuciones-liderplast',
        title: 'Distribuciones Liderplast',
        date: '2025',
        projectType: 'E-commerce',
        imageUrl: ImagesClients.liderplast,
        videoUrl: VideoClients.liderplastVideo,
        shortDescription: 'E-commerce completo, autogestionado por el usuario, cuenta con seccion para clientes y administradores',
        objective: 'Este fue nuestro primer proyecto enfocado en un E-commerce de comercialización de plasticos biodegradables, con el que se busca llegar a mas personas a nivel colombia.',
        fullDescription: [
            'En este proyecto partimos desde el Analisis de requerimientos, donde se analizo de primera mano como funcionaba el comercio de manera fisica, de tal manera que pudieramos abordar las necesidades reales del comercio para lograr llevar la tienda a presencia en la web',
            'Para el FrontEnd se estructuro el proyecto en React - Typescrip y Vite para potencializar toda la versatilidad y solidez que ofrecen estos entornos de trabajo',
            'El BackEnd fue hecho netamente en Typescript Puro enfocado a un entorno Serveless como lo es los workers de cloudflare, lo que permitira al E-commerce gestionar grandes volumenes de usuarios sin contar con servidores propios',
            'La base de datos se implemento SQL D1 de cloudflare, la cual es una base de MySQLite preparada para gestionar multiples compras en fila sin que el usuario perciba alguna espera considerable',
            'Cuenta con un storage exclusivo para imagenes, lo que nos permite mantener el proyecto limpio y con una mejor gestion de archivos',
            'En la parte administrativa se pueden gestionar: Usuarios, categorias, atributos, productos con variantes, proveedores, inventario, medios de pago, pedidos, gestion de envios y perfil administrador'
        ],
        techStack: [
            { name: 'Typescript', icon: ImagesLanguages.typescript, category: 'Backend' },
            { name: 'MySQL', icon: ImagesLanguages.mysql, category: 'Base de Datos' },
            { name: 'TypeScript', icon: ImagesLanguages.typescript, category: 'Frontend' },
            {name: 'React', icon: ImagesLanguages.react, category: 'Frontend'},
            { name: 'CloudFlare', icon: ImagesLanguages.ubuntu, category: 'DevOps' },
        ],
        links: [
            { type: 'live', url: 'https://distribucioneslider.com.co/', label: 'Visitar Proyecto' },
        ],
    },
    {
        id: 7,
        slug: 'congelados',
        title: 'Congelados',
        date: '2025',
        projectType: 'Aplicativo Web y Movil Web',
        imageUrl: ImagesClients.congelados,
        videoUrl: VideoClients.congeladosVideo,
        shortDescription: 'Aplicativo Web y Movil Web para la gestion de heladerias o fruterias',
        objective: 'El proposito de este proyecto es darle un control y solucion a comercios que se dedican a vender postres, helados o derivados.',
        fullDescription: [
           'Este proyecto es enfocado netamente en DevOps para el FrontEnd usamos un una base de React - TypeScript y Vite siendo nuestro stack preferido y donde manejamos mejos los procesos.',
            'Para el BackEnd es 100% gestionado por Firebase, usamos herramientas como Autenticator, Firestore Database para la gestion y control de los datos',
            'El aplicativo fue hecho de la mano de una heladeria que buscaba un mayor control en sus procesos',
            'Se puede contar con un dashboard muy completo dando una visualización de lo que mas interesa al negocio, mejor dia del mes, productos estrella, dia de mayor rendimiento, ingresos vs gastos',
            'Se puede gestionar las ventas en cajas individuales, tener multiples heladerias ancladas a un mismo administrador, manejo de empleados, permisos granulares para diferentes secciones de la plataforma, creación de recetas a partir de ingredientes, costos estimados de cada receta, gestion de gastos y de compras, configuracion de medios de pagos, reportes de ventas, gastos, sesiones y ganancias'
        ],
        techStack: [
            { name: 'Firestore DataBase', icon: ImagesLanguages.firebase, category: 'Base de Datos' },
            { name: 'TypeScript', icon: ImagesLanguages.typescript, category: 'Frontend' },
            {name: 'React', icon: ImagesLanguages.react, category: 'Frontend'},
            { name: 'CloudFlare', icon: ImagesLanguages.ubuntu, category: 'DevOps' },
        ],
        links: [
            { type: 'live', url: 'https://congelados.com.co/', label: 'Visitar Proyecto' },
        ],
    },
    {
        id: 8,
        slug: 'el-master-yoel',
        title: 'El Master Yoel',
        date: '2025',
        projectType: 'Tema Para WordPress',
        imageUrl: ImagesClients.masterYoel,
        videoUrl: '',
        shortDescription: 'Tema desarrollado bajo las necesidades del cliente',
        objective: 'El objetivo de este proyecto era ofrecer una pagina personalizada que no logran los plugins populares de WordPress.',
        fullDescription: [
           'Se diseño la pagina basado en las estructura que demanda wordpress para su correcto funcionamiento',
            'Se añadio una funcion al panel wordpress que se encarga de generar URL dinamicas en base a un codigo de referido',
            'TailwindCSS es la base del diseño con algunas clases CSS'
        ],
        techStack: [
            { name: 'TailwindCSS', icon: ImagesLanguages.tailwindcss, category: 'Frontend' },
            {name: 'CSS', icon: ImagesLanguages.css, category: 'Frontend'},
        ],
        links: [
            { type: 'live', url: 'https://elmasteryoel.com/', label: 'Visitar Proyecto' },
        ],
    }
];