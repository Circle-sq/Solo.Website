import { useLazyEffect } from '@sc-hooks';
import { useRef, useState } from 'react';

import { useChangeBetslipSettings } from '@sc-account/api/mutations';

import { BetslipOdds } from 'src/common/enums';
import type { Timeout } from 'src/utils/hooks/useTimer/types';

import { Input, Slider, Switch } from './styled';

const ODDS_UPDATE_DELAY = 1000;

const SwitchButton = () => {
    const timeout = useRef<Timeout | null>(null);

    const [betslipOdds, setBetslipOdds] = useState<BetslipOdds>();

    const isAcceptedOddsUpdate = betslipOdds === BetslipOdds.AcceptOdds;

    const onOddsUpdateChange = () => {
        setBetslipOdds(isAcceptedOddsUpdate ? BetslipOdds.DontAcceptOdds : BetslipOdds.AcceptOdds);
    };

    const { mutate: changeBetslipSettings } = useChangeBetslipSettings();

    useLazyEffect(() => {
        if (betslipOdds !== undefined) {
            timeout.current = setTimeout(() => {
                changeBetslipSettings({ oddsUpdate: betslipOdds });
            }, ODDS_UPDATE_DELAY);
        }

        return () => {
            if (timeout.current !== null) {
                clearTimeout(timeout.current);
            }
        };
    }, [betslipOdds]);

    return (
        <Switch>
            <Slider checked={isAcceptedOddsUpdate} />
            <Input onChange={onOddsUpdateChange} type='checkbox' />
        </Switch>
    );
};

export default SwitchButton;
