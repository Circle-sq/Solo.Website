import styled from '@emotion/styled';

import { cssColor } from '@solo-ui/system';

export const S_BetslipBetList = styled.div<{ isMultipleSystemTabs?: boolean }>`
    ${({ isMultipleSystemTabs = false }): string => {
        let style = `
            position: relative;
            padding: 16px;
            border-radius: 6px;
        `;

        if (isMultipleSystemTabs) {
            style += `
                > div:first-of-type {
                    border-radius: 6px 6px 0 0;
                }

               > div {
                    border-bottom: 1px solid ${cssColor('--card-border')};
               }

                > div:last-of-type {
                    border-radius: 0 0 6px 6px;
                    border-bottom: none;
                }
            `;
        }

        return style;
    }}
`;

export const S_BaseBetReferralEnabled = styled.div`
    position: relative;
    padding: 8px 0;
    text-align: center;
    font-size: 12px;
    color: ${cssColor('--text-muted')};

    & > svg {
        vertical-align: sub;
        margin-right: 8px;
    }
`;

export const S_MultipleBetReferralEnabled = styled(S_BaseBetReferralEnabled)`
    background-color: ${cssColor('--box-betslip-footer-bg')};
`;
