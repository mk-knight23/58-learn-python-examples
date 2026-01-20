/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                accent: "#a855f7", // Purple for AlgoViz
                dark: "#030712",
            },
            boxShadow: {
                'glow': '0 0 30px rgba(168, 85, 247, 0.1)',
                'node': '0 0 15px rgba(168, 85, 247, 0.3)',
            },
        },
    },
    plugins: [],
}
