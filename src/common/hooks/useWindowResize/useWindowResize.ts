import throttle from 'lodash/throttle';
import { useEffect, useRef } from 'react';

const THROTTLE_INTERVAL = 300;

export const useWindowResize = (callback: () => void, throttleInterval = THROTTLE_INTERVAL) => {
    const throttleResizeRef = useRef(
        throttle(() => {
            callback();
        }, throttleInterval),
    );

    useEffect(() => {
        window.addEventListener('resize', throttleResizeRef.current);

        return () => {
            throttleResizeRef.current.cancel();

            window.removeEventListener('resize', throttleResizeRef.current);
        };
    }, []);
};
