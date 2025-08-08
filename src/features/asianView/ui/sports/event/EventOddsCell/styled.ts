import styled from '@emotion/styled';

import { cssColor } from '@solo-ui/system';

const ROW_EVENT_ODDS_MIN_HEIGHT = 48;

export const S_RowEventOddsGrid = styled.div<{ height?: number }>`
    width: 100%;
    display: grid;
    grid-template-columns: 28% 36% 36%;
    padding: 6px 0;
    border-bottom: 1px solid ${cssColor('--table-data-border')};
    height: ${({ height = ROW_EVENT_ODDS_MIN_HEIGHT }) => `${height}px`};

    &:last-of-type {
        border-bottom: none;
    }

    > div:first-of-type > div {
        padding-right: 17%;
    }
`;

export const S_RowEventOddsGridLive = styled(S_RowEventOddsGrid)`
    border-bottom: 1px solid ${cssColor('--table-data-secondary-border')};
`;
