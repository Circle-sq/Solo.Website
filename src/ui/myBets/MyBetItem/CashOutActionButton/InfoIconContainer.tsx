import type { MouseEvent } from 'react';

import { InfoOutlineIcon } from '@solo-ui/icons/svg';
import { DarkBluePalette } from '@solo-ui/system';

import { InfoIconWrapper, S_IconLink } from 'src/ui/myBets/MyBetItem/styled';
import { useBettingRules } from 'src/features/betting-rules/hooks/useBettingRules';

const InfoIconContainer = () => {
    const { openBettingRules } = useBettingRules();

    const onIconLinkClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        openBettingRules();
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
