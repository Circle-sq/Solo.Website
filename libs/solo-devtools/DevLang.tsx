import styled from '@emotion/styled';
import { useState } from 'react';

import { getStorageBuilder } from 'src/utils/StorageService';

const S_UserLangWrapper = styled.div({
    color: 'white',
    label: {
        cursor: 'pointer',
        input: {
            appearance: 'auto',
        },
    },
});

export function DevLang() {
    const userLangStorage = getStorageBuilder()('userLang');
    const [useEnglish, setUseEnglish] = useState(() => {
        return userLangStorage.getItem() === 'en-US';
    });

    const toggleUseEnglish = () => {
        if (useEnglish) {
            userLangStorage.removeItem();
        } else {
            userLangStorage.setItem('en-US');
        }
        setUseEnglish(!useEnglish);
    };

    return (
        <S_UserLangWrapper>
            <label data-testid='useEnglish'>
                <input
                    data-testid='useEnglishCheckbox'
                    type='checkbox'
                    checked={useEnglish}
                    onChange={toggleUseEnglish}
                />
                Use English (then refresh)
            </label>
        </S_UserLangWrapper>
    );
}
