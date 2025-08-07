import get from 'lodash/get';
import includes from 'lodash/includes';

import { useAppStateContext } from 'src/appState/AppState';
import { SelectionIdentifier } from 'src/common/enums';
import { getSelectionIdentifierLabel } from 'src/utils/constants';
import { formatNumber } from 'src/utils/format';

import { getShortSelectionIdentifierLabel } from '../utils';

import { S_IdentifierLabel, S_Label } from './styled';

interface Props {
    line?: string | number | null;
    identifier: string;
    selectionId?: number;
    sportId: string;
    handicapLabel: string | null;
    isAmericanSports?: boolean;
    isSmallSize?: boolean;
}

const IdentifierLabel = ({
    line,
    identifier,
    selectionId,
    sportId,
    handicapLabel,
    isAmericanSports = false,
    isSmallSize = false,
}: Props) => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const identifierLabels = getSelectionIdentifierLabel(getTranslation, sportId);
    const shortIdentifiers = getShortSelectionIdentifierLabel(getTranslation);

    const identifierPrefix = includes([SelectionIdentifier.Under, SelectionIdentifier.Over], identifier)
        ? `${shortIdentifiers[identifier]} `
        : null;

    const selectionIdentifierLabel = get(identifierLabels, identifier, identifier);

    if (isAmericanSports) {
        if (shortIdentifiers[identifier]) {
            const formatLine = formatNumber(line);

            return <>{`${shortIdentifiers[identifier]} ${formatLine}`}</>;
        }

        if (handicapLabel !== null) {
            return <>{handicapLabel}</>;
        }

        return null;
    }

    return (
        <S_IdentifierLabel key={selectionId}>
            <S_Label data-testid='identifier'>
                {isSmallSize && Boolean(handicapLabel) ? (
                    <>
                        {identifierPrefix}
                        {handicapLabel !== '' ? handicapLabel : formatNumber(line)}
                    </>
                ) : identifierPrefix !== null ? (
                    `${shortIdentifiers[identifier]} ${formatNumber(line)}`
                ) : (
                    selectionIdentifierLabel
                )}
            </S_Label>
        </S_IdentifierLabel>
    );
};

export default IdentifierLabel;
