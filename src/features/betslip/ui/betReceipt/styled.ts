import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

import Button from 'src/ui/common/Button/Button';

export const S_BetReceiptCardHeader = styled.div`
    padding: 9px 16px;
    font-size: 14px;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    line-height: 19px;
    font-weight: ${fontWeight.bold};
    background: ${cssColor('--list-primary-header-bg')};
`;

export const S_BetReceiptCardContent = styled.div`
    padding: 18px 8px 8px 8px;
    border-radius: 6px;
    background-color: ${cssColor('--list-primary-body-bg')};
`;

export const S_CloseBetReceiptButton = styled(Button)`
    width: 100%;
    padding: 9px 24px;
    line-height: 25px;
    height: 48px;
    border-radius: 3px;
    background-color: ${cssColor('--button-default-bg')};
    font-weight: ${fontWeight.bold};
    border: solid 1px ${cssColor('--button-default-border')};

    &:hover {
        border: 1px solid ${cssColor('--button-default-border')};
        background-color: ${cssColor('--button-default-hover-bg')};
    }
`;

export const S_Button = styled.div`
    text-align: center;
`;

export const S_BetReceipt = styled.div`
    padding: 16px;
    background: ${cssColor('--box-primary-bg')};
`;

export const S_SuccessMessage = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    margin-bottom: 8px;
    border-radius: 5px;
    font-size: 12px;
    line-height: 16px;
    color: ${cssColor('--body-text')};
    background: ${cssColor('--list-primary-header-bg')};
    font-weight: ${fontWeight.semibold};
`;

export const S_BetReceiptCard = styled.div`
    border-radius: 6px;
    overflow: hidden;
    padding-bottom: 0;
    margin-bottom: 30px;
    border: 1px solid ${cssColor('--list-primary-border')};
    background-color: ${cssColor('--list-primary-bg')};
`;
