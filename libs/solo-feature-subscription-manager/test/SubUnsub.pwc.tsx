// numbers are applied on the lever of window (global object)
// defining constants in the test make then inaccessible in the tested code, so:
/* eslint-disable @typescript-eslint/no-magic-numbers */

import path from 'path';

import { test } from '@playwright/experimental-ct-react';
import type { Page } from '@playwright/test';
import times from 'lodash/times';
import ms from 'ms';
import * as sinon from 'sinon';

import { buildMockEvents } from './mock-event-utils';
import type { MockEvent } from './MockEvent';
import { MockContent } from './MockPubSubApp';
import { verifyComponent } from './pwc-util';
import TestApp from './TestApp';

declare global {
    interface Window {
        __clock: sinon.SinonFakeTimers;
    }
}
test.use({ viewport: { width: 1280, height: 1024 } });
test.beforeEach(async ({ context }) => {
    await context.addInitScript({
        path: path.join(__dirname, '../../../', './node_modules/sinon/pkg/sinon.js'),
    });
    await context.addInitScript(() => {
        window.__clock = sinon.useFakeTimers();
    });
});

const firstParamIndex = 0;
type RoleType = Parameters<Page['getByRole']>[typeof firstParamIndex];

const getAdapter = (page: Page) => {
    return {
        getByRole: async (role: RoleType, name: string) => {
            return page.getByRole(role, { name, exact: true }).click();
        },
    };
};

test('SubUnsubFeature', async ({ mount, page }) => {
    const user = getAdapter(page);
    const entitiesCount = 3;
    const idMultiplayer = 11;
    const eventIds = times(entitiesCount, (id) => (id + 1) * idMultiplayer); //[FIRST_EVENT_ID, SECOND_EVENT_ID, THIRD_EVENT_ID];
    const mockEvents: MockEvent[] = buildMockEvents(eventIds);

    // Mount a component. Returns locator pointing to the component.
    await mount(
        <TestApp timeout={ms('5s')}>
            <MockContent fooParam={mockEvents} />
        </TestApp>,
    );
    // show the list
    await user.getByRole('button', 'show list');
    await verifyComponent(
        // prettier-ignore
        [
            'total:3',
            '11:#event_row',
            '22:#event_row',
            '33:#event_row'
        ],
        page,
    );
    await page.getByTestId('list-event-22-bet').click();
    await verifyComponent(
        // prettier-ignore
        [
            'total:3',
            '11:#event_row',
            '22:#event_row,#bet',
            '33:#event_row'
        ],
        page,
    );

    await page.getByTestId('list-event-33').click();
    // verify we are on details page
    await page.waitForSelector("[data-testid='details-page']", { state: 'visible' });
    //
    await verifyComponent(
        // prettier-ignore
        [
            'total:3',
            '11:#event_row',
            '22:#event_row,#bet',
            '33:#event_row,#event_card'
        ],
        page,
    );
    await page.getByTestId('details-event-33-bet').click();
    await verifyComponent(
        // prettier-ignore
        [
            'total:3',
            '11:#event_row',
            '22:#event_row,#bet',
            '33:#event_row,#event_card,#bet'
        ],
        page,
    );
    await page.getByRole('button', { name: 'backTo list' }).click();
    // check no details
    await page.waitForSelector("[data-testid='details-page']", { state: 'detached' });
    // let's go back to details
    await page.getByTestId('list-event-33').click();
    await page.waitForSelector("[data-testid='details-page']", { state: 'visible' });
    // still subscribed
    await verifyComponent(
        // prettier-ignore
        [
            'total:3',
            '11:#event_row',
            '22:#event_row,#bet',
            '33:#event_row,#event_card,#bet'
        ],
        page,
    );

    await page.getByRole('button', { name: 'backTo list' }).click();
    await page.waitForSelector("[data-testid='details-page']", { state: 'detached' });
    await page.evaluate(() => window.__clock.tick(5000));
    await verifyComponent(
        // prettier-ignore
        [
            'total:3',
            '11:#event_row',
            '22:#event_row,#bet',
            '33:#event_row,#bet'
        ],
        page,
    );
    // hide the list
    await page.getByRole('button', { name: 'hide list', exact: true }).click();
    await page.evaluate(() => window.__clock.tick(5000));
    await verifyComponent(
        // prettier-ignore
        [
            'total:2',
            '22:#bet',
            '33:#bet'
        ],
        page,
    );

    await page.getByTestId('remove-bet-0').click();
    await page.evaluate(() => window.__clock.tick(4000));
    // still subscribed
    await verifyComponent(
        // prettier-ignore
        [
            'total:2',
            '22:#bet',
            '33:#bet'
        ],
        page,
    );
    await page.getByTestId('remove-bet-1').click();
    await page.evaluate(() => window.__clock.tick(1000));
    await verifyComponent(
        // prettier-ignore
        [
            'total:1',
            '33:#bet'
        ],
        page,
    );
    await page.evaluate(() => window.__clock.tick(5000));
    await verifyComponent(
        // prettier-ignore
        [
            'total:0',
            'no subscriptions'
        ],
        page,
    );
});
