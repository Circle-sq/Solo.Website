import styled from '@emotion/styled';

import { cssColor } from '@solo-ui/system';

import Link from 'src/utils/Router/Link';

export const S_MobileMatchLeadMedia = styled.button`
    max-width: 100px;
    width: 100%;
    background-color: inherit;
    box-sizing: border-box;
    border: none;
    padding: 5px 0 0 0;
`;

export const S_EventActionLink = styled(Link)<{ isActive?: boolean; disabled?: boolean }>`
    position: relative;
    padding: 0.2rem 0.4rem;
    border: none;
    cursor: pointer;

    &::after {
        margin: 0 auto;
        display: none;
        height: 3px;
        width: 90%;
        content: '';
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: ${cssColor('--box-secondary-border')};
    }

    ${(props): string => {
        const { isActive = false } = props;

        let styles = ``;

        if (isActive) {
            styles = `
                color: ${cssColor('--icon-generic-color')};

                &::after {
                    display: block;
                }
            `;
        } else {
            styles = `
                color: ${cssColor('--icon-disabled-color')};
            `;

            styles +=
                props.disabled === true
                    ? `cursor: default;`
                    : `
                        &:hover::after {
                            display: block;
                        }
                    `;
        }

        return styles;
    }};
`;
