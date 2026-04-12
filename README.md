<div align="center">
   <img src="./src/assets/logo-white.webp" alt="Molink Logo" width="250"/>
   <h1><strong>Molink - Soluciones Tecnológicas Integrales</strong></h1>
   <p><em>Transformando ideas en productos digitales de alto impacto.</em></p>
 </div>

Este repositorio contiene la plataforma principal de **Molink**, una Single Page Application (SPA) de alto rendimiento desarrollada con **React** y **TypeScript**. Más que un portafolio, es un ecosistema digital diseñado para gestionar servicios de desarrollo web, móvil y consultoría tecnológica.

La plataforma está optimizada para la conversión, con un enfoque en la experiencia de usuario (UX), el SEO internacional y la escalabilidad modular.

 ---

## ✨ Características Principales

*   **🌍 Multi-idioma (i18n):** Soporte completo para Español e Inglés, permitiendo una expansión global.
*   **📊 Calculadora de Presupuestos:** Herramienta interactiva para que los clientes estimen el costo de sus proyectos en tiempo real.
*   **💳 Modelos de Negocio Flexibles:** Gestión de suscripciones mensuales (con beneficios de hosting/soporte) y paquetes de pago único.
*   **🚀 Portafolio Curado:** Sistema de proyectos destacados y filtrado cronológico con detalles técnicos profundos.
*   **🔍 SEO & Rich Snippets:** Implementación de datos estructurados (JSON-LD) para FAQs y servicios, optimizando la visibilidad en Google.
*   **📱 UI/UX Premium:** Diseño "Dark Mode" moderno, 100% responsivo, utilizando **Lucide Icons** para una iconografía limpia y consistente.
*   **✉️ Centro de Contacto:** Página dedicada con integración de Google Maps y múltiples canales de comunicación (WhatsApp, Email).

## 🗺️ Roadmap de Desarrollo

Molink está en constante evolución. Estos son los próximos módulos en desarrollo:

1.  **🛒 Tienda Molink (Store):** Plataforma e-commerce independiente (`tienda.molink.com.co`) para la venta de licencias de software, hardware y gadgets tecnológicos.
2.  **🔐 Panel de Administración:** Dashboard privado para que los clientes gestionen sus suscripciones, tickets de soporte y vean el progreso de sus desarrollos.
3.  **🤝 Red de Aliados:** Espacio dedicado para partners y colaboradores estratégicos, fortaleciendo el ecosistema de soluciones tecnológicas.

## 🛠️ Tecnologías Utilizadas

*   **Framework Frontend:** React
*   **Tipado:** TypeScript
*   **Bundler:** Vite
*   **Estilos:** Tailwind CSS (Arquitectura Utility-First)
*   **Internacionalización:** i18next
*   **Enrutamiento:** React Router 6
*   **Iconografía:** Lucide React
*   **SEO:** React Helmet Async & JSON-LD Structured Data
*   **Gestión de Clases:** clsx

## 📂 Estructura del Proyecto

```
/src
├── assets/         # Archivos estáticos (imágenes, fuentes, videos).
├── components/     # Componentes reutilizables de React.
│   ├── general/    # Componentes globales (Header, Footer, etc.).
│   └── portfolio/  # Componentes específicos del portafolio.
├── data/           # Archivos de datos que simulan una BBDD.
├── pages/          # Componentes que representan las páginas de la aplicación.
├── types/          # Definiciones de tipos de TypeScript.
├── utils/          # Funciones de utilidad y centralización de assets.
├── App.tsx         # Componente raíz y configuración de rutas.
├── main.tsx        # Punto de entrada de la aplicación.
└── index.css       # Estilos globales y personalizados.
 ```

## 🚀 Cómo Empezar
Sigue estos pasos para ejecutar el proyecto en tu entorno local.

1.  **Clona el repositorio:**
     ```bash
     git clone https://github.com/tu-usuario/tu-repositorio.git

2. **Instala Dependencias:**
    ```bash    
    pnpm install
    ``` 
3. **Ejecuta el servidor de desarrollo:**
    ```bash    
    pnpm dev
    ```
La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## 📜 Scripts Disponibles

*   `npm run dev`: Inicia el servidor de desarrollo con Hot-Module Replacement (HMR).
*   `npm run build`: Compila la aplicación para producción en el directorio `dist/`.
*   `npm run lint`: Ejecuta ESLint para analizar el código en busca de errores.
*   `npm run preview`: Sirve localmente la versión de producción generada por `build`.
