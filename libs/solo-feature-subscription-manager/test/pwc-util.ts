import type { Page } from '@playwright/test';
import isUndefined from 'lodash/isUndefined';
import ms from 'ms';

import { WebsocketNamespace } from 'src/utils/socket-io/types';

const waitTimeout = ms('3s');

export async function verifyComponent(snapshot: string[], page: Page) {
    // Wait for the expectedTotal count element to be present (up to 3 seconds)
    const totalElement = await page.waitForSelector(`[data-testid='${WebsocketNamespace.SB}-events-count']`, {
        timeout: waitTimeout,
    });

    if (isUndefined(totalElement)) {
        throw new Error('Total count element not found');
    }

    const expectedTotal = await totalElement.innerText();
    const [totalRow] = snapshot;
    const [, total] = totalRow.split(':');

    if (expectedTotal !== total) {
        throw new Error(`Expected total: '${total}', but found: '${expectedTotal}'`);
    }

    // Check each event and its subscriptions
    if (snapshot[1] === 'no subscriptions') {
        const haveNoSubscriptions = await page
            .getByTestId(`${WebsocketNamespace.SB}-websocket-subscription`)
            .innerText();

        if (haveNoSubscriptions !== `no subscriptions`) {
            throw new Error(`Expected no subscriptions but found '${haveNoSubscriptions}'`);
        }
    } else {
        for (let i = 1; i < snapshot.length; i++) {
            const [eventId, subscriptions] = snapshot[i].split(':');
            const eventElement = await page.$(`[data-testid='event-${eventId}-refs']`);
            const eventText = await eventElement?.innerText();

            if (eventText?.trim() !== `${eventId}:${subscriptions}`) {
                throw new Error(`Event ${i}: Expected '${eventId}:${subscriptions}', but found '${eventText}'`);
            }
        }
    }

    await page.evaluate(() => window.__clock.tick(1000));
}
