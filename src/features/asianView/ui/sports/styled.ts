import styled from '@emotion/styled';

import { breakpoints, cssColor } from '@solo-ui/system';

export const S_SportItem = styled.table`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    background-color: ${cssColor('--panel-secondary-body-bg')};

    min-width: 1001px;
    width: 100%;
    max-width: 1477px;

    @media screen and (max-width: ${breakpoints.bp1440}) {
        width: 1001px;
    }

    :not(:last-of-type) {
        margin-bottom: 20px;

        @media screen and (max-width: ${breakpoints.bp1440}) {
            margin-bottom: 16px;
        }
    }
`;

export const S_SportItemLive = styled(S_SportItem)`
    background-color: ${cssColor('--panel-primary-body-bg')};
`;

export const S_LoaderWrapper = styled.div`
    margin: 30px 0;
`;
