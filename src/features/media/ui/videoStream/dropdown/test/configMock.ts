import type { MediaOptionGroup } from '../types';

const event1 = {
    name: 'Kachmazov, Alibek vs. Harper, Mitchell',
    eventStartTime: '2023-04-27T06:00:00.000Z',
    competitionDisplayOrder: '2',
    sportDisplayOrder: '80',
    sportEventId: '643',
    sportId: 'tennis',
    streamId: '16465699-614',
    provider: 'g-live',
    value: '16465699-614',
    label: 'Kachmazov, Alibek vs. Harper, Mitchell',
    externalId: '',
    id: '',
};
const event2 = {
    name: 'Ellouck, Ron vs. Ellis, Blake',
    eventStartTime: '2023-04-27T06:00:00.000Z',
    competitionDisplayOrder: '1',
    sportDisplayOrder: '80',
    sportEventId: '645',
    sportId: 'tennis',
    streamId: '16466279-613',
    provider: 'g-live',
    value: '16466279-613',
    label: 'Ellouck, Ron vs. Ellis, Blake',
    externalId: '',
    id: '',
};
const event3 = {
    name: 'Bakshi, Aleksandre vs. Bertrand, Robin',
    eventStartTime: '2023-04-27T06:00:00.000Z',
    competitionDisplayOrder: '3',
    sportDisplayOrder: '80',
    sportEventId: '649',
    sportId: 'tennis',
    streamId: '16467102-615',
    provider: 'g-live',
    value: '16467102-615',
    label: 'Bakshi, Aleksandre vs. Bertrand, Robin',
    externalId: '',
    id: '',
};
const event4 = {
    name: 'Vukic, Aleksandar vs Berankis, Ricardas',
    eventStartTime: '2023-04-27T06:25:00.000Z',
    competitionDisplayOrder: '3',
    sportDisplayOrder: '80',
    sportEventId: '138',
    sportId: 'tennis',
    streamId: '383278',
    provider: 'img',
    value: '383278',
    label: 'Vukic, Aleksandar vs Berankis, Ricardas',
    externalId: '',
    id: '',
};
const event5 = {
    name: 'zukic, Aleksandar vs Berankis, Ricardas',
    eventStartTime: '2023-04-27T06:25:00.000Z',
    competitionDisplayOrder: '3',
    sportDisplayOrder: '80',
    sportEventId: '138',
    sportId: 'tennis',
    streamId: '383278',
    provider: 'img',
    value: '383278',
    label: 'Vukic, Aleksandar vs Berankis, Ricardas',
    externalId: '',
    id: '',
};
const event6 = {
    name: 'Diallo, Gabriel vs Eubanks, Christopher',
    eventStartTime: '2023-04-27T06:45:00.000Z',
    competitionDisplayOrder: '0',
    sportDisplayOrder: '80',
    sportEventId: '197',
    sportId: 'tennis',
    streamId: '383282',
    provider: 'img',
    value: '383282',
    label: 'Diallo, Gabriel vs Eubanks, Christopher',
    externalId: '',
    id: '',
};
const event7 = {
    name: 'Kudla D / Kwiatkowski T vs Gonzales R / Stalder R',
    eventStartTime: '2023-04-27T07:10:00.000Z',
    competitionDisplayOrder: '0',
    sportDisplayOrder: '80',
    sportEventId: '283',
    sportId: 'tennis',
    streamId: '383275',
    provider: 'img',
    value: '383275',
    label: 'Kudla D / Kwiatkowski T vs Gonzales R / Stalder R',
    externalId: '',
    id: '',
};

const event8 = {
    name: 'Otago Nuggets vs Nelson Giants',
    eventStartTime: '2023-04-27T07:00:00.000Z',
    competitionDisplayOrder: '0',
    sportDisplayOrder: '95',
    sportEventId: '48',
    sportId: 'basketball',
    streamId: '1g5pyowvvcjyn151txkz13arye',
    provider: 'perform',
    value: '1g5pyowvvcjyn151txkz13arye',
    label: 'Otago Nuggets vs Nelson Giants',
    externalId: '',
    id: '',
};

export const mappedStreams: MediaOptionGroup[] = [
    {
        label: 'Tennis',
        value: 'tennis',
        options: [event1, event2, event3, event4, event5, event6, event7],
    },
    {
        label: 'Basketball',
        value: 'basketball',
        options: [event8],
    },
];

export const sortedMappedStreams = [
    {
        label: 'Basketball',
        value: 'basketball',
        options: [event8],
    },
    {
        label: 'Tennis',
        value: 'tennis',
        options: [event3, event4, event5, event1, event2, event6, event7],
    },
];
