import styled from '@emotion/styled';

import { cssColor } from '@solo-ui/system';

export const S_EventRowWrapper = styled.td`
    display: grid;
    grid-template-columns: 1fr 2.5fr 3fr 3fr 0.5fr;

    > *:not(:last-child) {
        border-right: 1px solid ${cssColor('--table-data-border')};
    }

    :not(:last-of-type) {
        border-bottom: 1px solid ${cssColor('--table-data-border')};
    }
`;

export const S_EventRowWrapperLive = styled(S_EventRowWrapper)`
    > *:not(:last-child) {
        border-right: 1px solid ${cssColor('--table-data-secondary-border')};
    }

    :not(:last-of-type) {
        border-bottom: 1px solid ${cssColor('--table-data-secondary-border')};
    }
`;

export const S_CommonCell = styled.div`
    display: flex;
    padding: 4px 0;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid ${cssColor('--table-data-border')};
`;

export const S_CommonCellLive = styled(S_CommonCell)`
    border-right: 1px solid ${cssColor('--table-data-secondary-border')};
`;
