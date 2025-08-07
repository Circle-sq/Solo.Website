import { memo, type MouseEvent } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { AnchorTarget } from 'src/appState/redux/types';
import CloseIcon from 'src/assets/icons/close.svg';
import { NotificationTitle, NotificationType } from 'src/common/enums';
import { STORAGE_KEYS } from 'src/utils/constants';
import buildLocalStorageService from 'src/utils/StorageService';

import { S_Backdrop, S_Image, S_Modal, S_ModalAnchor, S_ModalClose, S_ModalContainer, S_ModalContent } from './styled';
import type { Notification } from './types';
import { useNotifications } from './useNotifications';
import { filterNotifications } from './utils';

const Notifications = () => {
    const { router } = useAppStateContext();

    const isFunMode = buildLocalStorageService<boolean>('funMode').getItem();
    const funModeTitles = [NotificationTitle.FunMode, NotificationTitle.Both];
    const cashModeTitles = [NotificationTitle.Cash, NotificationTitle.Both];
    const notificationsTitles = isFunMode ? funModeTitles : cashModeTitles;

    const [notifications, setNotifications] = useNotifications(NotificationType.Popup, notificationsTitles);

    const seenNotificationsStorage = buildLocalStorageService<number[]>(STORAGE_KEYS.seenNotifications);
    const seenNotificationStorageIds: number[] = seenNotificationsStorage.getItem() ?? [];

    const notSeenNotifications = notifications.filter(
        (notification) => !seenNotificationStorageIds.includes(notification.id),
    );

    const filteredNotifications = filterNotifications(notSeenNotifications);

    const handleCloseModal = (id: number, target?: string) => {
        if (target === 'backdropClick') {
            return false;
        }

        const updatedNotifications = notifications.map((notification: Notification) =>
            notification.id === id
                ? {
                      ...notification,
                      open: false,
                  }
                : notification,
        );

        setNotifications(updatedNotifications);

        const updatedNotificationStorageIds = Array.from(new Set([...seenNotificationStorageIds, id]));
        seenNotificationsStorage.setItem(updatedNotificationStorageIds);
    };

    const handleNotificationClick = (
        e: MouseEvent<HTMLAnchorElement>,
        notificationId: number,
        buttonUrl: string | null,
        openUrl: string,
    ) => {
        e.preventDefault();

        if (!buttonUrl) {
            return;
        }

        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification.id === notificationId ? { ...notification, open: false } : notification,
            ),
        );

        const updatedNotificationStorageIds = Array.from(new Set([...seenNotificationStorageIds, notificationId]));
        seenNotificationsStorage.setItem(updatedNotificationStorageIds);

        switch (openUrl) {
            case AnchorTarget.SAME_TAB: {
                const { href } = e.currentTarget;
                const parsedUrl = new URL(href);
                const [page, id, slug] = parsedUrl.pathname.split('/').filter(Boolean);
                router.redirect(page, { id, slug });

                break;
            }

            case AnchorTarget.NEW_WINDOW: {
                const { innerWidth: width, innerHeight: height } = window;
                const windowOpenOptions = `width=${width},height=${height},resizable,scrollbars,status`;
                window.open(buttonUrl, '_blank', windowOpenOptions);

                break;
            }

            case AnchorTarget.NEW_TAB: {
                window.open(buttonUrl);

                break;
            }

            default:
                console.warn('Unsupported openUrl value:', openUrl);

                break;
        }
    };

    return (
        <S_ModalContainer>
            {filteredNotifications.map(({ id, buttonUrl, openUrl, background, open = false }) => {
                const altText = background?.altText ?? '';
                const url = background?.url ?? '';

                if (!url) {
                    return;
                }

                return (
                    <S_Modal
                        disableAutoFocus
                        open={open}
                        onClose={() => handleCloseModal(id, 'backdropClick')}
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                        key={id}
                        slots={{ backdrop: S_Backdrop }}
                    >
                        <S_ModalContent>
                            <S_ModalAnchor
                                href={buttonUrl ?? ''}
                                onClick={(e) => handleNotificationClick(e, id, buttonUrl, openUrl)}
                                data-testid={`notification-anchor-${id}`}
                            >
                                <S_Image src={url} loading='lazy' alt={altText ?? ''} />
                            </S_ModalAnchor>
                            <S_ModalClose onClick={() => handleCloseModal(id)}>
                                <S_Image src={CloseIcon} alt='Close Icon' />
                            </S_ModalClose>
                        </S_ModalContent>
                    </S_Modal>
                );
            })}
        </S_ModalContainer>
    );
};

export default memo(Notifications);
