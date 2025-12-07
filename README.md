<div align="center">
   <img src="./src/assets/logo-white.webp" alt="Molink Logo" width="200"/>
   <h1><strong>Molink - Portafolio de Proyectos</strong></h1>
 </div>

Este repositorio contiene el código fuente de mi portafolio profesional, desarrollado como una Single Page Application (SPA) con **React**. El objetivo de este proyecto es servir como una **plataforma centralizada y dinámica para mostrar los proyectos en los que he trabajado y trabajaré en el futuro**, presentando una imagen profesional y detallada de mis habilidades y experiencia.

La aplicación está diseñada para ser visualmente atractiva, completamente responsiva y fácil de mantener, utilizando una arquitectura de componentes moderna y un sistema de datos centralizado que simula una base de datos real.

 ---

## ✨ Características Principales

*   **Galería de Proyectos Interactiva:** Tarjetas con efecto "flip" animado para presentar cada proyecto de forma atractiva.
*   **Páginas de Detalle Dinámicas:** Rutas generadas dinámicamente (`/portfolio/:slug`) para cada proyecto, mostrando información detallada como propósito, tecnologías, videos de demostración y enlaces relevantes.
*   **Diseño 100% Responsivo:** Interfaz adaptada para una experiencia de usuario óptima en dispositivos móviles, tablets y de escritorio.
*   **Gestión de Datos Centralizada:** La información de los proyectos se gestiona desde un único archivo (`portfolio.data.ts`), simulando una base de datos y facilitando la adición o modificación de proyectos.
*   **Componentes Reutilizables:** Construido con una arquitectura basada en componentes para máxima modularidad y mantenibilidad.
*   **Optimización SEO:** Implementación de metadatos dinámicos para cada página a través de `react-helmet-async`.

## 🛠️ Tecnologías Utilizadas

*   **Framework Frontend:** React
*   **Tipado:** TypeScript
*   **Bundler:** Vite
*   **Estilos:** Tailwind CSS
*   **Enrutamiento:** React Router
*   **Iconos:** React Bootstrap Icons
*   **Gestión de Clases:** clsx

## 📂 Estructura del Proyecto

El proyecto sigue una estructura organizada para separar responsabilidades:

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


