import { useEffect, useRef } from 'react';

interface BetRadarPlayerProps {
    streamUrl: string;
    isAutoPlay: boolean;
    isPlayerDisplaying: boolean;
    playCallBack: () => void;
    pauseCallBack: () => void;
}

export const BetRadarPlayer = ({
    streamUrl,
    isAutoPlay,
    isPlayerDisplaying,
    playCallBack,
    pauseCallBack,
}: BetRadarPlayerProps) => {
    const videoElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const configData = {
            id: 'playercontainer',
            handlers: ['html5', 'hls'],
            allowFullScreen: true,
            enablePip: true,
            mute: false,
            streamUrl,
        };

        try {
            if (videoElement.current !== null) {
                window.avvplInstance = new window.avvpl.setupPlayer(configData);
                window.avvplInstance.play.subscribe(playCallBack);
                window.avvplInstance.pause.subscribe(pauseCallBack);
            }
        } catch (err) {
            console.error(err);
        }

        return () => {
            window.avvplInstance?.remove?.();
        };
    }, [isAutoPlay, isPlayerDisplaying, streamUrl]);

    return <div id='playercontainer' ref={videoElement} data-testid='bet-radar-player'></div>;
};
