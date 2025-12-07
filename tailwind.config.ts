import type {Config} from 'tailwindcss';

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                surface: 'var(--color-surface)',
                accent: 'var(--color-accent)',
            },
            fontFamily: {
                'default': ['Roboto', 'system-ui', 'sans-serif'],
                'heading': ['Raleway', 'sans-serif'],
                'nav': ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
} satisfies Config