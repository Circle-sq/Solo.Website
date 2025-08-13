import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@solo-ui/system';

export const S_FilterItemsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

export const S_FilterButtonsContainer = styled(S_FilterItemsContainer)`
    margin-bottom: 15px;
`;

export const S_FilterRadioItem = styled.label`
    flex-basis: calc(50% - 5px);
    margin: 5px 5px 0 0;

    &:last-child {
        margin-right: 0;
    }

    input[type='radio'] {
        appearance: none;
        position: absolute;

        &:checked + span {
            background-color: ${cssColor('--button-contained-primary-active-bg')};
            color: ${cssColor('--body-text')};

            &:hover {
                background-color: ${cssColor('--button-contained-primary-active-bg')};
            }
        }
    }

    input[type='radio'] + span {
        display: inline-block;
        box-sizing: border-box;
        width: 100%;
        border-radius: 3px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.2s;
        padding: 7px 0;
        text-transform: uppercase;
        font-weight: ${fontWeight.medium};
        background-color: ${cssColor('--button-outlined-primary-bg')};
        border: 1px solid ${cssColor('--button-outlined-primary-border')};
        color: ${cssColor('--button-outlined-primary-text')};

        &:hover {
            background-color: ${cssColor('--button-outlined-primary-hover-bg')};
        }
    }
`;
