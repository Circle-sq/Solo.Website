import { BuildABetIcon } from '@sc-buildABet/ui';
import { S_BuildABetContentItem } from '@sc-buildABet/ui/myBet/styled';

import type { EventModel } from 'src/appState/models/models/EventModel';
import type { BetStatus } from 'src/common/enums';
import type { MyBuildABetLeg } from 'src/common/types/myBet';
import BetContentLink from 'src/ui/myBets/MyBetItem/BetContentLink/BetContentLink';
import { S_BetLegDivider } from 'src/ui/myBets/MyBetItem/MultipleBetContent/styled';
import { BAB_ICON_SIZES } from 'src/utils/constants';

import BuildABetInfo from '../BuildABetInfo/BuildABetInfo';

interface Props {
    leg: MyBuildABetLeg;
    event: EventModel | null;
    betStatus: BetStatus;
    isLastLeg: boolean;
    isSettledBet: boolean;
}

const { width, height } = BAB_ICON_SIZES.xs;

const MultipleBuildABetContent = ({ leg, event, betStatus, isLastLeg, isSettledBet }: Props) => {
    const { id: eventId, name: eventName = '' } = leg.event;

    const isDisplayed = event?.display ?? false;
    const isDisabled = !isDisplayed || isSettledBet;

    return (
        <S_BuildABetContentItem data-testid={`myBets-eventId-${eventId}`}>
            <BetContentLink eventId={eventId} eventName={eventName} disabled={isDisabled}>
                <BuildABetInfo leg={leg} event={event} betStatus={betStatus}>
                    <BuildABetIcon width={width} height={height} />
                </BuildABetInfo>

                {/* TODO Replace with Css last element */}
                {isLastLeg && <S_BetLegDivider />}
            </BetContentLink>
        </S_BuildABetContentItem>
    );
};

export default MultipleBuildABetContent;
