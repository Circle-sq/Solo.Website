import styled from '@emotion/styled';

import { LightBluePalette, cssColor } from '@solo-ui/system';

import Button from 'src/ui/common/Button/Button';
import StatefulButton from 'src/ui/common/Button/StatefulButton';
import { getPlaceButtonStyles } from 'src/ui/shared/betting-button-color-mixin';

export const S_LoginButton = styled(Button)`
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    background-color: ${cssColor('--button-default-bg')};
    color: ${cssColor('--body-text')};

    &:hover {
        background-color: ${cssColor('--button-default-hover-bg')};
    }
`;

export const PlaceButton = styled(StatefulButton)`
    padding: 8px 0 6px;
    pointer-events: auto;
    width: 100%;
    display: flex;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    min-height: 48px;
    font-size: 16px;
    transition: none;
    text-transform: capitalize;
    flex-direction: row;
    opacity: 1;

    ${({ disabled = false, loading = false }): string => {
        if (disabled && loading) {
            return getPlaceButtonStyles({
                borderColor: cssColor('--button-disabled-border'),
                bgColor: cssColor('--button-disabled-bg'),
                color: cssColor('--button-disabled-text'),
                bgHoverColor: cssColor('--button-disabled-bg'),
                borderHoverColor: cssColor('--button-disabled-border'),
            });
        }

        if (disabled) {
            return getPlaceButtonStyles({
                borderColor: cssColor('--button-brand-disabled-border'),
                bgColor: cssColor('--button-brand-disabled-bg'),
                color: cssColor('--text-muted'),
            });
        }

        return getPlaceButtonStyles({
            borderColor: cssColor('--button-default-border'),
            bgColor: cssColor('--button-default-bg'),
            color: cssColor('--body-text'),
            bgHoverColor: cssColor('--button-default-hover-bg'),
        });
    }}
`;

export const Label = styled.span`
    font-size: 12px;
`;

export const Value = styled.span`
    font-size: 16px;
`;

export const GrayContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: ${LightBluePalette.lightBlue12};
`;

export const S_PlaceBetButton = styled.div`
    display: flex;
    flex: 1 1;
`;

export const GapUp = styled.span`
    padding-top: 4px;
`;
