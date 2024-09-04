import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure that `leaflet` is correctly resolved
      'leaflet': path.resolve(__dirname, 'node_modules/leaflet'),
      // If using a different directory structure, adjust accordingly
    },
  },
});
