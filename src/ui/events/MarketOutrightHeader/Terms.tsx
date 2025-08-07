import { useAppStateContext } from 'src/appState/AppState';
import { I18n } from 'src/ui/common/Language/I18n';
import { SportType } from 'src/common/enums';

import { S_TermsWrapper, S_SingleTermsWrapper } from './styled';

interface Props {
    marketId: number;
}

const Terms = ({ marketId }: Props) => {
    const appState = useAppStateContext();
    const { sportId } = appState.router.route.params;
    const marketIdNum = marketId !== undefined ? marketId : null;
    const marketModel = marketIdNum !== null ? appState.models.getMarket(marketIdNum) : null;

    if (
        sportId !== SportType.HorseRacing ||
        marketModel === null ||
        marketModel.eachWay === null ||
        !marketModel.eachWay.offered
    ) {
        return null;
    }

    const [terms] = marketModel.eachWay.terms;

    if (terms === undefined) {
        return null;
    }

    if (marketModel.templateId.includes('place-betting')) {
        return (
            <S_TermsWrapper>
                <S_SingleTermsWrapper>
                    <I18n
                        langKey='events.market-group.each-way-terms.places'
                        defaultText='{places} Places'
                        params={{ places: terms.places }}
                    />
                </S_SingleTermsWrapper>
            </S_TermsWrapper>
        );
    }

    return (
        <S_TermsWrapper>
            <S_SingleTermsWrapper>
                <I18n langKey='events.market-group.each-way-terms.label' defaultText='EW Terms' />
            </S_SingleTermsWrapper>
            <S_SingleTermsWrapper>{terms.reduction}</S_SingleTermsWrapper>
            <S_SingleTermsWrapper>
                <I18n
                    langKey='events.market-group.each-way-terms.places'
                    defaultText='{places} Places'
                    params={{ places: terms.places }}
                />
            </S_SingleTermsWrapper>
        </S_TermsWrapper>
    );
};

export default Terms;
