import { Box } from '@mui/material';
import { useAtomValue } from 'jotai';
import { observer } from 'mobx-react-lite';

import type { EventModel } from 'src/appState/models/models/EventModel';
import { uniformUrlSelectorFamily } from 'src/store/uniforms/selectors';

import Pitcher from '../Pitcher/Pitcher';
import { usePareTruncation } from '../TooltipTruncatedText/useTooltipTruncatedText';

import { S_AmericanFormat, S_Participant, S_ParticipantName, S_PitcherWrapper, TeamShirt } from './styled';

const Participants = ({ event }: { event: EventModel }) => {
    const {
        homeParticipant,
        awayParticipant,
        homeParticipantUniform,
        awayParticipantUniform,
        hasAmericanFormat,
        pitchers,
    } = event;

    const homeUrl = useAtomValue(uniformUrlSelectorFamily(homeParticipantUniform));
    const awayUrl = useAtomValue(uniformUrlSelectorFamily(awayParticipantUniform));
    const hasUniform = homeUrl !== undefined && awayUrl !== undefined;

    const [title, homeRef, awayRef] = usePareTruncation(`${homeParticipant}\n${awayParticipant}`);

    return (
        <div title={title}>
            <S_Participant data-testid={`participant-${homeParticipant}`}>
                {hasUniform && <TeamShirt src={homeUrl} />}
                <Box
                    ref={homeRef}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <S_ParticipantName title={homeParticipant}>{homeParticipant}</S_ParticipantName>
                </Box>
                {pitchers?.home && (
                    <S_PitcherWrapper hasUniform={hasUniform}>
                        <Pitcher type={'home'} pitchers={pitchers} />
                    </S_PitcherWrapper>
                )}

                {hasAmericanFormat && <S_AmericanFormat>{' @'}</S_AmericanFormat>}
            </S_Participant>

            <S_Participant data-testid={`participant-${awayParticipant}`}>
                {hasUniform && <TeamShirt src={awayUrl} />}
                <Box
                    ref={awayRef}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <S_ParticipantName title={awayParticipant}>{awayParticipant}</S_ParticipantName>
                </Box>
                {pitchers?.away && (
                    <S_PitcherWrapper hasUniform={hasUniform}>
                        <Pitcher type={'away'} pitchers={pitchers} />
                    </S_PitcherWrapper>
                )}
            </S_Participant>

            {homeParticipant === null && (
                <S_Participant>
                    <span>{event.name}</span>
                </S_Participant>
            )}
        </div>
    );
};

export default observer(Participants);
