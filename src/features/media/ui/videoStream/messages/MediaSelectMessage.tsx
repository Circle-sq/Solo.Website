import { List } from 'immutable';
import { useSelector } from 'react-redux';

import { useAppStateContext } from 'src/appState/AppState';

import { DropdownLabelIcon, S_Notification } from '../styled';

const MediaSelectMessage = () => {
    const {
        language: { getTranslation, translateTokens },
    } = useAppStateContext();

    const streamsLength = useSelector(({ media }) => media.getIn(['streams', 'items'], List()).size);

    if (streamsLength !== 0) {
        return (
            <S_Notification>
                {translateTokens(
                    getTranslation(
                        'media.stream.video.dropdown.select.label',
                        'Select [playIcon] or [matchIcon] from the live event list to view media',
                    ),
                    ({ tag }) => {
                        if (tag === 'playIcon') {
                            return <DropdownLabelIcon key='playIcon' className='sports-video' />;
                        } else if (tag === 'matchIcon') {
                            return <DropdownLabelIcon key='matchIcon' className='sports-4-match' />;
                        }
                    },
                )}
            </S_Notification>
        );
    }

    return (
        <S_Notification>
            {translateTokens(
                getTranslation(
                    'media.stream.video.dropdown.match.label',
                    'Select [matchIcon] from the live event list to view media',
                ),
                () => (
                    <DropdownLabelIcon key='matchIcon' className='sports-4-match' />
                ),
            )}
        </S_Notification>
    );
};

export default MediaSelectMessage;
