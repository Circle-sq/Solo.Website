import { BetslipTab } from 'src/common/enums';

import type { PartialStorage } from './StorageService';
import buildLocalStorageService, {
    storageIsAvailable,
    storageServiceBuilder,
    getStorageBuilder,
    testUtilReset,
} from './StorageService';

beforeEach(() => testUtilReset());

test('check string storage', () => {
    const stringStorage = buildLocalStorageService<string>('testString');

    expect(stringStorage.getItem()).toBeNull();
    expect(stringStorage.getItem('foo')).toBe('foo');

    stringStorage.setItem('qwe');

    expect(stringStorage.getItem()).toBe('qwe');

    stringStorage.removeItem();

    expect(stringStorage.getItem()).toBeNull();
});

test('check number storage', () => {
    const stringStorage = buildLocalStorageService<number>('numberString');

    expect(stringStorage.getItem()).toBeNull();

    stringStorage.setItem(1);

    expect(stringStorage.getItem()).toBe(1);

    stringStorage.setItem(3);

    expect(stringStorage.getItem()).toBe(3);

    stringStorage.removeItem();

    expect(stringStorage.getItem()).toBeNull();
});

test('check type storage', () => {
    const stringStorage = buildLocalStorageService<BetslipTab>('typeString');

    expect(stringStorage.getItem()).toBeNull();

    stringStorage.setItem(BetslipTab.Single);

    expect(stringStorage.getItem()).toBe(BetslipTab.Single);

    stringStorage.setItem(BetslipTab.System);

    expect(stringStorage.getItem()).toBe(BetslipTab.System);

    stringStorage.removeItem();

    expect(stringStorage.getItem()).toBeNull();
});

test('check no window available storage, should log errors', () => {
    const noLocalStorageService = storageServiceBuilder();

    const stringStorage = noLocalStorageService<BetslipTab>('typeString');

    const errorSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

    stringStorage.getItem();

    expect(errorSpy).toHaveBeenCalledWith('no storage to get', 'typeString');
});

test('it should not throw', () => {
    const storage = buildLocalStorageService<unknown>('typeString');

    const defectiveObj: { prop?: Record<string, unknown> } = {};
    defectiveObj.prop = defectiveObj;

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => storage.setItem(defectiveObj)).not.toThrow();
    expect(errorSpy).toHaveBeenCalledWith('Storage:', expect.stringContaining('Converting circular structure to JSON'));
});

test('it should not throw e.g. access denied', () => {
    const win = {
        get localStorage(): PartialStorage {
            throw `DOMException:
            Failed to read the 'localStorage' property from 'Window': Access is denied for this doc`;
        },
    };

    expect(storageIsAvailable(() => win.localStorage)).toBe(false);
    expect(storageIsAvailable(() => localStorage)).toBe(true);
    expect(storageIsAvailable(() => window.localStorage)).toBe(true);
});

test('should return primitive type (string)', () => {
    const storageBuilder = getStorageBuilder(() => window.localStorage);

    const zzzStorage = storageBuilder('zzz');

    expect(zzzStorage.getItem()).toBeNull();
    zzzStorage.setItem('zzz');

    expect(zzzStorage.getItem()).toBe('zzz');
    zzzStorage.removeItem();
    expect(zzzStorage.getItem()).toBeNull();
});

test('check type[] storage', () => {
    const arrayStorage = buildLocalStorageService<BetslipTab[]>('typeArray');

    expect(arrayStorage.getItem()).toBeNull();

    arrayStorage.setItem([BetslipTab.Single, BetslipTab.Multi]);

    expect(arrayStorage.getItem()).toStrictEqual([BetslipTab.Single, BetslipTab.Multi]);
});
