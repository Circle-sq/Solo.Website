import styled from '@emotion/styled';
import CloseIcon from 'libs/ui-icons-svg/src/CloseIcon';

import { breakpoints, cssColor } from '@solo-ui/system';

import { S_BaseOverlay } from 'src/ui/common/Backdrop/styled';

export const S_Overlay = styled(S_BaseOverlay)<{ topOffset: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media not screen and (min-width: ${breakpoints.bp1280}) {
        top: ${({ topOffset }) => topOffset};
        padding-top: 22px;
    }
`;

export const S_CloseFrame = styled(CloseIcon)`
    position: absolute;
    color: ${cssColor('--icon-light-color')};
    right: calc(20% - 20px);
    top: calc(7.5% - 17px);
    width: 15px;
    height: 15px;
    cursor: pointer;

    @media not screen and (min-width: ${breakpoints.bp1280}) {
        right: 14px;
        top: 8px;
    }
`;

export const S_IFrameWrapper = styled.div`
    width: 100%;
    height: 100%;

    iframe {
        max-width: 60%;
        cursor: pointer;
        height: 85%;
    }

    @media not screen and (min-width: ${breakpoints.bp1280}) {
        iframe {
            max-width: 100%;
            height: 100%;
        }
    }
`;
