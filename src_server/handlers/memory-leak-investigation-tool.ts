import fs from 'fs';
import v8 from 'v8';

import { format } from 'date-fns';
import { isProduction } from '@solo-webapi/infra.server';

function createHeapSnapshot(src: string) {
    const snapshotStream = v8.getHeapSnapshot();
    // It's important that the filename end with `.heapsnapshot`,
    // otherwise Chrome DevTools won't open it.
    const fileName = `website-${format(new Date(), 'yyyy_MM_dd-HH_mm_ss_SSS')}.heapsnapshot`;
    const fileStream = fs.createWriteStream(fileName);
    snapshotStream.pipe(fileStream);
    console.info(`_CFG:WEB_API_ MemLeakTool dump (by: ${src}) written to`, fileName);
}

if (isProduction() && !/nosignal/.test(process.env.NODE_HEAPDUMP_OPTIONS || '')) {
    process.on('SIGUSR2', () => {
        createHeapSnapshot('SIGUSR2');
    });
}
