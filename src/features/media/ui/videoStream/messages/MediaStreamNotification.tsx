import { memo } from 'react';

import { InfoBlueIcon } from '@solo-ui/icons/svg';

import { useAppStateContext } from 'src/appState/AppState';
import { I18n } from 'src/ui/common/Language/I18n';
import { PAGE_ROUTE_NAME } from 'src/utils/constants';

import { S_Notification, InfoMessage, S_MarginBox } from '../styled';

import MediaSelectMessage from './MediaSelectMessage';

const MediaStreamNotification = (props: { streamId: string | null; hasLiveStream: boolean }) => {
    const { streamId, hasLiveStream } = props;

    const { router } = useAppStateContext();

    const isEventPage = PAGE_ROUTE_NAME.event === router.route.name;

    const showMediaSelectMessage = streamId === '' && !isEventPage;
    const showNoLiveStreamMessage = !hasLiveStream && streamId === null;

    return (
        <>
            {showMediaSelectMessage && <MediaSelectMessage />}

            {showNoLiveStreamMessage ? (
                <S_Notification>
                    <InfoMessage>
                        <S_MarginBox>
                            <InfoBlueIcon style={{ fontSize: '14px' }} />
                        </S_MarginBox>
                        <I18n
                            langKey='media.stream.video.dropdown.footer.label'
                            defaultText='No live streaming currently available for this event'
                        />
                    </InfoMessage>
                </S_Notification>
            ) : null}
        </>
    );
};

export default memo(MediaStreamNotification);
