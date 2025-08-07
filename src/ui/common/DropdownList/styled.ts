import styled from '@emotion/styled';

import { fontWeight, radius, GenericColors, Opacities, cssColor } from '@sc-ui/system';

export const S_Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 16px 16px 0 16px;
    width: 100%;
    user-select: none;
`;

export const S_Item = styled.div<{ isOpen?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 9px 11px 12px;
    white-space: nowrap;
    cursor: pointer;
    border-left: 3px solid ${GenericColors.transparent};

    &:hover {
        font-weight: ${fontWeight.bold};
        background-color: ${GenericColors.white + Opacities.opacity10};
    }
`;

export const S_Dropdown = styled.div<{ isOpen?: boolean }>`
    position: absolute;
    left: 0;
    z-index: 5;
    top: 100%;
    min-width: 200px;
    width: 100%;

    ${(props): string => {
        const { isOpen } = props;

        let styles = `
            border-radius: ${radius.secondary};
            box-shadow: 0px 2px 4px 1px ${cssColor('--dropdown-shadow')};
        `;

        if (isOpen) {
            styles += `
                border-radius: 0 0 3px 3px;
                border-top: 0;
                box-shadow: 1px 8px 5px 1px ${cssColor('--dropdown-shadow')};

                > div:last-child {
                    border-radius: 0 0 3px 3px;
                }
            `;
        }

        return styles;
    }}
`;

export const S_Selected = styled.div<{ isOpen?: boolean }>`
    align-items: center;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    line-height: 1.2;
    min-height: 24px;
    min-width: 150px;
    overflow: hidden;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
    padding: 11px 16px 10px 16px;
    border-radius: 6px 6px 0 0;
    font-weight: ${fontWeight.bold};
    border: 1px solid ${cssColor('--dropdown-border')};
    background-color: ${cssColor('--dropdown-bg')};

    ${(props): string => {
        const { isOpen } = props;

        let styles = '';

        if (isOpen) {
            styles += `
                border-bottom: 0;
            `;
        }

        return styles;
    }}
}
`;
