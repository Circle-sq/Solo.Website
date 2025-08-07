import styled from '@emotion/styled';
import type { HTMLAttributes } from 'react';

import { cssColor } from '@sc-ui/system';

import { S_EventInfo, S_EventInfoColumn, S_EventTime } from 'src/ui/common/EventInfographics/styled';
import { S_Participant } from 'src/ui/common/Participants/styled';
import { S_IdentifierLabel, S_Label } from 'src/ui/events/Selection/IdentifierLabel/styled';
import { S_SelectionAction } from 'src/ui/events/Selection/SelectionAction/styled';
import Link from 'src/utils/Router/NewLink';

export const S_Loader = styled((props: HTMLAttributes<HTMLDivElement>) => (
    <div data-testid='in-play-lhn-loader' {...props}>
        <svg width='46' height='46' viewBox='0 0 46 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M26.7828 37.5119C26.9264 38.0481 26.6064 38.6018 26.0614 38.7074C25.0705 38.8994 24.047 39 23 39C14.1634 39 7 31.8366 7 23C7 14.1634 14.1634 7 23 7C31.8366 7 39 14.1634 39 23C39 24.5378 38.7831 26.0249 38.3781 27.4325C38.2336 27.9346 37.7064 28.21 37.2017 28.0748L36.7875 27.9638C36.2195 27.8116 35.9081 27.205 36.0656 26.6385C36.3873 25.4806 36.5593 24.2604 36.5593 23C36.5593 15.5114 30.4886 9.44068 23 9.44068C15.5114 9.44068 9.44064 15.5114 9.44064 23C9.44064 30.4886 15.5114 36.5593 23 36.5593C23.8341 36.5593 24.6507 36.484 25.4432 36.3398C25.9834 36.2415 26.5261 36.5542 26.6683 37.0846L26.7828 37.5119Z'
                fill='url(#paint0_linear_5034_595617)'
            />
            <defs>
                <linearGradient
                    id='paint0_linear_5034_595617'
                    x1='23'
                    y1='23'
                    x2='27.5714'
                    y2='35.9524'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop stopColor='#00A3FE' />
                    <stop offset='1' stopColor='#737373' stopOpacity='0' />
                </linearGradient>
            </defs>
        </svg>
    </div>
))`
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

export const S_SummaryButton = styled.button<{ size: 'sm' | 'md' }>`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    height: ${({ size }) => (size === 'sm' ? '36px' : '40px')};
    padding: 0 12px;
    outline: none;
    border: none;
    background-color: ${cssColor('--list-lhn-header-bg')};
    text-align: left;
    color: inherit;

    &:hover {
        background-color: ${cssColor('--list-lhn-header-hover-bg')};
    }
`;

export const S_Icon = styled.img`
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
`;

export const TooltipStyles = {
    tooltip: {
        sx: {
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            borderRadius: '2px',
            color: cssColor('--tooltip-default-text'),
            backgroundColor: cssColor('--tooltip-default-bg'),
        },
    },
    arrow: {
        sx: {
            color: cssColor('--tooltip-default-bg'),
        },
    },
};

export const S_ShowMoreButton = styled.button`
    width: 100%;
    margin-top: 4px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    padding: 12px;
    outline: none;
    border: 1px solid transparent;
    border-radius: 20px;
    background-color: transparent;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    color: inherit;

    &:hover {
        background-color: ${cssColor('--button-contained-hover')};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.75;
    }
`;

export const S_Events = styled.div`
    & > :not(:first-of-type) {
        border-top: 1px solid ${cssColor('--list-primary-item-border')};
    }
`;

export const S_Event = styled.div`
    position: relative;

    ${S_EventInfoColumn} {
        padding: 12px;
        background-color: ${cssColor('--list-lhn-item-bg')};
    }

    ${S_EventInfo} {
        justify-content: space-between;
    }

    ${S_EventTime} {
        color: ${cssColor('--list-lhn-item-time')};
    }

    ${S_Participant} {
        font-size: 14px;
        font-weight: 500;
        color: ${cssColor('--body-text')};

        & > div {
            overflow: hidden;
        }
    }
`;

export const S_EventLink = styled(Link)`
    text-decoration: none;
    color: ${cssColor('--body-text')};
`;

export const S_EventHighlight = styled.span`
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    background-color: ${cssColor('--list-lhn-item-highlight-border')};
`;

export const S_Selections = styled.div<{ locked?: boolean }>`
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid ${cssColor('--list-primary-item-border')};
    background-color: ${({ locked }) => (locked ? cssColor('--list-lhn-item-bg') : 'transparent')};

    ${S_SelectionAction} {
        flex: 1;
        overflow: hidden;
        padding: 0 12px;
        flex-direction: row;
        gap: 4px;
        border-radius: 0;
        background-color: ${cssColor('--list-lhn-item-bg')};

        &:not(:first-of-type) {
            border-left: 1px solid ${cssColor('--list-primary-item-border')};
        }

        &:hover {
            background-color: ${cssColor('--list-lhn-item-hover-bg')};
        }
    }

    ${S_IdentifierLabel} {
        position: static;
        overflow: hidden;
        flex: 1;
        display: block;
        width: unset;
        color: unset;
    }

    ${S_Label} {
        position: static;
        overflow: hidden;
        display: block;
        width: unset;
        height: unset;
        max-width: unset;
        min-width: unset;
        padding: 0;
        border: none;
        border-radius: 0;
        background-color: transparent;
        font-size: 12px;
        line-height: unset;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: unset;
        text-align: left;
    }
`;
