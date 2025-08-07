import type { Testable } from 'src/utils/Testable/types';

import { S_SelectionAction } from './SelectionAction/styled';
import { S_EmptySelectionWrapper } from './styled';

interface Props extends Testable {
    value: string;
}

const EmptySelection = ({ value, testId }: Props) => {
    return (
        <S_EmptySelectionWrapper>
            <S_SelectionAction data-testid={testId}>{value}</S_SelectionAction>
        </S_EmptySelectionWrapper>
    );
};

export default EmptySelection;
