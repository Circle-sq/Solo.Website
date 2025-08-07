//import * as path from 'path';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
//import dts from 'vite-plugin-dts';

export default defineConfig({
    root: __dirname,
    cacheDir: '../../../node_modules/.vite/libs/asian-view/ui-atoms',

    plugins: [
        react(),
        nxViteTsPaths(),
        //        dts({ entryRoot: 'src', tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'), skipDiagnostics: true }),
    ],

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },

    // Configuration for building your library.
    // See: https://vitejs.dev/guide/build.html#library-mode
    build: {
        outDir: '../../../dist/libs/asian-view/ui-atoms',
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        lib: {
            // Could also be a dictionary or array of multiple entry points.
            entry: 'src/index.ts',
            name: 'ui-asian-view',
            fileName: 'index',
            // Change this to the formats you want to support.
            // Don't forget to update your package.json as well.
            ///formats: ['es', 'cjs'],
            formats: ['es'],
        },
        rollupOptions: {
            // External packages that should not be bundled into your library.
            external: ['react', 'react-dom', 'react/jsx-runtime'],
        },
    },

    test: {
        globals: true,
        cache: {
            dir: '../../../node_modules/.vitest',
        },
        setupFiles: ['./vitest.setup.ts'],
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

        reporters: ['default'],
        coverage: {
            reportsDirectory: '../../../coverage/libs/asian-view/ui-atoms',
            provider: 'v8',
        },
    },
});
