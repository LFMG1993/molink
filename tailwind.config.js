/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './pages/**/*.{html,js,ts}',
        './src/components/**/*.html',
        './src/**/*.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
            },
            fontFamily: {
                'default': ['Roboto', 'system-ui', 'sans-serif'],
                'heading': ['Raleway', 'sans-serif'],
                'nav': ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
}