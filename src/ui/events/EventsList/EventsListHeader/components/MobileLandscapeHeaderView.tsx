import size from 'lodash/size';

import { S_Panel, S_FilterContainer, S_Header } from '../../styled';
import type { DropdownItem } from '../../types';

import DefaultHeader from './DefaultHeader';
import EventListSwiper from './EventListSwiper';
import SortControllerMobile from './SortControllerMobile';

interface Props {
    sportId: string;
    showSort: boolean;
    selected: string[];
    showHeader: boolean;
    collectionId: string;
    sportTemplateOptions: DropdownItem[];
    onChangeSelect: (selected: string, index?: number) => void;
}

const MobileLandscapeHeaderView = ({
    sportId,
    showHeader,
    showSort,
    selected,
    collectionId,
    onChangeSelect,
    sportTemplateOptions,
}: Props) => {
    return (
        <S_Panel>
            {showSort && (
                <S_FilterContainer>
                    <SortControllerMobile collectionId={collectionId} />
                </S_FilterContainer>
            )}
            {showHeader && (
                <S_Header showSort={showSort}>
                    <DefaultHeader sportId={sportId} />
                </S_Header>
            )}
            {size(sportTemplateOptions) > 1 && (
                <EventListSwiper options={sportTemplateOptions} onChange={onChangeSelect} selected={selected} />
            )}
        </S_Panel>
    );
};

export default MobileLandscapeHeaderView;
