import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// No backend, no env vars: the dashboard runs entirely on mock data
// (src/data/mockData.ts) so `npm run dev` works with zero setup.
export default defineConfig({
  plugins: [react()],
});
