import type ws from 'ws';

import { createMessagePing } from '../decode';

export class PingPongManager {
    private readonly aliveConnection: Set<ws> = new Set();

    constructor(
        readonly wss: ws.Server,
        readonly heartbeat: number,
    ) {
        setInterval(() => {
            for (const connection of wss.clients.values()) {
                if (this.aliveConnection.has(connection) === false) {
                    connection.terminate();

                    continue;
                }

                this.aliveConnection.delete(connection);
                connection.send(JSON.stringify(createMessagePing()), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        }, heartbeat);
    }

    receivedPong(connection: ws) {
        this.aliveConnection.add(connection);
    }
}
