import isUndefined from 'lodash/isUndefined';
import type { ReactNode } from 'react';

import { CupIcon, GlobeIcon, RightArrowIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { S_ContentIcon } from '../NavigationList/styled';

import { S_LiveBtnCounter, S_LiveBtnLabel, S_MarginBox } from './styled';

interface LinkContentProps {
    label: ReactNode;
    liveType?: boolean;
    counter?: number;
    icon?: string;
    imageUrl?: string;
}

export const BreadcrumbLink = (props: LinkContentProps) => {
    const { label, icon, imageUrl, counter = 0, liveType = false } = props;

    const getSportIcon = (iconClass: string) => {
        if (iconClass === 'theme-competitions-all') {
            return (
                <S_MarginBox>
                    <CupIcon fontSize='small' data-testid='playIcon' />
                </S_MarginBox>
            );
        }

        if (iconClass === 'sports-globe') {
            return (
                <S_MarginBox>
                    <GlobeIcon fontSize='small' color={cssColor('--icon-generic-color')} data-testid='globeIcon' />
                </S_MarginBox>
            );
        }

        return null;
    };

    if (liveType && counter > 0) {
        return (
            <>
                <S_LiveBtnLabel data-testid='live-button-label'>{label}</S_LiveBtnLabel>
                <S_LiveBtnCounter data-testid='live-button-counter'>{counter}</S_LiveBtnCounter>
                <RightArrowIcon color={cssColor('--icon-generic-color')} fontSize='xsmall' />
            </>
        );
    }

    return (
        <>
            {!isUndefined(imageUrl) ? <S_ContentIcon src={imageUrl} isLoaded={true} /> : getSportIcon(icon as string)}
            {label}
        </>
    );
};
