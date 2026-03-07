import FlipCard from '../components/portfolio/FlipCard.tsx';
import {SEO} from '../components/general/SEO.tsx';
import {ImagesClients} from "../utils/images.ts";

// Datos de ejemplo para los proyectos
const portfolioData = [
    {
        imageUrl: ImagesClients.tocheOn,
        slug: 'toche-on',
        date: '2026',
        title: 'Toche On',
        description: 'Desarrollo de un aplicativo web PWA, nacido en Talento Tech para ayudar a los usuarios a traves de la inteligencia artificial puedan encontrar lugares de comida saludable cerca de sus coordenadas',
        flipDirection: 'horizontal' as const,
    },
    {
        imageUrl: ImagesClients.liderplast,
        slug: 'distribuciones-liderplast',
        date: '2025',
        title: 'Distribuciones LiderPlast',
        description: 'Desarrollamos desde cero un E-commerce para una empresa distribuidora de plasticos, donde se puede ingresar a consultar precios, llenar el carrito, buscar productos, clasificacion por categorias y sub categorias y su area administrativa donde se puede gestionar toda la tienda.',
        flipDirection: 'horizontal' as const,
    },
    {
        imageUrl: ImagesClients.congelados,
        slug: 'congelados',
        date: '2025',
        title: 'Congelados',
        description: 'Desarrollo de origen propio donde ofrecemos un aplicativo web para la gestion de heladerias o fruterias, dandole al usuario todo lo que requiere, desde la gestion de empleados, hasta la creacion de recetas en base a los ingredientes, cuenta con una versión siempre libre.',
        flipDirection: 'horizontal' as const,
    },
    {
        imageUrl: ImagesClients.masterYoel,
        slug: 'siempre-modo-leon',
        date: '2026',
        title: 'Siempre Modo Leon',
        description: 'Plantilla Desarrollada para un sistema wordPress, todo el diseño y funcionalidades fueron hechas a medida para cubrir su uso desde wordpress.',
        flipDirection: 'horizontal' as const,
    },
    {
        imageUrl: ImagesClients.encontrable,
        slug: 'encontrable',
        date: '2025',
        title: 'Encontrable',
        description: 'Aportamos al Desarrollo de una plataforma de busqueda de sitios o lugares de interes, donde se recopila información publica y se guia a las personas a lugares basados en su ubicación, tambien es una herramienta para comercios, ofrece multiples soluciones.',
        flipDirection: 'horizontal' as const,
    },
    {
        imageUrl: ImagesClients.powerTeam,
        slug: 'power-teams',
        date: '2025',
        title: 'Power Teams',
        description: 'Aportamos al desarrollo de un aplicativo donde se ofrecen clases virtuales de diferentes tipos de ejercicios, se ofrecen diferentes niveles y planes los cuales se pueden adquirir desde su app mobil.',
        flipDirection: 'horizontal' as const,
    },
    {
        imageUrl: ImagesClients.advise,
        slug: 'advise-services',
        date: '2025',
        title: 'Advise Services',
        description: 'Contribuimos en el desarrollo de un aplicativo web que se encarga de administrar y gestionar toda el area administrativa de la empresa.',
        flipDirection: 'horizontal' as const,
    },
    {
        imageUrl: ImagesClients.sena2023,
        slug: 'proyecto-productivas',
        date: '2024',
        title: 'Proyecto Productivas',
        description: 'Desarrollamos en equipo una aplicación web basada en php y js, donde se buscaba tener un control sobre los aprendices que salieron a etapas productivas y requieren llenar un informe cada 15 dias, esta plataforma une a directivos, instructores y aprendices, llevando una trazabilidad de las bitacoras presentadas, control de datos e informes del progreso sobre la etapa productva.',
        flipDirection: 'horizontal' as const,
    },
    {
        imageUrl: ImagesClients.gallinasCasa,
        slug: 'gallinas-en-casa',
        date: '2023',
        title: 'Gallinas en Casa',
        description: 'Proyecto desarrollado en mi etapa lectiva del SENA, es una aplicación movil desarrollada en Flutter con APK para android. Busca ayudar a pequeños granjeros de la region de norte de santander a llevar un control de  la recoleccion de huevos, consejos utiles y un foro de apoyo para toda la comunidad de la app.',
        flipDirection: 'horizontal' as const,
    }
];

const PortfolioPage = () => {
    return (
        <>
            <SEO
                title="Portafolio de Proyectos | Molink"
                description="Explora los proyectos de desarrollo web y móvil que hemos realizado. Tarjetas interactivas que muestran nuestro trabajo."
                keywords="portafolio, proyectos, desarrollo web, react, molink"
                canonicalUrl="/portfolio"
            />
            <section
                className="bg-black min-h-screen w-full flex flex-wrap justify-center items-center gap-24 p-8 pt-32">
                {portfolioData.map((project, index) => (
                    <FlipCard
                        key={index}
                        imageUrl={project.imageUrl}
                        slug={project.slug}
                        date={project.date}
                        title={project.title}
                        description={project.description}
                        flipDirection={project.flipDirection}
                    />
                ))}
            </section>
        </>
    );
};

export default PortfolioPage;