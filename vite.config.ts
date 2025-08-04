import {defineConfig} from 'vite'

export default defineConfig({
    plugins: [],
    build: {
        rollupOptions: {
            input: {
                main: new URL('./index.html', import.meta.url).pathname,
                details: new URL('./src/pages/details.html', import.meta.url).pathname,
                privacity: new URL('./src/pages/privacity.html', import.meta.url).pathname,
                termService: new URL('./src/pages/termService.html', import.meta.url).pathname,
                portfolio: new URL('./src/pages/portfolio.html', import.meta.url).pathname,
            },
        },
    },
})