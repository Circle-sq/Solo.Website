import type { MouseEvent } from 'react';

import { InfoOutlineIcon } from '@sc-ui/icons/svg';

import { BETTING_RULES, LINK_NAME, windowFeatures } from '../configs';
import { S_SystemInfoLink } from '../styled';
import { cssColor } from '@sc-ui/system';

let referredRulesTab: null | Window = null;

interface Props {
    isDisabled?: boolean;
}

const SystemInfoLink = ({ isDisabled }: Props) => {
    const onTabLinkClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (!referredRulesTab || referredRulesTab.closed) {
            referredRulesTab = window.open(BETTING_RULES, LINK_NAME, windowFeatures);
        } else {
            referredRulesTab.focus();
        }
    };

    return (
        <S_SystemInfoLink onClick={onTabLinkClick}>
            <InfoOutlineIcon
                fontSize='small'
                color={isDisabled ? cssColor('--text-secondary') : cssColor('--body-text')}
            />
        </S_SystemInfoLink>
    );
};

export default SystemInfoLink;
