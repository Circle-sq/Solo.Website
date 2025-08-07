import BettingMedia from '@sc-media/ui/container/BettingMedia';

import CustomScrollbar from 'src/ui/common/CustomScrollbar';
import { useFetchStreams } from 'src/ui/layouts/InPlay/hooks/useFetchStreams';
import { useGetContentIcons } from 'src/ui/layouts/InPlay/hooks/useGetContentIcons';

import { sidebarScrollbar } from '../configs';

import Filters from './filters/Filters';
import LeftHandNavigation from './lhn/LeftHandNavigation';
import SportList from './sports/SportList';
import { S_AsianViewBody, S_AsianViewWrapper, S_Aside, S_SportList } from './styled';

const AsianViewPage = () => {
    useFetchStreams();
    useGetContentIcons();

    return (
        <S_AsianViewWrapper>
            <S_AsianViewBody>
                <S_Aside>
                    <CustomScrollbar verticalBarPosition={sidebarScrollbar.verticalBarPosition}>
                        <BettingMedia />
                        <LeftHandNavigation />
                    </CustomScrollbar>
                </S_Aside>

                <S_SportList>
                    <Filters />
                    <SportList />
                </S_SportList>
            </S_AsianViewBody>
        </S_AsianViewWrapper>
    );
};

export default AsianViewPage;
