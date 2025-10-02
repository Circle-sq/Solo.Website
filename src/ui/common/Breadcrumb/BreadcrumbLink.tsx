import isUndefined from 'lodash/isUndefined';
import type { ReactNode } from 'react';

import { RightArrowIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { S_ContentIcon } from '../NavigationList/styled';

import { S_LiveBtnCounter, S_LiveBtnLabel, S_MarginBox } from './styled';

interface LinkContentProps {
    label: ReactNode;
    liveType?: boolean;
    counter?: number;
    Icon?: ReactNode;
    imageUrl?: string;
}

export const BreadcrumbLink = (props: LinkContentProps) => {
    const { label, Icon, imageUrl, counter = 0, liveType = false } = props;

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
            {!isUndefined(imageUrl) ? (
                <S_ContentIcon src={imageUrl} isLoaded={true} />
            ) : (
                <S_MarginBox>{Icon}</S_MarginBox>
            )}
            {label}
        </>
    );
};
