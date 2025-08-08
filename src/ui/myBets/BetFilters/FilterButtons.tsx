import map from 'lodash/map';
import type { ChangeEvent } from 'react';
import { memo } from 'react';

import { S_FilterButtonsContainer, S_FilterRadioItem } from '@solo-ui/beteast';

import { useAppStateContext } from 'src/appState/AppState';
import type { TabStatus } from 'src/ui/myBets/store/types';

import { betStatusFilters } from './config';

interface Props {
    status: TabStatus;
    onStatusChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FilterButtons = ({ status, onStatusChange }: Props) => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    return (
        <S_FilterButtonsContainer>
            {map(betStatusFilters, ({ langKey, defaultText, testId }, key) => (
                <S_FilterRadioItem key={key} data-testid={testId}>
                    <input type='radio' name='status' value={key} checked={key === status} onChange={onStatusChange} />
                    <span>{getTranslation(langKey, defaultText)}</span>
                </S_FilterRadioItem>
            ))}
        </S_FilterButtonsContainer>
    );
};

export default memo(FilterButtons);
