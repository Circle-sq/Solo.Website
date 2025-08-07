import { remapEventsSport } from './sportRemapping';
import set from 'lodash/set';

set(global, '$appState.env.sportRemapping', { esoccer: 'football' });

test('it should remap sports (no data)', () => {
    const output = remapEventsSport({ whatever: 'whatever' });

    expect(output).toHaveProperty('events', []);
    expect(output).toHaveProperty('sports', []);
    expect(output).toHaveProperty('whatever', 'whatever');
});

test('it should remap sports (invalid data)', () => {
    const nullData = remapEventsSport(null);
    expect(nullData).toHaveProperty('events', []);
    expect(nullData).toHaveProperty('sports', []);

    const undefinedData = remapEventsSport(undefined);
    expect(undefinedData).toHaveProperty('events', []);
    expect(undefinedData).toHaveProperty('sports', []);

    const empty = remapEventsSport('');
    expect(empty).toHaveProperty('events', []);
    expect(empty).toHaveProperty('sports', []);

    const emptyN = remapEventsSport(123);
    expect(emptyN).toHaveProperty('events', []);
    expect(emptyN).toHaveProperty('sports', []);
});
