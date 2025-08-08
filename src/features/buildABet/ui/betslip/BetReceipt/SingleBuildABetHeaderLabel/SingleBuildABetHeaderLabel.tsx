import { BuildABetIcon } from '@solo-buildABet/ui';

import { I18n } from 'src/ui/common/Language/I18n';

import { S_SingleBuildABetHeader } from '../styled';

const SingleBuildABetHeaderLabel = () => (
    <S_SingleBuildABetHeader data-testid='headerTitle'>
        <BuildABetIcon />
        <I18n langKey='header.buildabet.label' defaultText='Build A Bet' />
    </S_SingleBuildABetHeader>
);

export default SingleBuildABetHeaderLabel;
