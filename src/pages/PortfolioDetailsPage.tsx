import { useParams, Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolio.data.ts';
import { SEO } from '../components/general/SEO.tsx';
import { Globe, Github, Download, Youtube } from 'react-bootstrap-icons';
import type { ProjectLink } from '../types';

const PortfolioDetailsPage = () => {
    const { slug } = useParams();
    const project = portfolioData.find(p => p.slug === slug);

    if (!project) {
        return (
            <div className="text-center py-20">
                <h1 className="text-4xl font-bold">Proyecto no encontrado</h1>
                <Link to="/portfolio" className="text-accent mt-4 inline-block">Volver al Portafolio</Link>
            </div>
        );
    }

    // Función auxiliar para obtener el icono correcto según el tipo de enlace
    const getLinkIcon = (type: ProjectLink['type']) => {
        switch (type) {
            case 'live':
                return <Globe size={20} />;
            case 'github':
                return <Github size={20} />;
            case 'download':
                return <Download size={20} />;
            case 'video':
                return <Youtube size={20} />;
            default:
                return null;
        }
    };

    return (
        <>
            <SEO title={`${project.title} | Molink`} description={project.objective} />
            <main className="bg-black text-white py-20">
                <div className="container mx-auto px-4">
                    {/* Renderizado condicional: Muestra el video si existe, si no, muestra la imagen. */}
                    {project.videoUrl ? (
                        <video src={project.videoUrl} controls className="w-full lg:w-3/4 xl:w-2/3 mx-auto rounded-lg mb-12 shadow-lg"></video>
                    ) : (
                        project.imageUrl && (
                            <img src={project.imageUrl} alt={project.title} className="w-full md:w-5/6 lg:w-1/2 mx-auto rounded-lg mb-12 shadow-lg object-contain" />
                        )
                    )}

                    <h1 className="font-heading text-5xl mb-4">{project.title}</h1>
                    <p className="text-xl text-white/70 mb-8">{project.projectType} - {project.date}</p>

                    <h2 className="font-heading text-3xl mb-4">Propósito del Proyecto</h2>
                    <p className="text-lg text-white/80 mb-12">{project.objective}</p>

                    <h2 className="font-heading text-3xl mb-4">Descripción Detallada</h2>
                    <div className="space-y-4 text-lg text-white/80 mb-12">
                        {project.fullDescription.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <h2 className="font-heading text-3xl mb-4">Tecnologías Utilizadas</h2>
                    <div className="flex flex-wrap gap-4 mb-12">
                        {project.techStack.map((tech, index) => (
                            <div key={index}
                                 className="bg-surface p-4 rounded-lg text-sm flex flex-col items-center gap-2 w-28">
                                <img src={tech.icon} alt={tech.name} className="h-12 w-12 object-contain"/>
                                <span>{tech.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* Sección para renderizar los enlaces del proyecto */}
                    <h2 className="font-heading text-3xl mb-4">Enlaces del Proyecto</h2>
                    <div className="flex flex-wrap gap-4">
                        {project.links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-accent text-white font-bold uppercase tracking-wider py-3 px-6 rounded-md transition-all duration-300 hover:bg-red-800 hover:scale-105"
                            >
                                {getLinkIcon(link.type)}
                                <span>{link.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default PortfolioDetailsPage;