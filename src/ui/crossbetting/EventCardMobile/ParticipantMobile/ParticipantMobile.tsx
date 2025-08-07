import Box from '@mui/material/Box';
import { useWindowWidth } from '@sc-hooks';
import { useAtomValue } from 'jotai';

import type { EventModel } from 'src/appState/models/models/EventModel';
import { uniformUrlSelectorFamily } from 'src/store/uniforms/selectors';
import Pitcher from 'src/ui/common/Pitcher/Pitcher';
import {
    S_ParticipantMobile,
    S_ParticipantTitleMobile,
    S_PitcherMobileEndWrapper,
    S_PitcherMobileWrapper,
    S_VersusSeparator,
} from 'src/ui/crossbetting/EventCardMobile/ParticipantMobile/styled';

import ParticipantImage from '../ParticipantImage/ParticipantImage';

const mobileIconSize = 28;
const desktopIconSize = 44;

export interface Props {
    event: EventModel;
}

const ParticipantMobile = ({
    event: { homeParticipant, homeParticipantUniform, awayParticipantUniform, awayParticipant, pitchers },
}: Props) => {
    const { isMobile } = useWindowWidth();
    const homeUrl = useAtomValue(uniformUrlSelectorFamily(homeParticipantUniform));
    const awayUrl = useAtomValue(uniformUrlSelectorFamily(awayParticipantUniform));
    const hasUniform = homeUrl !== undefined && awayUrl !== undefined;

    const iconWidth = isMobile ? mobileIconSize : desktopIconSize;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '0 8px',
                flexWrap: 'nowrap',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '8px',
                    paddingRight: isMobile ? 0 : '5px',
                    flex: '1',
                    maxWidth: isMobile ? '45%' : '48%',
                }}
            >
                {Boolean(homeParticipant) && (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                width: `calc(100% - ${iconWidth}px)`,
                                gap: isMobile ? 0 : '8px',
                            }}
                        >
                            <S_ParticipantMobile data-testid='homeParticipant'>
                                <S_ParticipantTitleMobile title={homeParticipant}>
                                    {homeParticipant}
                                </S_ParticipantTitleMobile>
                            </S_ParticipantMobile>
                            {pitchers?.home && (
                                <S_PitcherMobileEndWrapper isWithUniform={hasUniform}>
                                    <Pitcher type='home' iconPosition='right' pitchers={pitchers} />
                                </S_PitcherMobileEndWrapper>
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: '8px',
                            }}
                        >
                            {hasUniform && <ParticipantImage name={homeParticipant} url={homeUrl} />}
                        </Box>
                    </>
                )}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {Boolean(homeParticipant) && Boolean(awayParticipant) && <S_VersusSeparator>vs</S_VersusSeparator>}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: '8px',
                    paddingLeft: isMobile ? 0 : '5px',
                    flex: '1',
                    maxWidth: isMobile ? '45%' : '48%',
                }}
            >
                {Boolean(awayParticipant) && (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: '8px',
                            }}
                        >
                            {hasUniform && <ParticipantImage name={awayParticipant} url={awayUrl} />}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                width: `calc(100% - ${iconWidth}px)`,
                                gap: isMobile ? 0 : '8px',
                            }}
                        >
                            <S_ParticipantMobile data-testid='awayParticipant' away>
                                <S_ParticipantTitleMobile title={awayParticipant}>
                                    {awayParticipant}
                                </S_ParticipantTitleMobile>
                            </S_ParticipantMobile>
                            {pitchers?.away && (
                                <S_PitcherMobileWrapper isWithUniform={hasUniform}>
                                    <Pitcher type='away' pitchers={pitchers} invert />
                                </S_PitcherMobileWrapper>
                            )}
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default ParticipantMobile;
