import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { isProduction } from './src_server/infra.server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const plugins = [
    tsconfigPaths(),
    isProduction()
        ? viteStaticCopy({
              targets: [
                  {
                      src: './src_server/template/maintenance-solo.html',
                      dest: 'assets',
                  },
                  {
                      src: './src_server/handlers/handlerRobotsSiteMap/star_robots.data.txt',
                      dest: 'assets',
                  },
                  {
                      src: './src_server/handlers/handlerRobotsSiteMap/star_sitemap.data.xml',
                      dest: 'assets',
                  },
              ],
          })
        : undefined,
].filter(Boolean);

export default defineConfig({
    build: {
        outDir: './build/server',
        ssr: true,
        emptyOutDir: true,
        rollupOptions: {
            external: [/node_modules/],
            input: {
                server: path.resolve(__dirname, './src_server/server.ts'),
            },
            output: {
                format: 'commonjs',
                preserveModules: false, // false a single file server.js as a result, or true - multiple files
            },
        },
    },
    plugins,
});
