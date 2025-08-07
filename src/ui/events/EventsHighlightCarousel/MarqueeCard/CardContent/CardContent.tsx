import { useAtomValue } from 'jotai';
import split from 'lodash/split';

import { TypeLineName } from 'src/common/enums';
import type { Score } from 'src/common/types/statistics';
import { uniformUrlSelectorFamily } from 'src/store/uniforms/selectors';
import { NUMBERS } from 'src/utils/constants';

import { S_Team, S_NameContainer, S_Name, S_TeamImage, S_Score, S_Content } from './styled';

interface TeamData {
    url: string;
    name: string;
}

interface Props {
    scoreSupported: boolean;
    score: Score | undefined;
    home: TeamData;
    away: TeamData;
    isLive: boolean;
    hasAmericanFormat: boolean;
}

type MaxLine = 1 | 2;

const CardContent = ({
    scoreSupported,
    score,
    home: { url: homeUniformUrl, name: homeName },
    away: { url: awayUniformUrl, name: awayName },
    isLive,
    hasAmericanFormat,
}: Props) => {
    const homeUrl = useAtomValue(uniformUrlSelectorFamily(homeUniformUrl));
    const awayUrl = useAtomValue(uniformUrlSelectorFamily(awayUniformUrl));

    const hasUniform = homeUrl !== undefined && awayUrl !== undefined;

    const getMaxLines = (teamName = ''): MaxLine =>
        split(teamName, ' ').length === NUMBERS.one ? NUMBERS.one : NUMBERS.two;
    const typeLine = hasUniform ? TypeLineName.uniform : TypeLineName.default;

    const homeScore = score?.home ?? '';
    const awayScore = score?.away ?? '';

    return (
        <S_Content>
            <S_Team align='right'>
                <S_NameContainer isWithUniform={hasUniform}>
                    <S_Name
                        testId='homeParticipant'
                        text={homeName}
                        title={homeName}
                        maxLines={getMaxLines(homeName)}
                        typeLine={typeLine}
                    />
                </S_NameContainer>
                {hasUniform ? <S_TeamImage src={homeUrl} alt={homeName} testId='uniform' /> : null}
            </S_Team>

            {isLive && scoreSupported ? (
                <S_Score data-testid='separator'>{`${homeScore} : ${awayScore}`}</S_Score>
            ) : (
                <S_Score data-testid='separator'>{hasAmericanFormat ? '@' : 'vs'}</S_Score>
            )}

            <S_Team>
                {hasUniform ? <S_TeamImage src={awayUrl} alt={awayName} testId='uniform' /> : null}
                <S_NameContainer isWithUniform={hasUniform}>
                    <S_Name
                        testId='awayParticipant'
                        text={awayName}
                        title={awayName}
                        maxLines={getMaxLines(awayName)}
                        typeLine={typeLine}
                    />
                </S_NameContainer>
            </S_Team>
        </S_Content>
    );
};

export default CardContent;
