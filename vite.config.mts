import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import path from 'path';

export default defineConfig({
    plugins: [
        svgr(),
        checker({
            typescript: true,
            eslint: {
                lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
            },
        }),
        react(),
    ],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    define: {
        __IS_DEV__: true,
    },
    server: {
        open: true,
        port: 7068,
    },
});
