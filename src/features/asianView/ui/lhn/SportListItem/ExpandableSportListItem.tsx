import { useAtomValue } from 'jotai';
import some from 'lodash/some';
import { useState } from 'react';

import { toggleState } from 'src/common/helpers/state';
import { I18n } from 'src/ui/common/Language/I18n';

import { LHNTimeTab } from '../../../enums';
import { isESports } from '../../../helpers';
import ArrowDownIcon from '../../../icons/ArrowDownIcon';
import ArrowUpIcon from '../../../icons/ArrowUpIcon';
import ESportsIcon from '../../../icons/ESportsIcon';
import { lhnSportAtom, lhnTimeTabAtom } from '../../../store/lhn';
import type { ESports } from '../../../types';

import SportListItem from './SportListItem';
import {
    S_ExpandableSportListItem,
    S_NavIconWrapper,
    S_NavSportName,
    S_NavListItemContentWrapper,
    S_NavLiveIndicator,
    S_NavEventCounter,
    S_ExpandArrowWrapper,
    S_NavListItemCounterWrapper,
} from './styled';

interface Props {
    eSports: ESports;
}

const ExpandableSportListItem = ({ eSports }: Props) => {
    const lhnSport = useAtomValue(lhnSportAtom);
    const lhnTimeTab = useAtomValue(lhnTimeTabAtom);

    const [isExpanded, setIsExpanded] = useState(some(eSports.sports, { id: lhnSport }));

    const highlightESports = !isExpanded && isESports(lhnSport);
    const showLiveLabel = lhnTimeTab === LHNTimeTab.Today && eSports.hasLiveSports;

    const toggleIsExpanded = () => {
        setIsExpanded(toggleState);
    };

    return (
        <>
            <S_ExpandableSportListItem highlightESports={highlightESports} onClick={toggleIsExpanded}>
                <S_NavListItemContentWrapper>
                    <S_NavIconWrapper>
                        <ESportsIcon />
                    </S_NavIconWrapper>
                    <S_NavSportName>
                        <I18n langKey='asianView.sports.eSports' defaultText='E-Sports' />
                    </S_NavSportName>
                </S_NavListItemContentWrapper>
                <S_NavListItemContentWrapper>
                    {showLiveLabel && (
                        <S_NavLiveIndicator>
                            {<I18n langKey='live.bar.link.live' defaultText='Live' />}
                        </S_NavLiveIndicator>
                    )}
                    <S_NavListItemCounterWrapper>
                        <S_NavEventCounter>{eSports.totalCount}</S_NavEventCounter>
                        <S_ExpandArrowWrapper>{isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}</S_ExpandArrowWrapper>
                    </S_NavListItemCounterWrapper>
                </S_NavListItemContentWrapper>
            </S_ExpandableSportListItem>
            {isExpanded &&
                eSports.sports.map((sport) => {
                    return <SportListItem key={sport.id} sport={sport} isSecondLevel={isExpanded} />;
                })}
        </>
    );
};

export default ExpandableSportListItem;
