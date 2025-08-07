import ms from 'ms';
import { useCallback, useEffect, useRef } from 'react';

type AnimateFrameCallback = (timestamp: number) => void;

export const useAnimateFrame = (callback: AnimateFrameCallback, startTime: number) => {
    const animationRef = useRef<number>();
    const timeRef = useRef<number>(0);
    const counter = useRef<number>(Date.now() - startTime * ms('1s'));
    const animate = useCallback(
        (time: number) => {
            if (timeRef.current === 0 || time - timeRef.current >= ms('1s')) {
                const elapsed = Math.floor((Date.now() - counter.current) / ms('1s'));
                callback(elapsed);
                timeRef.current = time;
            }
            animationRef.current = requestAnimationFrame(animate);
        },
        [callback],
    );

    useEffect(() => {
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current !== undefined) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [animate]);
};
