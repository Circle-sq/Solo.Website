import { useWindowWidth } from '@solo-hooks';
import type { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';

import FullscreenIcon from 'src/assets/icons/FullscreenIcon';
import { setMediaActiveTab } from 'src/modules/media/actions/media';

import { S_GLiveOptions, S_FullScreenButton } from './styled';

export const GLivePlayer = ({
    streamUrl,
    isDefaultPreviewVideo,
}: {
    streamUrl: string;
    isDefaultPreviewVideo?: boolean;
}) => {
    const dispatch = useDispatch();
    const { isDesktop } = useWindowWidth();

    const handleFullscreen = (e: SyntheticEvent, src: string) => {
        e.stopPropagation();

        dispatch(setMediaActiveTab(''));

        if (isDefaultPreviewVideo) {
            const popup = window.open('', 'G-Live', 'width=960, height=540');
            popup?.document.write(`
                <iframe src="${src}" title='GLive Stream' data-testid='glive-player'
                    width="100%" height="100%"
                    frameborder="0"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                />
            `);

            return;
        }

        window.open(src, 'G-Live', 'width=960, height=540');
    };

    return (
        <>
            <iframe
                src={streamUrl}
                title='GLive Stream'
                data-testid='glive-player'
                {...(isDefaultPreviewVideo ? { referrerPolicy: 'strict-origin-when-cross-origin' } : {})}
            />

            {isDesktop && (
                <S_GLiveOptions style={isDefaultPreviewVideo ? { left: 'unset', width: 'unset' } : {}}>
                    <S_FullScreenButton onClick={(e) => handleFullscreen(e, streamUrl)}>
                        <FullscreenIcon fill='#fff' size='24px' />
                    </S_FullScreenButton>
                </S_GLiveOptions>
            )}
        </>
    );
};
