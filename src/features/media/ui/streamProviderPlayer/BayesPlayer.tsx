import BayesWebPlayer from '@bayesgg/bayes-web-player-js';
import bayesCSS from '@bayesgg/bayes-web-player-js/dist/css/bwp.css?inline';
import { useEffect, useRef } from 'react';

export const BayesPlayer = ({ streamUrl }: { streamUrl: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = bayesCSS;
        document.head.appendChild(style);

        const player = new BayesWebPlayer(streamUrl, ref.current as HTMLDivElement, {
            autoplay: true,
            muted: true,
        });

        player.init();
        player.play();

        return () => {
            player.destroy();
            document.head.removeChild(style);
        };
    }, [streamUrl]);

    return <div ref={ref} data-testid='bayes-player' />;
};
