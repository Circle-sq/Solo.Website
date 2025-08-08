import { useAtomValue } from 'jotai';
import map from 'lodash/map';

import { LHNTimeTab } from '@solo-asianView/enums';

import { I18n } from 'src/ui/common/Language/I18n';

import { lhnSportAtom, lhnTimeTabAtom } from '../../../store/lhn';
import { sportConfigAtom } from '../../../store/sportConfig';

import {
    S_HeaderGrid,
    S_HeaderGridLive,
    S_HeaderItemGrid,
    S_NameHeader,
    S_OddsHeader,
    S_TableSubHead,
    S_TableSubHeadLive,
    S_TimeHeader,
} from './styled';

const SportConfigHeader = () => {
    const lhnSport = useAtomValue(lhnSportAtom);
    const sportConfig = useAtomValue(sportConfigAtom);
    const lhnTimeTab = useAtomValue(lhnTimeTabAtom);

    const isLiveTab = lhnTimeTab === LHNTimeTab.Live;

    if (sportConfig == null) {
        return null;
    }

    const baseLangKey = `asianView.tableConfig.${lhnSport}`;
    const { event: eventType, primaryGroup, secondaryGroup, startTime } = sportConfig;

    const TableSubHead = isLiveTab ? S_TableSubHeadLive : S_TableSubHead;
    const HeaderGrid = isLiveTab ? S_HeaderGridLive : S_HeaderGrid;

    return (
        <TableSubHead>
            <S_TimeHeader>
                <I18n langKey={`${baseLangKey}.column1.name`} defaultText={startTime} />
            </S_TimeHeader>

            <S_NameHeader>
                <I18n langKey={`${baseLangKey}.column2.name`} defaultText={eventType} />
            </S_NameHeader>

            <S_OddsHeader>
                <HeaderGrid>
                    <I18n langKey={`${baseLangKey}.primaryGroup.name`} defaultText={primaryGroup.name} />
                </HeaderGrid>

                {map(primaryGroup.markets, (market, i) => (
                    <S_HeaderItemGrid key={`primary-${market.id}-${market.order}`}>
                        <I18n langKey={`${baseLangKey}.primaryGroup.market${i}`} defaultText={market.name} />
                    </S_HeaderItemGrid>
                ))}
            </S_OddsHeader>

            <S_OddsHeader>
                <HeaderGrid>
                    <I18n langKey={`${baseLangKey}.secondaryGroup.name`} defaultText={secondaryGroup.name} />
                </HeaderGrid>

                {map(secondaryGroup.markets, (market, i) => (
                    <S_HeaderItemGrid key={`secondary-${market.id}-${market.order}`}>
                        <I18n langKey={`${baseLangKey}.secondaryGroup.market${i}`} defaultText={market.name} />
                    </S_HeaderItemGrid>
                ))}
            </S_OddsHeader>
        </TableSubHead>
    );
};

export default SportConfigHeader;
