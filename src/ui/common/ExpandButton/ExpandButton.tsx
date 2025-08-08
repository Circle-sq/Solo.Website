import type { MouseEvent } from 'react';

import { DownArrowIcon, UpArrowIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { I18n } from 'src/ui/common/Language/I18n';

import { S_ShowMoreBtn, S_MarginBox } from './styled';

interface Props {
    toggleExpand: (e: MouseEvent<HTMLButtonElement>) => void;
    isExpanded: boolean;
}

export const ExpandButton = (props: Props) => {
    const { toggleExpand, isExpanded } = props;

    return (
        <S_ShowMoreBtn onClick={toggleExpand} data-testid='showMore'>
            {isExpanded ? (
                <I18n langKey='events.selections-group.button.less' defaultText='Show Less' />
            ) : (
                <I18n langKey='events.selections-group.button.more' defaultText='Show More' />
            )}
            <S_MarginBox>
                {isExpanded ? (
                    <UpArrowIcon fontSize='xsmall' color={cssColor('--icon-generic-color')} />
                ) : (
                    <DownArrowIcon fontSize='xsmall' color={cssColor('--icon-generic-color')} />
                )}
            </S_MarginBox>
        </S_ShowMoreBtn>
    );
};
