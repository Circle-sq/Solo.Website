import { BaseballBatIcon } from '@solo-ui/icons/svg';

import { TurnValue } from 'src/common/enums';
import type { Score } from 'src/common/types/statistics';

import { BasicEventScore, NumberRow, RowScore, S_MarginBox } from '../styled';

const BasicScoreboard = ({ score, turnValue }: { score: Score; turnValue?: TurnValue }) => {
    return (
        <BasicEventScore>
            <NumberRow>
                {turnValue === TurnValue.Team01 && (
                    <S_MarginBox>
                        <BaseballBatIcon fontSize='xsmall' />
                    </S_MarginBox>
                )}
                <RowScore>{score.home}</RowScore>
            </NumberRow>
            <NumberRow>
                {turnValue === TurnValue.Team02 && (
                    <S_MarginBox>
                        <BaseballBatIcon fontSize='xsmall' />
                    </S_MarginBox>
                )}
                <RowScore>{score.away}</RowScore>
            </NumberRow>
        </BasicEventScore>
    );
};

export default BasicScoreboard;
