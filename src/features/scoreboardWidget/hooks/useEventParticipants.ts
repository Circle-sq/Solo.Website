import { useAtomValue } from 'jotai';
import get from 'lodash/get';
import { useCallback, useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { uniformUrlSelectorFamily } from 'src/store/uniforms/selectors';

import { getTeamByType } from '../helpers';

const useEventParticipants = (eventId: number) => {
    const { models } = useAppStateContext();

    const event = models.getEvent(Number(eventId));

    const getTeamData = useCallback(
        (side: 'home' | 'away') => {
            const team = event?.participants ? getTeamByType(event?.participants, side) : undefined;

            return {
                name: team?.name ?? '-',
                uniformUrl: get(team, 'tags.uniformUrl[0]', ''),
            };
        },
        [event],
    );

    const homeTeam = useMemo(() => getTeamData('home'), [getTeamData]);
    const awayTeam = useMemo(() => getTeamData('away'), [getTeamData]);

    const homeUrl = useAtomValue(uniformUrlSelectorFamily(homeTeam.uniformUrl));
    const awayUrl = useAtomValue(uniformUrlSelectorFamily(awayTeam.uniformUrl));

    const participants = event?.participants;

    return {
        participants,
        homeTeamName: homeTeam.name,
        awayTeamName: awayTeam.name,
        isWithUniform: homeUrl !== undefined && awayUrl !== undefined,
        homeUniformUrl: homeUrl,
        awayUniformUrl: awayUrl,
    };
};

export default useEventParticipants;
