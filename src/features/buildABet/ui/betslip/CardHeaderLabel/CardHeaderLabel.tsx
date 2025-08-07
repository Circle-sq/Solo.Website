import { BuildABetIcon } from '@sc-buildABet/ui';

import { I18n } from 'src/ui/common/Language/I18n';

import { S_BuildABetIcon } from './styled';

const CardHeaderLabel = () => {
    return (
        <>
            <S_BuildABetIcon>
                <BuildABetIcon />
            </S_BuildABetIcon>

            <I18n langKey='header.buildabet.label' defaultText='Build a Bet' />
        </>
    );
};

export default CardHeaderLabel;
