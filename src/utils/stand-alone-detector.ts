export const isStandAlone = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.parent === window.self;
};
