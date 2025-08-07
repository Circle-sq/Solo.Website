import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect, memo } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { RequestStatus, StreamProviders } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';

import { BayesPlayer } from '../streamProviderPlayer/BayesPlayer';
import { BetRadarPlayer } from '../streamProviderPlayer/BetRadarPlayer';
import { GLivePlayer } from '../streamProviderPlayer/GLivePlayer';

import { S_MediaStreamPlayer, S_MediaStream, S_PlayIcon, S_PlayerContainer } from './styled';

interface Props {
    streamUrl: string;
    isAuthenticated: boolean;
    isAutoPlay: boolean;
    setIsAutoPlay: Dispatch<SetStateAction<boolean>>;
    streamUrlState: string;
    mediaIsPlayingVideo: boolean;
    setMediaIsPlayingVideo: (value: boolean) => void;
    streamProvider: string;
}

const MediaStreamPlayer = ({
    streamUrl,
    isAuthenticated,
    isAutoPlay,
    setIsAutoPlay,
    streamUrlState,
    mediaIsPlayingVideo,
    setMediaIsPlayingVideo,
    streamProvider,
}: Props) => {
    const isMounted = useIsMounted();

    const [isPlayerDisplaying, setIsPlayerDisplaying] = useState(false);
    const [isPictureInPicture, setIsPictureInPicture] = useState(false);

    const [isError600, setIsError600] = useState(false);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const errorElement = document.querySelector('.sravvpl_errorCodeMessage');

            if (errorElement) {
                setIsError600(true);
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, []);

    const isValidStreamURL = streamUrlState === RequestStatus.Ready && Boolean(streamUrl) && !isError600;

    const isGLiveStreamProvider = streamProvider === StreamProviders.GLive;
    const isBayesStreamProvider = streamProvider === StreamProviders.Bayes;

    const pauseCallBack = () => {
        if (isMounted() === true) {
            setMediaIsPlayingVideo(false);
        }
    };

    const playCallBack = () => {
        if (isMounted() === true) {
            setMediaIsPlayingVideo(true);
        }
    };

    useEffect(() => {
        document.addEventListener('enterpictureinpicture', () => {
            setIsPictureInPicture(true);
        });

        document.addEventListener('leavepictureinpicture', () => {
            setIsPictureInPicture(false);
        });

        return () => {
            document.removeEventListener('enterpictureinpicture', () => setIsPictureInPicture(false));
            document.removeEventListener('leavepictureinpicture', () => setIsPictureInPicture(false));
        };
    }, []);

    useEffect(() => {
        setIsPlayerDisplaying(mediaIsPlayingVideo);
    }, []);

    const onPlayHandler = () => {
        setIsAutoPlay(true);
        setMediaIsPlayingVideo(true);
        setIsPlayerDisplaying(true);
    };

    return (
        <S_MediaStreamPlayer>
            {isPlayerDisplaying ? (
                <S_MediaStream
                    isAuthenticated={isAuthenticated}
                    isHiddenPlayer={isPictureInPicture}
                    data-testid='media-player'
                >
                    {isValidStreamURL ? (
                        <S_PlayerContainer>
                            {isGLiveStreamProvider ? (
                                <GLivePlayer streamUrl={streamUrl} />
                            ) : isBayesStreamProvider ? (
                                <BayesPlayer streamUrl={streamUrl} />
                            ) : (
                                <BetRadarPlayer
                                    streamUrl={streamUrl}
                                    isAutoPlay={isAutoPlay}
                                    isPlayerDisplaying={isPlayerDisplaying}
                                    playCallBack={playCallBack}
                                    pauseCallBack={pauseCallBack}
                                />
                            )}
                        </S_PlayerContainer>
                    ) : (
                        <S_MediaStream data-testid='media-player-error'>
                            <I18n
                                langKey='media.stream.video.player.notification.label'
                                defaultText='No live stream currently available for this event'
                            />
                        </S_MediaStream>
                    )}
                </S_MediaStream>
            ) : (
                <S_MediaStream>
                    <S_PlayIcon className='sports-video' onClick={onPlayHandler} />
                </S_MediaStream>
            )}
        </S_MediaStreamPlayer>
    );
};

export default memo(MediaStreamPlayer);
