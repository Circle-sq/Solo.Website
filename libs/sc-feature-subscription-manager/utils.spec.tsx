import { SubKey } from './subKeys';
import { EntityType, type PubSubState } from './types';
import {
    buildChannel,
    buildChannels,
    filterObsoleteChannels,
    mergeSubscriptions,
    omitEvents,
    reduceSubscriptions,
} from './utils';

const buildStateWithTimestamp = (timestamp: number): PubSubState => ({
    '*:Event:1': { event_row: timestamp },
    '*:Event:4': { event_row: timestamp },
    '*:Event:5': { event_row: timestamp, bet: timestamp },
    '*:Event:3': { event_row: timestamp },
});

const buildEventChannel = (eventId: number) => buildChannel(eventId, EntityType.Event);

const buildEventChannels = (eventIds: number[]) => buildChannels(eventIds, EntityType.Event);

describe('Subscription utils', () => {
    let now: number;
    let initState: PubSubState;

    beforeEach(() => {
        now = Date.now();
        initState = buildStateWithTimestamp(now);
    });

    it('should omit all but 1 channel', () => {
        const unsubscribeIds = [1, 3, 4];
        const unsubscribeChannels = buildEventChannels(unsubscribeIds);
        const { diff: channelsToUnsubscribeFrom, nextState: whatIsLeft } = reduceSubscriptions(
            initState,
            unsubscribeChannels,
            SubKey.event_row,
            now + 1,
        );

        expect(whatIsLeft).toEqual({ '*:Event:5': { event_row: now, bet: now } });
        expect(channelsToUnsubscribeFrom).toEqual(unsubscribeChannels);
    });

    it('should not unsubscribe from channel', () => {
        const unsubscribeFrom = buildEventChannels([5]);
        const { nextState: whatIsLeft, diff: channelsToUnsubscribe } = reduceSubscriptions(
            initState,
            unsubscribeFrom,
            SubKey.test_bet,
            now + 1,
        );
        //const channelsToUnsubscribe = filterObsoleteChannels(whatIsLeft, [buildEventChannel(5)]);

        expect(whatIsLeft).toEqual({
            '*:Event:1': { event_row: now },
            '*:Event:4': { event_row: now },
            '*:Event:5': { event_row: now },
            '*:Event:3': { event_row: now },
        });
        expect(channelsToUnsubscribe).toEqual([]);
    });

    it('should unsubscribe all', () => {
        const eventIds = [5, 4, 3, 1];
        const whatIsLeft = omitEvents(
            {
                '*:Event:1': { event_row: now },
                '*:Event:4': { event_row: now },
                '*:Event:5': { event_row: now },
                '*:Event:3': { event_row: now },
            },
            buildEventChannels(eventIds),
            SubKey.event_row,
            now + 1,
        );
        expect(whatIsLeft).toEqual({});

        const eventsToUnsubscribe = filterObsoleteChannels(whatIsLeft, buildEventChannels(eventIds));

        expect(eventsToUnsubscribe).toEqual(buildEventChannels(eventIds));
    });

    it('should have no impact unsubscribe that was triggered for later subscribed events', () => {
        const initTimestamp = 1;
        const rd3_timestamp = 3;

        const NEW_EVENT_ID = 2;
        const FIRST_TO_GO_ID = 4;

        const currentSubscriptions = buildStateWithTimestamp(initTimestamp);
        const newBatch = [1, NEW_EVENT_ID, 3];

        const { nextState: refreshedState, diff: newEvents } = mergeSubscriptions(
            currentSubscriptions,
            buildEventChannels(newBatch),
            SubKey.event_row,
            rd3_timestamp,
        );

        /*
                             +----- timestamp
                             |
                             v
        '*:Event:1': { event_row: 1 },             ---.
        '*:Event:4': { event_row: 1 },                |
        '*:Event:5': { event_row: 1, bet: 1 },        >  currentSubscriptions
        '*:Event:3': { event_row: 1 },             ---'
        +

        '*:Event:1': { event_row: 3 },             ---.
        '*:Event:2': { event_row: 3 },                 >  newBatch
        '*:Event:3': { event_row: 3 },             ---'
        =
        '*:Event:1': { event_row: 3 },            // update timestamp
        '*:Event:2': { event_row: 3 },            // and add new ones
        '*:Event:4': { event_row: 1 },            // unchanged
        '*:Event:5': { event_row: 1, bet: 1 },    // unchanged
        '*:Event:3': { event_row: 3 },            // update timestamp
        */

        expect(refreshedState).toEqual({
            '*:Event:1': { event_row: 3 },
            '*:Event:2': { event_row: 3 },
            '*:Event:4': { event_row: 1 },
            '*:Event:5': { event_row: 1, bet: 1 },
            '*:Event:3': { event_row: 3 },
        });

        // we need to subscribe new event (diff) 2
        expect(newEvents).toEqual([buildEventChannel(NEW_EVENT_ID)]);

        // N E X T   S T E P
        const nd2_timestamp = 2;
        const unsubscribeBatch = buildEventChannels([1, FIRST_TO_GO_ID, 5]);
        const { diff: obsoleteEvents, nextState } = reduceSubscriptions(
            refreshedState,
            unsubscribeBatch,
            SubKey.event_row,
            nd2_timestamp,
        );

        // now re unsubscribe 1,2,5 from **event_row** with 2nd timestamp
        /*
        '*:Event:1': { event_row: 3 },                 ---.
        '*:Event:2': { event_row: 3 },                     |
        '*:Event:4': { event_row: 1 },  <- the goner        > refreshedState
        '*:Event:5': { event_row: 1, bet: 1 },             |
        '*:Event:3': { event_row: 3 },                  ---'
        -
        '*:Event:1': { event_row: 2 },                  ---.
        '*:Event:4': { event_row: 2 },                      > unsubscribeBatch
        '*:Event:5': { event_row: 2 },                  ---'
        =
        '*:Event:1': { event_row: 3 },
        '*:Event:2': { event_row: 3 },
        '*:Event:5': { bet: 1 },
        '*:Event:3': { event_row: 3 },

        unsubscribe to : [4]

        * */
        expect(nextState).toEqual({
            '*:Event:1': { event_row: 3 },
            '*:Event:2': { event_row: 3 },
            '*:Event:5': { bet: 1 },
            '*:Event:3': { event_row: 3 },
        });

        expect(obsoleteEvents).toEqual([buildEventChannel(FIRST_TO_GO_ID)]);

        // N E X T   S T E P

        const th5_LAST_TO_GO_ID = 5;
        const { diff: lastObsoleteEvents, nextState: lastRoundState } = reduceSubscriptions(
            nextState,
            buildEventChannels([th5_LAST_TO_GO_ID]),
            SubKey.test_bet,
            rd3_timestamp,
        );

        // now re unsubscribe 5 from **bets** with 3rd timestamp
        /*

        '*:Event:1': { event_row: 3 },
        '*:Event:2': { event_row: 3 },
        '*:Event:5': { bet: 1 }, <- next goner
        '*:Event:3': { event_row: 3 },
        -
        '*:Event:5': { bet: 3 },
        =
        '*:Event:1': { event_row: 3 },
        '*:Event:2': { event_row: 3 },
        '*:Event:3': { event_row: 3 },

        unsubscribe to : [th5_LAST_TO_GO_ID:5]

        */
        expect(lastRoundState).toEqual({
            '*:Event:1': { event_row: 3 },
            '*:Event:2': { event_row: 3 },
            '*:Event:3': { event_row: 3 },
        });
        expect(lastObsoleteEvents).toEqual([buildEventChannel(th5_LAST_TO_GO_ID)]);
    });
});
