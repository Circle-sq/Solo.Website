import type { PlacedBetLeg } from '../../../../../api/types/placedBet';
import FreeBetBadge from '../../../../freeBet/badge/FreeBetBadge';
import { VerticalDivider } from '../../../../styled';
import { S_SingleBetHeader, S_SingleBetHeaderLabel, S_SingleBetHeaderText, S_SingleBetHeaderWrapper } from '../styled';

import SingleBetHeaderLabel from './SingleBetHeaderLabel';

const SingleBetHeader = ({ leg }: { leg: PlacedBetLeg }) => {
    const { type: legType, competition, sport, isFreeBet = false } = leg;

    return (
        <S_SingleBetHeader>
            <S_SingleBetHeaderWrapper>
                <S_SingleBetHeaderLabel data-testid='headerTitle'>
                    <SingleBetHeaderLabel legType={legType} />
                </S_SingleBetHeaderLabel>

                <VerticalDivider />

                <S_SingleBetHeaderText data-testid='headerText' title={`${sport.name}, ${competition.name}`}>
                    {`${sport.name}, ${competition.name}`}
                </S_SingleBetHeaderText>
            </S_SingleBetHeaderWrapper>

            {isFreeBet && <FreeBetBadge />}
        </S_SingleBetHeader>
    );
};

export default SingleBetHeader;
