import some from 'lodash/some';
import { forwardRef, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { SpeedBetStatus } from 'src/features/scoreboardWidget/enums';

import { speedBetMarketsAtom, speedBetSelectedMarketAtom } from '../../../store/atoms';
import SpeedBetBetslip from '../SpeedBetBetslip/SpeedBetBetslip';
import SpeedBetCards from '../SpeedBetCards/SpeedBetCards';
import { isMarketVisible } from '../SpeedBetCards/utils';

import ErrorWrapper from './ErrorWrapper/ErrorWrapper';
import SpeedBetAlert from './SpeedBetAlert/SpeedBetAlert';
import { S_SpeedBetBetslipWrapper } from './styled';

interface Props {
    isActiveEvent: boolean;
}

const SpeedBetBetslipWrapper = forwardRef<HTMLDivElement, Props>(({ isActiveEvent }, ref) => {
    const selectedMarket = useRecoilValue(speedBetSelectedMarketAtom);
    const speedBetMarkets = useRecoilValue(speedBetMarketsAtom);

    const hasVisibleMarkets = useMemo(() => some(speedBetMarkets.markets, isMarketVisible), [speedBetMarkets.markets]);

    const renderContent = () => {
        if (selectedMarket !== null && isActiveEvent) {
            return <SpeedBetBetslip />;
        }

        if (hasVisibleMarkets && isActiveEvent) {
            return <SpeedBetCards />;
        }

        return <ErrorWrapper type={SpeedBetStatus.NotAvailable} />;
    };

    return (
        <S_SpeedBetBetslipWrapper ref={ref}>
            <SpeedBetAlert />
            {renderContent()}
        </S_SpeedBetBetslipWrapper>
    );
});

SpeedBetBetslipWrapper.displayName = 'SpeedBetBetslipWrapper';

export default SpeedBetBetslipWrapper;
