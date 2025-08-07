import type { PropsWithChildren, ReactElement } from 'react';

import type { Testable } from 'src/utils/Testable/types';

import { S_SportsHeading, S_SportsHeader, S_Section } from './styles';

interface Props extends Testable {
    title: string | ReactElement;
    testId?: string;
    fontSize?: number;
}

const SportsPanel = ({ title, testId, children, fontSize }: PropsWithChildren<Props>) => {
    return (
        <S_Section data-testid={testId}>
            <S_SportsHeader data-testid={`header-${testId}`}>
                <S_SportsHeading fontSize={fontSize}>{title}</S_SportsHeading>
            </S_SportsHeader>
            {children}
        </S_Section>
    );
};

export default SportsPanel;
