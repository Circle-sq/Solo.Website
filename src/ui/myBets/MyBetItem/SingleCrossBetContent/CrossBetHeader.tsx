import { CrossBetIcon } from '@sc-ui/icons/svg';

import type { BetStatus } from 'src/common/enums';
import type { MyCrossBetLeg } from 'src/common/types/myBet';
import { I18n } from 'src/ui/common/Language/I18n';
import BetSelectionStatus from 'src/ui/myBets/MyBetItem/SelectionStatus/SelectionStatus';
import { S_BetHeaderMain, S_BetHeaderRow, S_BetHeaderTitle, VerticalDivider } from 'src/ui/myBets/MyBetItem/styled';

import { S_CrossBetHeaderText, S_CrossBetStatus, S_MarginBox } from './styled';

const CrossBetHeader = ({ leg, betStatus }: { leg: MyCrossBetLeg; betStatus: BetStatus }) => {
    const { sport, competition } = leg;

    return (
        <S_BetHeaderRow>
            <S_BetHeaderMain>
                <S_BetHeaderTitle data-testid='betType'>
                    <S_MarginBox>
                        <CrossBetIcon />
                    </S_MarginBox>
                    <I18n langKey='header.crossbetting.label' defaultText='Cross Bet' />
                </S_BetHeaderTitle>

                <VerticalDivider />

                <S_CrossBetHeaderText data-testid='betHeaderText' title={`${sport.name}, ${competition.name}`}>
                    {`${sport.name}, ${competition.name}`}
                </S_CrossBetHeaderText>

                <S_CrossBetStatus>
                    <BetSelectionStatus status={betStatus} />
                </S_CrossBetStatus>
            </S_BetHeaderMain>
        </S_BetHeaderRow>
    );
};

export default CrossBetHeader;
