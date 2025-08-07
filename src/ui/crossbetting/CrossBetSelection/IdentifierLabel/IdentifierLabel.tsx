import { I18n } from 'src/ui/common/Language/I18n';

interface Props {
    isAway: boolean;
    isDraw: boolean;
    isHome: boolean;
    isHandicap: boolean;
    handicapLabel: string | null;
}

const IdentifierLabel = ({ isAway, isDraw, isHome, isHandicap, handicapLabel }: Props) => {
    if (isDraw) {
        return <I18n langKey='odds.button.identifier.label.draw' defaultText='Draw' />;
    }

    const showHandicapLabel = (isHome || isAway) && isHandicap && Boolean(handicapLabel);

    if (showHandicapLabel) {
        return <>{handicapLabel}</>;
    }

    if (isHome) {
        return <I18n langKey='odds.button.identifier.label.home' defaultText='Home' />;
    }

    if (isAway) {
        return <I18n langKey='odds.button.identifier.label.away' defaultText='Away' />;
    }

    return null;
};

export default IdentifierLabel;
