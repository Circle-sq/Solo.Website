import type { MouseEvent } from 'react';

import { InfoOutlineIcon } from '@solo-ui/icons/svg';
import { DarkBluePalette } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import { isStandalone } from 'src/infra.client';
import { InfoIconWrapper, S_IconLink } from 'src/ui/myBets/MyBetItem/styled';

const SOLO_BETTING_RULE_URL = 'https://rule.solo.com/?id=362';
const windowFeatures = 'width=1024, height=750';

const InfoIconContainer = () => {
    const {
        language: { userLangShort },
    } = useAppStateContext();

    let referredRulesTab: null | Window = null;

    const standalone = isStandalone();

    const EXTERNAL_BETTING_RULE_URL = `https://www.external.io/${userLangShort}/legal-documents/jhGpFgXdDju8OnbdhDdy`;

    const onIconLinkClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (referredRulesTab == null || referredRulesTab.closed) {
            const url = standalone ? EXTERNAL_BETTING_RULE_URL : SOLO_BETTING_RULE_URL;

            referredRulesTab = window.open(url, '_blank', windowFeatures);
        } else {
            referredRulesTab.focus();
        }
    };

    return (
        <InfoIconWrapper>
            <S_IconLink onClick={onIconLinkClick} data-testid='cashoutInfo'>
                <InfoOutlineIcon fontSize='small' color={DarkBluePalette.darkBlue6} />
            </S_IconLink>
        </InfoIconWrapper>
    );
};

export default InfoIconContainer;
