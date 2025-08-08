import { useAsianInPlayHandicapLineFlag } from '@solo-feature-flags';
import sortBy from 'lodash/sortBy';
import { observer } from 'mobx-react-lite';

import { SubKey } from '@solo-features/subscription-manager/subKeys';
import { SubscribeElement } from '@solo-features/subscription-manager/SubscribeElement';
import { LockIcon } from '@solo-ui/icons/svg';
import { DarkBluePalette } from '@solo-ui/system';

import type { MarketModel } from 'src/appState/models/models/MarketModel';
import { SelectionIdentifier } from 'src/common/enums';
import { isHandicapMarket, isOverUnderMarket } from 'src/common/helpers/market';
import EmptySelection from 'src/ui/events/Selection/EmptySelection';
import Selection from 'src/ui/events/Selection/Selection';
import { formatNumber } from 'src/utils/format';
import type { Testable } from 'src/utils/Testable/types';

import { SelectionsContainer, S_AlignmentBox } from './styled';

const MISSING_REVISION = -2;

interface Props extends Testable {
    market?: MarketModel;
    isAmericanSports?: boolean;
    isScoreboardSport?: boolean;
    marketCols?: number;
    isLive?: boolean;
}

export function NoMarketPlaceholder(props: { isAmericanSports?: boolean; isScoreboardSport?: boolean; cols?: number }) {
    return (
        <SelectionsContainer {...props}>
            <S_AlignmentBox>
                <LockIcon fontSize='xsmall' color={DarkBluePalette.darkBlue5} />
            </S_AlignmentBox>
        </SelectionsContainer>
    );
}

const EventSelectionsGroup = ({
    market,
    isAmericanSports,
    isScoreboardSport,
    marketCols = 3,
    isLive,
    testId,
}: Props) => {
    const asianInPlayHandicapLineFlag = useAsianInPlayHandicapLineFlag();

    if (market === undefined) {
        return (
            <NoMarketPlaceholder
                isAmericanSports={isAmericanSports}
                isScoreboardSport={isScoreboardSport}
                cols={marketCols}
            />
        );
    }

    if (!market.displayed) {
        const revision = market.revision ?? MISSING_REVISION;

        return (
            <SubscribeElement id={market.id} subKey={SubKey.suspended_market} revision={revision}>
                <NoMarketPlaceholder
                    isAmericanSports={isAmericanSports}
                    isScoreboardSport={isScoreboardSport}
                    cols={marketCols}
                />
            </SubscribeElement>
        );
    }

    if (market.isSuspended) {
        const revision = market.revision ?? MISSING_REVISION;

        return (
            <SelectionsContainer
                isAmericanSports={isAmericanSports}
                isScoreboardSport={isScoreboardSport}
                cols={marketCols}
            >
                <SubscribeElement id={market.id} subKey={SubKey.suspended_esg} revision={revision}>
                    <S_AlignmentBox>
                        <LockIcon fontSize='xsmall' color={DarkBluePalette.darkBlue5} />
                    </S_AlignmentBox>
                </SubscribeElement>
            </SelectionsContainer>
        );
    }

    let selections = market?.selections;
    const maximumVisibleSelections = 3;
    const isOverUnder = isOverUnderMarket(market);
    const isHandicap = market.templateId.includes('handicap') || isHandicapMarket(market);
    const isTwoLineHandicap = isHandicap && market?.selections.length < maximumVisibleSelections;
    const shouldDisplayEmptySelection = !isAmericanSports && (isOverUnder || isTwoLineHandicap);

    const emptySelectionText = (): string => {
        if (isOverUnder) {
            return formatNumber(market?.line);
        }

        if (isHandicap) {
            const handicapMarket = selections.find((selection) => selection.identifier === SelectionIdentifier.Home);
            const handicapLineValue = formatNumber(handicapMarket?.line);
            const handicapAsianLineValue = formatNumber(handicapMarket?.asianInPlayLine);
            const shouldUseAsianLineValue =
                handicapAsianLineValue !== '' && handicapMarket && isLive && asianInPlayHandicapLineFlag;

            return shouldUseAsianLineValue ? handicapAsianLineValue : handicapLineValue;
        }

        return '';
    };

    if (isOverUnder && Boolean(isAmericanSports)) {
        selections = sortBy(selections, (selection) =>
            [SelectionIdentifier.Over, SelectionIdentifier.Under].indexOf(
                String(selection.identifier) as SelectionIdentifier,
            ),
        );
    }

    return (
        <SelectionsContainer
            isAmericanSports={isAmericanSports}
            isScoreboardSport={isScoreboardSport}
            cols={marketCols}
            data-testid={testId}
        >
            {shouldDisplayEmptySelection && <EmptySelection value={emptySelectionText()} testId='marketLine' />}

            <SubscribeElement id={market.id} subKey={SubKey.esg} revision={market.revision}>
                {market.selections.slice(0, maximumVisibleSelections).map(({ id: selectionId, marketId }) => {
                    return (
                        <Selection
                            key={`${selectionId}-${marketId}`}
                            line={market.line}
                            selectionId={selectionId}
                            showIdentifier={isAmericanSports}
                            isAmericanSports={isAmericanSports}
                            isHandicap={isHandicap}
                        />
                    );
                })}
            </SubscribeElement>
        </SelectionsContainer>
    );
};

export default observer(EventSelectionsGroup);
