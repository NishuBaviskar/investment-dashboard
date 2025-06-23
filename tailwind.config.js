/** @type {import('tailwindcss').Config} */
module.exports = {

    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#4f46e5',
                    dark: '#312e81',
                },
                secondary: {
                    light: '#10b981',
                    dark: '#065f46',
                },
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
                'spin-slow': 'spin 5s linear infinite',
            }
        },
    },

    plugins: [],
}