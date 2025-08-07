import type { BetStatus } from 'src/common/enums';
import type { MyStandardBetLeg } from 'src/common/types/myBet';
import { I18n } from 'src/ui/common/Language/I18n';
import BetSelectionStatus from 'src/ui/myBets/MyBetItem/SelectionStatus/SelectionStatus';
import { VerticalDivider } from 'src/ui/myBets/MyBetItem/styled';

import { S_StandardBetHeader, S_StandardBetHeaderTitle, S_StandardBetHeaderText } from './styled';

const StandardBetHeader = ({ leg, betStatus }: { leg: MyStandardBetLeg; betStatus: BetStatus }) => {
    const { sport, competition } = leg;

    return (
        <S_StandardBetHeader>
            <S_StandardBetHeaderTitle data-testid='betType'>
                <I18n langKey='betslip.selection.single-bet.label' defaultText='Single Bet' />
            </S_StandardBetHeaderTitle>

            <VerticalDivider />

            <S_StandardBetHeaderText data-testid='betHeaderText' title={`${sport.name}, ${competition.name}`}>
                {`${sport.name}, ${competition.name}`}
            </S_StandardBetHeaderText>

            <BetSelectionStatus status={betStatus} />
        </S_StandardBetHeader>
    );
};

export default StandardBetHeader;
