import { getStorageBuilder } from 'src/utils/StorageService';

export const updateStorageItems = (items: { key: string; value?: string }[]) => {
    for (const item of items) {
        const storage = getStorageBuilder()(item.key);

        if (item.value === undefined) {
            storage.removeItem();
        } else {
            storage.setItem(item.value);
        }
    }
};
