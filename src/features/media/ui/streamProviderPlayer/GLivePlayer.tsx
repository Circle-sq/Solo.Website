import { useWindowWidth } from '@sc-hooks';
import type { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';

import FullscreenIcon from 'src/assets/icons/FullscreenIcon';
import { setMediaActiveTab } from 'src/modules/media/actions/media';

import { S_GLiveOptions, S_FullScreenButton } from './styled';

export const GLivePlayer = ({ streamUrl }: { streamUrl: string }) => {
    const dispatch = useDispatch();
    const { isDesktop } = useWindowWidth();

    const handleFullscreen = (e: SyntheticEvent, src: string) => {
        e.stopPropagation();

        dispatch(setMediaActiveTab(''));

        window.open(src, 'G-Live', 'width=960, height=540');
    };

    return (
        <>
            <iframe src={streamUrl} title='GLive Stream' data-testid='glive-player'></iframe>

            {isDesktop && (
                <S_GLiveOptions>
                    <S_FullScreenButton onClick={(e) => handleFullscreen(e, streamUrl)}>
                        <FullscreenIcon fill='#fff' size='24px' />
                    </S_FullScreenButton>
                </S_GLiveOptions>
            )}
        </>
    );
};
