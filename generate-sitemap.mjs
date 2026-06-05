import fs from 'fs';

// Leemos el archivo de datos como texto plano para evitar la importación de imágenes.
const portfolioDataFile = fs.readFileSync('./src/data/landing/portfolio.data.ts', 'utf-8');

// Usamos una expresión regular para encontrar todos los slugs.
const slugMatches = portfolioDataFile.matchAll(/slug: '([^']+)'/g);
const dynamicRoutes = Array.from(slugMatches).map(match => ({
    url: `/portfolio/${match[1]}`,
    changefreq: 'yearly',
    priority: 0.8,
}));

const hostname = 'https://molink.com.co';

// Rutas estáticas con su configuración
const staticRoutes = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/pricing', changefreq: 'monthly', priority: 0.9 },
    { url: '/portfolio', changefreq: 'monthly', priority: 0.9 },
    { url: '/details', changefreq: 'monthly', priority: 0.8 },
    { url: '/privacity', changefreq: 'yearly', priority: 0.3 },
    { url: '/termService', changefreq: 'yearly', priority: 0.3 },
    { url: '/cookie-policy', changefreq: 'yearly', priority: 0.3 },
];

const allRoutes = [...staticRoutes, ...dynamicRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
        ({ url, changefreq, priority }) => `
    <url>
      <loc>${hostname}${url}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
  `,
    )
    .join('')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemap);