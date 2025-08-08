import { useRecoilValue } from 'recoil';

import BettingMedia from '@solo-media/ui/container/BettingMedia';

import CustomScrollbar from 'src/ui/common/CustomScrollbar';
import { useFetchStreams } from 'src/ui/layouts/InPlay/hooks/useFetchStreams';

import BettingTabs from './BettingTabs/BettingTabs';
import { showBackdropSelector } from './store/selectors';
import { Backdrop, S_Betting, S_BettingContent } from './styled';

const verticalBarPosition = {
    top: '16px',
};

const Betting = () => {
    const showBackdrop = useRecoilValue(showBackdropSelector);
    useFetchStreams();

    return (
        <S_Betting>
            <CustomScrollbar verticalBarPosition={verticalBarPosition}>
                <S_BettingContent>
                    {showBackdrop && <Backdrop />}

                    <BettingMedia />
                    <BettingTabs />
                </S_BettingContent>
            </CustomScrollbar>
        </S_Betting>
    );
};

export default Betting;
