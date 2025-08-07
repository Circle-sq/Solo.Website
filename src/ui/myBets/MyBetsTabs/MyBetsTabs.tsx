import { Box } from '@mui/material';
import type { MouseEvent } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';

import { myBetsTabSelector } from '../store/selectors';
import { setMyBetsTabTask } from '../store/tasks';

import { myBetsTabs } from './config';
import { S_MyBetsTabs, S_TabItem } from './styled';

const MyBetsTabs = () => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const myBetsTab = useRecoilValue(myBetsTabSelector);
    const setMyBetsTab = useRecoilCallback(setMyBetsTabTask, []);

    return (
        <Box>
            <S_MyBetsTabs>
                {myBetsTabs.map(({ tab, langKey, defaultText, testId }) => {
                    const changeTab = (e: MouseEvent) => {
                        e.preventDefault();

                        setMyBetsTab(tab);
                    };

                    return (
                        <S_TabItem key={testId} testId={testId} isSelected={myBetsTab === tab} onClick={changeTab}>
                            <span>{getTranslation(langKey, defaultText)}</span>
                        </S_TabItem>
                    );
                })}
            </S_MyBetsTabs>
        </Box>
    );
};

export default MyBetsTabs;
