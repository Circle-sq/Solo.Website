import styled from '@emotion/styled';

import { cssColor } from '@solo-ui/system';

export const S_MarketWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    > .market__cell {
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 16px;

        font-size: 14px;
        line-height: 1.4;
        transform: translateX(-18%);
    }
`;

export const S_NoMarketPlaceholder = S_MarketWrapper;

export const S_CellCentered = styled.div`
    width: 100%;
    justify-content: center !important;
    margin: auto 0;
    padding-left: 37%;
`;

export const S_LockedCellWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: auto 0;
    display: flex;
    align-items: center;

    &&& {
        justify-content: center;
        border-right: 1px solid ${cssColor('--table-data-border')};
    }
`;

export const S_LockedCellWrapperLive = styled(S_LockedCellWrapper)`
    &&& {
        border-right: 1px solid ${cssColor('--table-data-secondary-border')};
    }
`;
