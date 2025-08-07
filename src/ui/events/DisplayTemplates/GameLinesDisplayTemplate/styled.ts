import styled from '@emotion/styled';

import { fontWeight, breakpoints, cssColor } from '@sc-ui/system';

import { S_SelectionInlineLine } from '../../Selection/styled';

export const S_TemplateWrapper = styled.div`
    font-size: 14px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    border: 1px solid ${cssColor('--list-selection-item-border')};
    border-bottom: none;
`;

export const S_HeaderWrapper = styled(S_TemplateWrapper)`
    border: none;
`;

export const S_SelectionGroupWrapper = styled.div`
    display: flex;
`;

export const S_SelectionColumnWrapper = styled(S_TemplateWrapper)`
    flex-direction: column;
    align-self: flex-start;
    border: none;
    height: 100%;
    border-right: 1px solid ${cssColor('--list-selection-item-border')};

    &:last-child {
        border: none;
    }
`;

export const S_ParticipantColumnWrapper = styled(S_SelectionColumnWrapper)`
    flex-basis: 25%;
    align-items: center;
`;

export const S_SelectionPrice = styled.div`
    width: 100%;
    height: 100%;
    border-bottom: 1px solid ${cssColor('--list-selection-item-border')};

    > div {
        width: 100%;
        height: 100%;
    }

    button {
        flex-direction: column;
        font-size: 14px;
        align-items: center;
        text-align: initial;
        font-weight: ${fontWeight.bold};
        justify-content: center;
        padding: 10px 0;
        background: ${cssColor('--button-text')};

        > div {
            padding: 0 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        ${S_SelectionInlineLine} {
            font-size: 10px;
            position: relative;
            text-align: center;
        }
    }
`;

export const S_ParticipantLabel = styled(S_SelectionPrice)`
    display: flex;
    align-items: center;
    padding: 0 14px;

    @media screen and (max-width: ${breakpoints.bp500}) {
        padding: 15px 14px;
        overflow: hidden;
    }
`;
