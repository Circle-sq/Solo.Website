import { useCallback, useEffect, useState } from 'react';

export const useElementHeight = (): [number, (node: HTMLElement | null) => void] => {
    const [ref, setRef] = useState<HTMLElement | null>(null);
    const [height, setHeight] = useState(0);

    const handleSize = useCallback(() => {
        if (ref) {
            setHeight(ref.offsetHeight);
        }
    }, [ref]);

    useEffect(() => {
        if (!ref) {
            return;
        }

        handleSize();

        const resizeObserver = new ResizeObserver(handleSize);

        resizeObserver.observe(ref);

        return () => resizeObserver.disconnect();
    }, [ref, handleSize]);

    return [height, setRef];
};
