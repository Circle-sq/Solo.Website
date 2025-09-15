import { LANGUAGES } from 'src/utils/constants';
import { useAppStateContext } from 'src/appState/AppState';

import { FIRST_LINE_LIMIT } from './configs';
import { getLines } from './utils';
import { S_EllipsisContainer } from './styled';
import type { Props } from './types';

const DEFAULT_LINE_HEIGHT = 1;
const DEFAULT_NUMBER_OF_LINES = 2;

const LinesEllipsis = (props: Props) => {
    const {
        text = '',
        lineHeight = DEFAULT_LINE_HEIGHT,
        maxLines = DEFAULT_NUMBER_OF_LINES,
        typeLine = '',
        testId,
        ...rest
    } = props;

    const {
        language: { userLang },
    } = useAppStateContext();

    if (typeLine) {
        const [firstLine, secondLine] = getLines(text, FIRST_LINE_LIMIT[userLang ?? LANGUAGES.englishGB][typeLine].max);

        return (
            <>
                {firstLine && (
                    <S_EllipsisContainer
                        lineHeight={lineHeight}
                        maxLines={maxLines}
                        data-testid={`${testId}-firstLine`}
                        {...rest}
                    >
                        {firstLine}
                    </S_EllipsisContainer>
                )}
                {secondLine && (
                    <S_EllipsisContainer
                        lineHeight={lineHeight}
                        maxLines={maxLines}
                        data-testid={`${testId}-secondLine`}
                        {...rest}
                    >
                        {secondLine}
                    </S_EllipsisContainer>
                )}
            </>
        );
    }

    return (
        <S_EllipsisContainer lineHeight={lineHeight} maxLines={maxLines} {...rest}>
            {text}
        </S_EllipsisContainer>
    );
};

export default LinesEllipsis;
