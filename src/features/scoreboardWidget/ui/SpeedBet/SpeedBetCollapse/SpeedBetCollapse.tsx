import { useWindowWidth } from '@solo-hooks';
import find from 'lodash/find';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { SpeedBetIcon, DownArrowIcon, UpArrowIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { I18n } from 'src/ui/common/Language/I18n';

import { useSpeedMarketTranslations } from '../../../hooks/useSpeedMarketTranslations';
import { speedBetMarketsAtom } from '../../../store/atoms';
import { isMarketVisible } from '../SpeedBetCards/utils';

import MarketLabel from './MarketLabel';
import { S_SpeedBetCollapse, S_SpeedBetLabel, S_ToggleButton } from './styled';

interface Props {
    isOpen: boolean;
    isToggleEnabled: boolean;
    handleToggleButton: () => void;
}

const SpeedBetCollapse = ({ isOpen, isToggleEnabled, handleToggleButton }: Props) => {
    const { isTablet } = useWindowWidth();

    const speedBetMarkets = useRecoilValue(speedBetMarketsAtom);

    const firstVisibleMarket = useMemo(() => find(speedBetMarkets.markets, isMarketVisible), [speedBetMarkets.markets]);

    const { marketName } = useSpeedMarketTranslations(firstVisibleMarket);

    const displayMarketLabel = !isTablet && !isOpen;

    return (
        <S_SpeedBetCollapse onClick={handleToggleButton} data-testid='speedBetCollapse'>
            <S_SpeedBetLabel>
                <I18n langKey='speedBet.tabs.speedBet' defaultText='Speed bet' />
            </S_SpeedBetLabel>
            <SpeedBetIcon />

            {displayMarketLabel && (
                <MarketLabel>
                    {marketName ?? (
                        <>
                            <I18n langKey='speedBet.error.nextSpeedBet' defaultText='Next speed bet' />{' '}
                            <I18n langKey='speedBet.error.commingSoon' defaultText='is coming soon' />
                        </>
                    )}
                </MarketLabel>
            )}

            {isToggleEnabled && (
                <S_ToggleButton>
                    {isOpen ? (
                        <UpArrowIcon color={cssColor('--icon-generic-color')} />
                    ) : (
                        <DownArrowIcon color={cssColor('--icon-generic-color')} />
                    )}
                </S_ToggleButton>
            )}
        </S_SpeedBetCollapse>
    );
};

export default SpeedBetCollapse;
