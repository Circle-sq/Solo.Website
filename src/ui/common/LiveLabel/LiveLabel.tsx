import type { PropsWithChildren, ReactElement } from 'react';

import { useAppStateContext } from 'src/appState/AppState';

import type { Props } from './types';
import { S_LiveLabelTag, S_LiveShort } from './styled';

const LiveLabel = (props: Props): ReactElement => {
    const { label, className, testId } = props;
    const {
        language: { getTranslation },
    } = useAppStateContext();

    return (
        <S_LiveLabelTag data-testid={testId} className={className}>
            {label ?? getTranslation('event.live.label', 'LIVE')}
        </S_LiveLabelTag>
    );
};

export const LiveLabelShort = (props: PropsWithChildren<Props>): ReactElement => {
    const { label, className, testId } = props;
    const {
        language: { getTranslation },
    } = useAppStateContext();

    return (
        <S_LiveShort className={className} data-testid={testId}>
            {label ?? getTranslation('event.live.label', 'LIVE')}
        </S_LiveShort>
    );
};

export default LiveLabel;
