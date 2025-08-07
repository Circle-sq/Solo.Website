import styled from '@emotion/styled';

import { fontWeight, GreyPalette, cssColor } from '@sc-ui/system';

export const S_SportHeader = styled.thead`
    width: 100%;
`;

export const S_TableSubHead = styled.tr`
    display: flex;
    flex-direction: row;
    height: 58px;
    width: 100%;
    font-weight: ${fontWeight.semibold};
    font-size: 14px;

    > * {
        border-right: 1px solid ${cssColor('--table-data-border')};
    }
`;

export const S_TableSubHeadLive = styled(S_TableSubHead)`
    > * {
        border-right: 1px solid ${cssColor('--table-data-secondary-border')};
    }
`;

export const S_BaseTableHeadRow = styled.tr`
    width: 100%;
    display: table;
    border-radius: 6px 6px 0 0;
`;

export const S_TableHeadRowLive = styled(S_BaseTableHeadRow)`
    background-color: ${cssColor('--panel-primary-header-bg')};
`;

export const S_TableHeadRowUpcoming = styled(S_BaseTableHeadRow)`
    background-color: ${cssColor('--panel-primary-header-bg')};
`;

export const S_TableHeadCell = styled.th`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: ${fontWeight.semibold};
    font-size: 16px;
    gap: 8px;
    color: ${cssColor('--text-info-color')};

    border-radius: 6px 6px 0 0;
    padding: 7px 12px;
`;

export const S_TimeHeader = styled.td`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 10%;
`;

export const S_NameHeader = styled.td`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 25%;
`;

export const S_OddsHeader = styled.td`
    display: grid;
    grid-template-columns: 28% 36% 36%;
    grid-template-rows: auto auto;

    width: 30%;
`;

export const S_LiveText = styled.span`
    display: flex;
    justify-content: center;
    padding: 0 4px;
    align-items: center;
    color: ${cssColor('--text-error')};
    background-color: ${cssColor('--label-contained-bg')};
    transform: skew(-10deg);
    border-radius: 2px;
    height: 16px;

    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    font-size: 0.7em;
    font-weight: 800;
    letter-spacing: -0.02em;
`;

export const S_HeaderItemGrid = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    grid-column: span 1;
`;

export const S_HeaderGrid = styled(S_HeaderItemGrid)`
    grid-column: 1 / span 3;

    border-bottom: 1px solid ${cssColor('--table-data-border')};
`;

export const S_HeaderGridLive = styled(S_HeaderGrid)`
    border-bottom: 1px solid ${cssColor('--table-data-secondary-border')};
`;

export const S_Icon = styled.span`
    font-size: 16px;
    width: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${GreyPalette.grey7};
`;
