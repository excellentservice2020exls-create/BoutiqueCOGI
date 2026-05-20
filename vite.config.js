import { defineConfig } from 'vite';

export default defineConfig({
  // Base publique de l'application
  base: '/',
  
  server: {
    port: 3000,
    open: true, // Ouvre le navigateur automatiquement
    strictPort: true, // Échoue si le port 3000 est pris, pas de fallback aléatoire
  },
  
  build: {
    target: 'esnext',
    outDir: 'dist',
    minify: 'esbuild', // Utilise le minifier intégré de Vite sans dépendance optionnelle
  }
});