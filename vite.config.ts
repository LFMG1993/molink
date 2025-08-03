import {defineConfig} from 'vite'
import path from 'path'

export default defineConfig({
    plugins: [],
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                details: path.resolve(__dirname, 'src/pages/details.html'),
                privacity: path.resolve(__dirname, 'src/pages/privacity.html'),
                termService: path.resolve(__dirname, 'src/pages/termService.html'),
                portfolio: path.resolve(__dirname, 'src/pages/portfolio.html'),
            },
        },
    },
})