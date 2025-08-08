import consoleApi from '@solo/solo-frontend-api/src/lib/console';
import { enableStaticRendering } from 'mobx-react-lite';

consoleApi.hook('solo-website');

process.on('unhandledRejection', (error) => {
    console.error('unhandledRejection', error, '_CFG:FE_WEB_server_init');
});

console.info('Init mobx on server');

enableStaticRendering(true);

process.on('SIGINT', function () {
    console.info('\nGracefully shutting down from SIGINT (Ctrl-C)');
    process.exit(0);
});

export const serverInit = () => {
    console.info('Server start execute');
};
