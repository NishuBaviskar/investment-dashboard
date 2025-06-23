import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    root: '.', // Explicitly set root to current directory
    server: {
        port: 5101
    }
})