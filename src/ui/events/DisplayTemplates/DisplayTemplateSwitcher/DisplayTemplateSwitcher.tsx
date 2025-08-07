import get from 'lodash/get';
import { observer } from 'mobx-react-lite';

import type { SimpleDisplayTemplateProps } from 'src/ui/events/DisplayTemplates/types';
import { MARKET_TEMPLATE, MARKET_TEMPLATE_GROUP } from 'src/utils/constants';
import {
    sportsWithCorrectScoreTemplate,
    sportsWithGameLinesTemplate,
    sportsWithGoalScorerTemplate,
} from 'src/utils/marketGroupingConfig';

import { useCommonTemplate } from '../../hooks/useCommonTemplate';
import CorrectScoreDisplayTemplate from '../CorrectScoreDisplayTemplate/CorrectScoreDisplayTemplate';
import GameLinesDisplayTemplate from '../GameLinesDisplayTemplate/GameLinesDisplayTemplate';
import GoalscorerDisplayTemplate from '../GoalscorerDisplayTemplate/GoalscorerDisplayTemplate';
import OverUnderDisplayTemplate from '../OverUnderDisplayTemplate/OverUnderDisplayTemplate';
import SimpleDisplayTemplate from '../SimpleDisplayTemplate/SimpleDisplayTemplate';
import SpreadDisplayTemplate from '../SpreadDisplayTemplate/SpreadDisplayTemplate';

interface Props extends SimpleDisplayTemplateProps {
    sportId?: string;
    isOutrightEvent: boolean;
}

const DisplayTemplateSwitcher = ({ markets, eventId, groupName, type, sportId, isOutrightEvent }: Props) => {
    // Decision to use certain template is taken from templateType / could also use mainGroup
    // All new templates must be added here
    const marketTemplateType: string = get(markets, '0.template.marketTypeGeneric', '');
    const selectionsHaveLine = markets[0]?.selections.every((x) => x.line);

    const { visibleMarkets } = useCommonTemplate({
        groupName,
        marketTemplate: MARKET_TEMPLATE.correctscore,
        markets,
        type,
    });

    const multipleScoreMarket = get(visibleMarkets, '0.template.marketTemplateType', '');
    const isMultipleScoreMarket = multipleScoreMarket.includes('multiple');

    if (isOutrightEvent || isMultipleScoreMarket) {
        return <SimpleDisplayTemplate eventId={eventId} markets={markets} groupName={groupName} type={type} />;
    }

    switch (true) {
        case marketTemplateType === MARKET_TEMPLATE.goalscorer &&
            sportsWithGoalScorerTemplate.includes(String(sportId)):
            return <GoalscorerDisplayTemplate markets={markets} groupName={groupName} />;

        case groupName === MARKET_TEMPLATE_GROUP.gameLines && sportsWithGameLinesTemplate.includes(String(sportId)):
            return <GameLinesDisplayTemplate markets={markets} sportId={sportId} />;

        case marketTemplateType.includes(MARKET_TEMPLATE_GROUP.spread) && selectionsHaveLine:
            return <SpreadDisplayTemplate markets={markets} groupName={groupName} type={type} />;

        case marketTemplateType.includes(MARKET_TEMPLATE.overunder):
            return <OverUnderDisplayTemplate markets={markets} groupName={groupName} type={type} />;

        case marketTemplateType === MARKET_TEMPLATE.correctscore &&
            sportsWithCorrectScoreTemplate.includes(String(sportId)):
            return (
                <CorrectScoreDisplayTemplate markets={markets} eventId={eventId} groupName={groupName} type={type} />
            );

        default:
            return <SimpleDisplayTemplate markets={markets} eventId={eventId} groupName={groupName} type={type} />;
    }
};

export default observer(DisplayTemplateSwitcher);
