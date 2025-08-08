import { useWindowWidth } from '@solo-hooks';
import size from 'lodash/size';
import { observer } from 'mobx-react-lite';
import { useRecoilValue } from 'recoil';

import EventGroupHeader from 'src/ui/events/EventGroupHeader/EventGroupHeader';
import { sportTemplateOptionsSelectorFamily } from 'src/ui/events/store/selectors/marketTemplates';
import { NUMBERS } from 'src/utils/constants';

import { S_HeaderResponsiveContainer } from '../styled';

import DesktopHeaderView from './components/DesktopHeaderView';
import MobileLandscapeHeaderView from './components/MobileLandscapeHeaderView';

interface Props {
    sportId: string;
    columns: number;
    selected: string[];
    onChangeSelect: (selected: string, index?: number) => void;
    isAmericanSports: boolean;
    isScoreboardSport: boolean;
    collectionId: string;
    selectionsSizes: number[];
    showSort: boolean;
    showHeader?: boolean;
    columnLabelsGroups: string[][];
}

const EventsListHeader = ({
    sportId,
    columns,
    selected,
    onChangeSelect,
    isAmericanSports,
    isScoreboardSport,
    collectionId,
    selectionsSizes,
    showSort,
    columnLabelsGroups,
    showHeader = false,
}: Props) => {
    const { isMobileLandscape } = useWindowWidth();

    const sportTemplateOptions = useRecoilValue(sportTemplateOptionsSelectorFamily(sportId));
    const hasSportTemplateOptions = size(sportTemplateOptions) >= NUMBERS.two;

    return (
        <S_HeaderResponsiveContainer
            isShowSortOrHeader={showSort || showHeader}
            hasSportTemplateOptions={hasSportTemplateOptions}
        >
            {isMobileLandscape ? (
                <MobileLandscapeHeaderView
                    sportId={sportId}
                    showSort={showSort}
                    selected={selected}
                    showHeader={showHeader}
                    collectionId={collectionId}
                    onChangeSelect={onChangeSelect}
                    sportTemplateOptions={sportTemplateOptions}
                />
            ) : (
                <DesktopHeaderView
                    sportId={sportId}
                    columns={columns}
                    selected={selected}
                    showSort={showSort}
                    showHeader={showHeader}
                    collectionId={collectionId}
                    onChangeSelect={onChangeSelect}
                    selectionsSizes={selectionsSizes}
                    isAmericanSports={isAmericanSports}
                    isScoreboardSport={isScoreboardSport}
                />
            )}
            <EventGroupHeader
                testId='marketHeader'
                sportId={sportId}
                columnLabelsGroups={columnLabelsGroups}
                selectionsSizes={selectionsSizes}
                showSelections
                hideChevron
                isOpen
            />
        </S_HeaderResponsiveContainer>
    );
};

export default observer(EventsListHeader);
