import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import fs from 'fs';
import { getViteServerPort, isDevelopment, getNodeJsServerAddress, isProduction } from './src_server/infra.server';
import vitestConfig from './tests/vitest.config';
import { Endpoints } from './src_server/enums';

type DevDependencies = string[];
type LoggedLibraries = Set<string>;

const entry = './src/index.tsx';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const plugins = [
    react({
        jsxImportSource: '@emotion/react',
        plugins: [
            ["@swc-jotai/debug-label", {}],
            ["@swc-jotai/react-refresh", {}],
            ['@swc/plugin-emotion', {}]
        ],
    }),
    tsconfigPaths(),
].filter(Boolean);

const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'));
const devDependencies: DevDependencies = Object.keys(packageJson.devDependencies || []);
const loggedLibraries: LoggedLibraries = new Set<string>();

const proxyConfig: { [key: string]: any } = {};

Object.values(Endpoints).forEach((endpoint) => {
    if (endpoint !== Endpoints.any && endpoint !== Endpoints.root) {
        proxyConfig[endpoint] = {
            target: getNodeJsServerAddress(),
            changeOrigin: true,
            secure: false,
            configure: (proxy: any) => {
                proxy.on('proxyRes', (_proxyRes: any, _req: any, res: any) => {
                    //redirect to default path in order to return vite render handling
                    res.writeHead(302, { Location: '/' });
                    res.end();
                });
            },
        };
    }
});

export default defineConfig({
    define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.HTTP_PORT': JSON.stringify(process.env.HTTP_PORT),
        'process.env.STANDALONE': JSON.stringify(process.env.STANDALONE),
        'process.env.OPERATOR': JSON.stringify(process.env.OPERATOR),
        'process.env.DISABLE_CACHE_PROXY': JSON.stringify(process.env.DISABLE_CACHE_PROXY),
        'process.env.BETLINK_VERSION': JSON.stringify(process.env.BETLINK_VERSION),
        'process.env.SITE_THEME': JSON.stringify(process.env.SITE_THEME),
        'process.env.FEATURE_TOGGLING_PROXY_URI': JSON.stringify(process.env.FEATURE_TOGGLING_PROXY_URI),
        'process.env.FEATURE_TOGGLING_PROXY_TOKEN': JSON.stringify(process.env.FEATURE_TOGGLING_PROXY_TOKEN),
        global: 'window',
    },
    plugins,
    server: {
        port: getViteServerPort(),
        proxy: {
            ...proxyConfig,
            '/api': {
                target: getNodeJsServerAddress(),
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        sourcemap: isDevelopment(),
        minify: isProduction(),
        manifest: true,
        outDir: 'build/client',
        emptyOutDir: true,
        assetsDir: 'static',
        copyPublicDir: false,
        assetsInlineLimit: 0,
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, entry),
            },
            output: {
                entryFileNames: 'static/[name].[hash].js',
                preserveModulesRoot: 'src',
                assetFileNames: ({ name = '' }) => {
                    if (/\.css$/.test(name)) {
                        return 'static/css/[name].[hash][extname]';
                    }

                    if (/\.(gif|jpe?g|png|svg|webp)$/.test(name)) {
                        return 'static/images/[name].[hash][extname]';
                    }

                    if (/\.(eot|ttf|woff)$/.test(name)) {
                        return 'static/fonts/[name].[hash][extname]';
                    }

                    return 'static/[name].[hash][extname]';
                },

                manualChunks(id) {
                    return getManualChunk(id, devDependencies, loggedLibraries);
                },
            },
        },
    },
    test: vitestConfig,
});

function isDevDependency(id: string, devDependencies: DevDependencies, loggedLibraries: LoggedLibraries): boolean {
    for (const devDependency of devDependencies) {
        if (id.includes(devDependency)) {
            if (!loggedLibraries.has(devDependency)) {
                console.warn(`This library ${devDependency} is only for development`);
                loggedLibraries.add(devDependency);
            }

            return true;
        }
    }

    return false;
}

function getManualChunk(
    id: string,
    devDependencies: DevDependencies,
    loggedLibraries: LoggedLibraries,
): string | undefined {
    if (!id.includes('node_modules')) {
        return;
    }

    if (isDevDependency(id, devDependencies, loggedLibraries)) {
        return; // Exclude devDependencies from vendor chunk
    }

    return 'vendor'; // Default to 'vendor' chunk for other node modules
}
