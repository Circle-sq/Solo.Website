import * as t from 'io-ts';

export const PlatformObjectIO = t.interface({
    id: t.string,
    name: t.string,
    displayOrder: t.union([t.number, t.undefined, t.null]),
    externalId: t.union([
        t.interface({
            instance: t.string,
            provider: t.string,
            feedId: t.union([t.string, t.undefined, t.null]),
            producerId: t.union([t.string, t.undefined, t.null]),
            sportId: t.union([t.string, t.undefined, t.null]),
            eventId: t.union([t.string, t.undefined, t.null]),
        }),
        t.undefined,
        t.null,
    ]),
});

export type PlatformObjectType = t.TypeOf<typeof PlatformObjectIO>;
