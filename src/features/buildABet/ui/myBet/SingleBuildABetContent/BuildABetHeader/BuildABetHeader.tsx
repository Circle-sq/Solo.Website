import { BuildABetIcon } from '@sc-buildABet/ui';
import { S_BuildABetHeaderTitle } from '@sc-buildABet/ui/myBet/styled';

import type { BetStatus } from 'src/common/enums';
import type { MyBuildABetLeg } from 'src/common/types/myBet';
import { I18n } from 'src/ui/common/Language/I18n';
import { S_BetHeaderRow, VerticalDivider } from 'src/ui/myBets/MyBetItem/styled';
import BetSelectionStatus from 'src/ui/myBets/MyBetItem/SelectionStatus/SelectionStatus';

import { S_BuildABetHeaderText, S_BuildABetStatus } from './styled';

export const BuildABetHeader = ({ leg, betStatus }: { leg: MyBuildABetLeg; betStatus: BetStatus }) => {
    const { sport, competition } = leg;

    return (
        <S_BetHeaderRow>
            <S_BuildABetHeaderTitle data-testid='headerTitle'>
                <BuildABetIcon />
                <I18n langKey='header.buildabet.label' defaultText='build a bet' />
            </S_BuildABetHeaderTitle>

            <VerticalDivider />

            <S_BuildABetHeaderText data-testid='betHeaderText'>
                <span>{sport.name},&nbsp;</span>
                <span>{competition.name}</span>
            </S_BuildABetHeaderText>

            <S_BuildABetStatus>
                <BetSelectionStatus status={betStatus} />
            </S_BuildABetStatus>
        </S_BetHeaderRow>
    );
};

export default BuildABetHeader;
