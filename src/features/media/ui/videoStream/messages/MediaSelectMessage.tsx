import { List } from 'immutable';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { cssColor } from '@solo-ui/system';
import { FootballFieldIcon, PlayOutlineIcon } from '@solo-ui/icons/src/icons';

import { useAppStateContext } from 'src/appState/AppState';

import { S_Notification } from '../styled';

const MediaSelectMessage = () => {
    const {
        language: { getTranslation, translateTokens },
    } = useAppStateContext();

    const streamsLength = useSelector(({ media }) => media.getIn(['streams', 'items'], List()).size);

    if (streamsLength !== 0) {
        return (
            <S_Notification>
                <Box style={{ display: 'inline-flex' }}>
                    {translateTokens(
                        getTranslation(
                            'media.stream.video.dropdown.select.label',
                            'Select [playIcon] or [matchIcon] from the live event list to view media',
                        ),
                        ({ tag }) => {
                            if (tag === 'playIcon') {
                                return (
                                    <PlayOutlineIcon
                                        fontSize='small'
                                        color={cssColor('--icon-generic-color')}
                                        style={{ margin: '0 5px' }}
                                    />
                                );
                            } else if (tag === 'matchIcon') {
                                return (
                                    <FootballFieldIcon
                                        fontSize='small'
                                        color={cssColor('--icon-generic-color')}
                                        style={{ margin: '0 5px' }}
                                    />
                                );
                            }
                        },
                    )}
                </Box>
            </S_Notification>
        );
    }

    return (
        <S_Notification>
            <Box style={{ display: 'inline-flex' }}>
                {translateTokens(
                    getTranslation(
                        'media.stream.video.dropdown.match.label',
                        'Select [matchIcon] from the live event list to view media',
                    ),
                    () => (
                        <FootballFieldIcon
                            fontSize='small'
                            color={cssColor('--icon-generic-color')}
                            style={{ margin: '0 5px' }}
                        />
                    ),
                )}
            </Box>
        </S_Notification>
    );
};

export default MediaSelectMessage;
