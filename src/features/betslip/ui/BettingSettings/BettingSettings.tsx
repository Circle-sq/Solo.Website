import { useAtomValue } from 'jotai';
import { useRecoilCallback } from 'recoil';

import { useChangeBetslipSettings } from '@sc-account/api/mutations';
import { cashoutAcceptModeSelector, oddsUpdateSelector } from '@sc-account/store/selectors';

import CloseIcon from 'src/assets/icons/BeslipClose';
import { BetslipCashout, BetslipOdds } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';
import RadioButton from 'src/ui/common/RadioButton/RadioButton';

import { closeBettingSettingsPopupTask } from '../../store/tasks/betslip';

import {
    S_BettingSettings,
    S_BettingSettingsContent,
    S_ButtonClose,
    S_Gap,
    S_Header,
    S_Option_Subtitle,
    S_Options,
} from './styled';

const BettingSettings = () => {
    const oddsUpdate = useAtomValue(oddsUpdateSelector);
    const cashoutAcceptMode = useAtomValue(cashoutAcceptModeSelector);

    const closeBettingSettingsPopup = useRecoilCallback(closeBettingSettingsPopupTask, []);

    const { mutate: changeBetslipSettings } = useChangeBetslipSettings();

    return (
        <S_BettingSettings>
            <S_BettingSettingsContent>
                <S_Header>
                    <I18n langKey='betslip.settings.title' defaultText='Betting settings' />
                    <S_ButtonClose onClick={closeBettingSettingsPopup} testId='hideSettings'>
                        <CloseIcon />
                    </S_ButtonClose>
                </S_Header>

                <S_Options height={'140px'}>
                    <RadioButton
                        name='bettingSettings'
                        value='accept-odds'
                        checked={oddsUpdate === BetslipOdds.AcceptOdds}
                        label={<I18n langKey='betslip.settings.accept-odds' defaultText='Accept any odds' />}
                        onChangeValue={() => changeBetslipSettings({ oddsUpdate: BetslipOdds.AcceptOdds })}
                    />
                    <S_Option_Subtitle>
                        <I18n
                            langKey='betslip.settings.accept-odds-note'
                            defaultText='Fastest live betting experience'
                        />
                    </S_Option_Subtitle>

                    <RadioButton
                        name='bettingSettings'
                        value='accept-higher-odds'
                        checked={oddsUpdate === BetslipOdds.AcceptHigherOdds}
                        label={<I18n langKey='betslip.settings.accept-higher-odds' defaultText='Accept higher odds' />}
                        onChangeValue={() => changeBetslipSettings({ oddsUpdate: BetslipOdds.AcceptHigherOdds })}
                    />
                    <S_Gap />

                    <RadioButton
                        name='bettingSettings'
                        value='dont-accept-odds'
                        checked={oddsUpdate === BetslipOdds.DontAcceptOdds}
                        label={
                            <I18n langKey='betslip.settings.dont-accept-odds' defaultText='Don’t accept odds changes' />
                        }
                        onChangeValue={() => changeBetslipSettings({ oddsUpdate: BetslipOdds.DontAcceptOdds })}
                    />
                </S_Options>
                <S_Header>
                    <I18n langKey='betslip.settings.cashoutTitle' defaultText='Cashout settings' />
                </S_Header>
                <S_Options height={'auto'}>
                    <RadioButton
                        name='cashoutSettings'
                        value='accept-higher-cashout'
                        checked={cashoutAcceptMode === BetslipCashout.HigherCashout}
                        label={
                            <I18n
                                langKey='betslip.settings.accept-higher-cashout'
                                defaultText='Accept higher cashout'
                            />
                        }
                        onChangeValue={() => changeBetslipSettings({ cashoutAcceptMode: BetslipCashout.HigherCashout })}
                    />
                    <RadioButton
                        name='cashoutSettings'
                        value='accept-any-cashout'
                        checked={cashoutAcceptMode === BetslipCashout.AnyCashout}
                        label={<I18n langKey='betslip.settings.accept-any-cashout' defaultText='Accept any cashout' />}
                        onChangeValue={() => changeBetslipSettings({ cashoutAcceptMode: BetslipCashout.AnyCashout })}
                    />
                </S_Options>
            </S_BettingSettingsContent>
        </S_BettingSettings>
    );
};

export default BettingSettings;
