import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SEO} from '../../components/shared/SEO.tsx';
import {Mail, MapPin, MessageCircle, Send, Clock, Loader2, CheckCircle} from 'lucide-react';
import {contactService} from '../../services/shared/contactService.ts';
import type {ContactFormData} from '../../types';
import {useNotification} from '../../context/shared/NotificationContext.tsx';

const ContactPage = () => {
    const {t} = useTranslation();
    const {addNotification} = useNotification();

    const [formData, setFormData] = useState<ContactFormData>({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        if (errors[name as keyof ContactFormData]) {
            setErrors(prev => ({...prev, [name]: undefined}));
        }
    };

    const validate = (): boolean => {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        if (!formData.nombre.trim()) {
            fieldErrors.nombre = 'El nombre es obligatorio';
        }
        if (!formData.email.trim()) {
            fieldErrors.email = 'El email es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            fieldErrors.email = 'Email inválido';
        }
        if (!formData.asunto.trim()) {
            fieldErrors.asunto = 'El asunto es obligatorio';
        }
        if (!formData.mensaje.trim()) {
            fieldErrors.mensaje = 'El mensaje es obligatorio';
        }
        setErrors(fieldErrors);
        return Object.keys(fieldErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await contactService.submit(formData);
            addNotification('¡Mensaje enviado con éxito! Te responderemos pronto.', 'success');
            setFormData({nombre: '', email: '', asunto: '', mensaje: ''});
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 3000);
        } catch (error: any) {
            const message = error.response?.data?.error || error.message || 'Error al enviar el mensaje.';
            addNotification(message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SEO
                title={`${t('landing.nav.contact')} | Molink`}
                description={t('landing.contact_page.subtitle')}
                canonicalUrl="/contact"
            />

            <section className="relative pt-32 pb-20 bg-surface">
                <div className="container mx-auto text-center px-4">
                    <h1 className="font-heading text-4xl md:text-4xl font-bold uppercase text-white title-underline">
                        {t('landing.contact_page.title')}
                    </h1>
                    <p className="mt-6 text-white/70 text-lg max-w-2xl mx-auto">
                        {t('landing.contact_page.subtitle')}
                    </p>
                </div>
            </section>

            <section className="py-20 bg-black">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

                        {/* Columna 1: Info */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-white mb-8">{t('landing.contact_page.info_title')}</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-accent/10 text-accent">
                                        <MessageCircle size={24}/>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">WhatsApp</h4>
                                        <a href="https://wa.me/573155756600"
                                           className="text-white/60 hover:text-accent transition-colors">+57 315 575
                                            6600</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-accent/10 text-accent">
                                        <Mail size={24}/>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Email</h4>
                                        <a href="mailto:contacto@molink.com.co"
                                           className="text-white/60 hover:text-accent transition-colors">contacto@molink.com.co</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-accent/10 text-accent">
                                        <MapPin size={24}/>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Ubicación</h4>
                                        <p className="text-white/60">Cúcuta, Norte de Santander, Colombia</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-accent/10 text-accent">
                                        <Clock size={24}/>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Horario</h4>
                                        <p className="text-white/60">Lun - Vie: 8:00 AM - 6:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Google Maps Embed */}
                            <div
                                className="rounded-xl overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 border border-white/10 h-64">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126438.33806403233!2d-72.5078!3d7.8939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6645994f15a133%3A0x3348123018897587!2zQ8O6Y3V0YSwgTm9ydGUgZGUgU2FudGFuZGVy!5e0!3m2!1ses!2sco!4v1710000000000"
                                    width="100%" height="100%" style={{border: 0}} allowFullScreen loading="lazy"
                                ></iframe>
                            </div>
                        </div>

                        {/* Columna 2: Formulario */}
                        <div className="bg-surface border border-white/10 p-8 rounded-2xl">
                            <h2 className="text-2xl font-bold text-white mb-6">{t('landing.contact_page.form_title')}</h2>

                            {isSubmitted ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <CheckCircle size={48} className="text-green-500 mb-4"/>
                                    <h3 className="text-xl font-bold text-white mb-2">¡Mensaje enviado!</h3>
                                    <p className="text-white/60">Te responderemos lo antes posible.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-white/60 mb-1">{t('landing.contact_page.name')}</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:border-accent outline-none transition-all ${errors.nombre ? 'border-red-500' : 'border-white/10'}`}
                                        />
                                        {errors.nombre && (
                                            <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-white/60 mb-1">{t('landing.contact_page.email')}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:border-accent outline-none transition-all ${errors.email ? 'border-red-500' : 'border-white/10'}`}
                                        />
                                        {errors.email && (
                                            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-white/60 mb-1">{t('landing.contact_page.subject')}</label>
                                        <input
                                            type="text"
                                            name="asunto"
                                            value={formData.asunto}
                                            onChange={handleChange}
                                            className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:border-accent outline-none transition-all ${errors.asunto ? 'border-red-500' : 'border-white/10'}`}
                                        />
                                        {errors.asunto && (
                                            <p className="text-red-400 text-xs mt-1">{errors.asunto}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-white/60 mb-1">{t('landing.contact_page.message')}</label>
                                        <textarea
                                            rows={4}
                                            name="mensaje"
                                            value={formData.mensaje}
                                            onChange={handleChange}
                                            className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:border-accent outline-none transition-all resize-none ${errors.mensaje ? 'border-red-500' : 'border-white/10'}`}
                                        />
                                        {errors.mensaje && (
                                            <p className="text-red-400 text-xs mt-1">{errors.mensaje}</p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white font-bold uppercase tracking-wider py-4 rounded-lg transition-all duration-300 shadow-lg shadow-[#f30519]/50 hover:bg-red-800 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin"/>
                                                {t('landing.contact_page.sending')}
                                            </>
                                        ) : (
                                            <>
                                                {t('landing.contact_page.send')}
                                                <Send size={18}/>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactPage;
