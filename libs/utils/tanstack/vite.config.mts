import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
    root: __dirname,
    cacheDir: '../../../node_modules/.vite/libs/utils/tanstack',
    plugins: [nxViteTsPaths(), dts({ entryRoot: 'src', tsconfigPath: path.join(__dirname, 'tsconfig.lib.json') })],
    build: {
        outDir: '../../../dist/libs/utils/tanstack',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        lib: {
            entry: 'src/index.ts',
            name: 'tanstack',
            fileName: 'index',
            formats: ['es'],
        },
        rollupOptions: {
            external: [],
        },
    },
});
