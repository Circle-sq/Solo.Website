import Box from '@mui/material/Box';
import { cssColor } from '@solo-ui/system';
import { S_BuildABetContentItem } from '@solo-buildABet/ui/myBet/styled';

import { I18n } from 'src/ui/common/Language/I18n';
import type { EventModel } from 'src/appState/models/models/EventModel';
import type { BetStatus } from 'src/common/enums';
import type { MyBuildABetLeg } from 'src/common/types/myBet';
import BetContentLink from 'src/ui/myBets/MyBetItem/BetContentLink/BetContentLink';
import { S_BetLegDivider } from 'src/ui/myBets/MyBetItem/MultipleBetContent/styled';

import BuildABetInfo from '../BuildABetInfo/BuildABetInfo';

interface Props {
    leg: MyBuildABetLeg;
    event: EventModel | null;
    betStatus: BetStatus;
    isLastLeg: boolean;
    isSettledBet: boolean;
}

const MultipleBuildABetContent = ({ leg, event, betStatus, isLastLeg, isSettledBet }: Props) => {
    const { id: eventId, name: eventName = '' } = leg.event;

    const isDisplayed = event?.display ?? false;
    const isDisabled = !isDisplayed || isSettledBet;

    return (
        <S_BuildABetContentItem data-testid={`myBets-eventId-${eventId}`}>
            <BetContentLink eventId={eventId} eventName={eventName} disabled={isDisabled}>
                <BuildABetInfo leg={leg} event={event} betStatus={betStatus}>
                    <Box
                        sx={{
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            color: cssColor('--text-primary'),
                            fontStyle: 'italic',
                            fontWeight: '900',
                            mr: '2px',
                        }}
                    >
                        <I18n langKey='header.buildabet.label' defaultText='Build A Bet' />
                    </Box>
                </BuildABetInfo>

                {/* TODO Replace with Css last element */}
                {isLastLeg && <S_BetLegDivider />}
            </BetContentLink>
        </S_BuildABetContentItem>
    );
};

export default MultipleBuildABetContent;
