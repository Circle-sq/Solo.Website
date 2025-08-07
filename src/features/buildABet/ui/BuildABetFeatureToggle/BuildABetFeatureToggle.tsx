import isNil from 'lodash/isNil';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { useBuildABetState } from '@sc-buildABet/hooks/useBuildABetState';
import { useToggleBuildABet } from '@sc-buildABet/hooks/useToggleBuildABet';
import { enabledBuildABetIdsAtom } from '@sc-buildABet/store/atoms';
import { BuildABetIcon } from '@sc-buildABet/ui';

import { useAppStateContext } from 'src/appState/AppState';
import { removeId } from 'src/common/recoil/updaters';
import useMatchCardMarkets from 'src/ui/events/hooks/useMatchCardMarkets';

import {
    S_BuildABetFeatureToggle,
    S_BuildABetIcon,
    S_BuildABetLabel,
    S_BuildABetToggleLabel,
    S_Input,
    S_Slider,
    S_Switch,
} from './styled';

const allMarketTab = '-2';
const minMarketAvailable = 2;

const BuildABetFeatureToggle = ({ eventId }: { eventId: number }) => {
    const { isAvailable, isEnabled } = useBuildABetState(eventId);
    const { toggleBuildABetFeature } = useToggleBuildABet();

    const setEnabledBuildABetIds = useSetRecoilState(enabledBuildABetIdsAtom);
    const { buildABetMarketCount } = useMatchCardMarkets(eventId);

    const {
        router,
        language: { getTranslation },
    } = useAppStateContext();

    useEffect(() => {
        if (!isAvailable && !isNil(eventId)) {
            setEnabledBuildABetIds(removeId(eventId));
        }
    }, [isAvailable, eventId, setEnabledBuildABetIds]);

    if (!isAvailable) {
        return null;
    }

    const label = isEnabled
        ? getTranslation('betbuilder.toggle.activated', 'Bet Builder Activated')
        : getTranslation('betbuilder.toggle.deactivated', 'Activate Bet Builder');

    const redirectToAll = () => {
        const { params } = router.route;

        const shouldRedirectToAllMarketTab =
            params?.market === allMarketTab || isEnabled || buildABetMarketCount >= minMarketAvailable;

        if (shouldRedirectToAllMarketTab) {
            return;
        }

        router.redirect(null, { ...params, market: allMarketTab });
    };

    const handleToggle = () => {
        redirectToAll();
        toggleBuildABetFeature(eventId);
    };

    return (
        <S_BuildABetFeatureToggle checked={isEnabled}>
            <S_BuildABetIcon>
                <BuildABetIcon />
            </S_BuildABetIcon>

            <S_BuildABetToggleLabel>
                <S_BuildABetLabel>{label}</S_BuildABetLabel>
            </S_BuildABetToggleLabel>

            <div>
                <S_Switch>
                    <S_Slider checked={isEnabled} />
                    <S_Input
                        data-testid='buildABet-feature-toggle'
                        defaultChecked={isEnabled}
                        onChange={handleToggle}
                        type='checkbox'
                    />
                </S_Switch>
            </div>
        </S_BuildABetFeatureToggle>
    );
};

export default BuildABetFeatureToggle;
