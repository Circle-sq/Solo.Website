import get from 'lodash/get';
import isNil from 'lodash/isNil';
import type { MouseEvent } from 'react';

import { CloseIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import type { Leg } from '../../../api/types/leg';
import { VerticalDivider } from '../../styled';
import { S_RemoveSelectionButton } from '../styled';

import BetLabel from './BetLabel';
import { S_Container, S_CardHeaderLabel, S_CardSportAndCompetition } from './styled';

interface Props {
    leg: Leg;
    onRemoveSelection: (event: MouseEvent<HTMLButtonElement>) => void;
}

const CardHeader = ({ leg, onRemoveSelection }: Props) => {
    const competition = get(leg, 'competition.name', null);
    const sport: string | null = get(leg, 'sport.name', null);

    return (
        <S_Container>
            <S_CardHeaderLabel data-testid='cardHeaderLabel'>
                <BetLabel leg={leg} />
            </S_CardHeaderLabel>
            <VerticalDivider />
            {!isNil(sport) && !isNil(competition) && (
                <S_CardSportAndCompetition
                    data-testid='selectionCardHeader'
                    title={`${sport}, ${competition}`}
                >{`${sport}, ${competition}`}</S_CardSportAndCompetition>
            )}
            <S_RemoveSelectionButton onClick={onRemoveSelection} testId='removeSelection'>
                <CloseIcon color={cssColor('--icon-color')} fontSize='small' />
            </S_RemoveSelectionButton>
        </S_Container>
    );
};

export default CardHeader;
