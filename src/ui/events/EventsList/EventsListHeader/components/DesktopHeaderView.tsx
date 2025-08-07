import isNil from 'lodash/isNil';
import last from 'lodash/last';
import size from 'lodash/size';
import { useRecoilState, useRecoilValue } from 'recoil';

import { ThemeNames } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';
import { SORT_OPTIONS } from 'src/ui/events/EventsList/config';
import { sortCriteriaAtomFamily } from 'src/ui/events/store/atoms';
import { sportTemplateOptionsSelectorFamily } from 'src/ui/events/store/selectors/marketTemplates';
import { NUMBERS } from 'src/utils/constants';

import SortControllerDesktop from '../../SortControllerDesktop';
import {
    S_Panel,
    S_FilterContainer,
    S_Header,
    S_Label,
    S_GroupSelects,
    S_DropdownWrapper,
    MarketDropdown,
} from '../../styled';

import DefaultHeader from './DefaultHeader';

interface Props {
    sportId: string;
    columns: number;
    showSort: boolean;
    selected: string[];
    showHeader: boolean;
    collectionId: string;
    selectionsSizes: number[];
    isAmericanSports: boolean;
    isScoreboardSport: boolean;
    onChangeSelect: (selected: string, index?: number) => void;
}

const DesktopHeaderView = ({
    sportId,
    columns,
    selected,
    showSort,
    showHeader,
    collectionId,
    onChangeSelect,
    selectionsSizes,
    isAmericanSports,
    isScoreboardSport,
}: Props) => {
    const sportTemplateOptions = useRecoilValue(sportTemplateOptionsSelectorFamily(sportId));

    const [sortValue, setSortValue] = useRecoilState(sortCriteriaAtomFamily(collectionId));

    const renderDropdown = (i: number) => {
        if (!selectionsSizes.length && !isAmericanSports) {
            return null;
        }

        return (
            <S_DropdownWrapper
                key={`headerDropdown-${i}`}
                cols={selectionsSizes?.[i]}
                isAmericanSports={isAmericanSports}
                isScoreboardSport={isScoreboardSport}
                data-testid='marketDropdown'
            >
                <MarketDropdown
                    key={i}
                    isAmericanSports={isAmericanSports}
                    options={sportTemplateOptions}
                    isLastDropdown={size(selectionsSizes) > NUMBERS.one && i === last(selectionsSizes)}
                    showAllItems
                    customTheme={ThemeNames.Dark}
                    onChange={(option) => {
                        if (isNil(option)) {
                            return;
                        }

                        if ('value' in option) {
                            onChangeSelect(option?.value, i);
                        }
                    }}
                    value={{ value: selected[i], label: selected[i] }}
                    data-testid={selected[i]}
                />
            </S_DropdownWrapper>
        );
    };

    return (
        <S_Panel>
            {showSort && (
                <S_FilterContainer>
                    <SortControllerDesktop options={SORT_OPTIONS} selectedId={sortValue} setSortValue={setSortValue} />
                </S_FilterContainer>
            )}
            {showHeader && (
                <S_Header showSort={showSort}>
                    <DefaultHeader sportId={sportId} />
                </S_Header>
            )}
            <S_Label>
                <I18n langKey='event.list.header.label' defaultText='Bet Type' />
            </S_Label>
            <S_GroupSelects isAmericanSports={isAmericanSports}>
                {Array.from({ length: columns }).map((_, i) => renderDropdown(i))}
            </S_GroupSelects>
        </S_Panel>
    );
};

export default DesktopHeaderView;
