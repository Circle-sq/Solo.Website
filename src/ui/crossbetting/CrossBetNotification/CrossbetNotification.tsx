import { useAtomValue } from 'jotai';
import type { MouseEvent } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { useChangeCrossInfoDismiss } from '@solo-account/api/mutations';
import { isAuthenticatedAtom } from '@solo-account/store/atoms';
import { crossInfoDismissSelector } from '@solo-account/store/selectors';
import { CloseIcon, InfoBlueIcon } from '@solo-ui/icons/svg';
import { LightBluePalette } from '@solo-ui/system';

import { I18n } from 'src/ui/common/Language/I18n';

import { S_MarginBox, S_Notification, S_NotificationInfo, S_NotificationLink, S_TextWrapper } from './styled';

const NOTIFICATION_INFO_LINK = 'https://rule.solo.com/?id=363';

const CrossBetNotification = () => {
    let referredRulesTab: null | Window = null;

    const { mutate: mutateCrossInfo } = useChangeCrossInfoDismiss();

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const crossInfoDismiss = useAtomValue(crossInfoDismissSelector);

    const [hideInfo, setHideInfo] = useLocalStorage('hideCrossInfo', false);

    const onCloseNotification = () => {
        if (isAuthenticated) {
            mutateCrossInfo(true);
        }

        setHideInfo(true);
    };

    const onInfoLinkClick = (event: MouseEvent) => {
        event.preventDefault();

        const anchorLink = (event.target as HTMLAnchorElement).href;

        if (!referredRulesTab || referredRulesTab.closed) {
            referredRulesTab = window.open(anchorLink, '_blank', `width=1024px, height=750px`);
        } else {
            referredRulesTab.focus();
        }
    };

    if (crossInfoDismiss || hideInfo) {
        return null;
    }

    return (
        <S_Notification data-testid='infoBox'>
            <InfoBlueIcon data-testid='infoBoxIcon' fontSize='small' />
            <S_TextWrapper>
                <S_NotificationInfo data-testid='infoBoxText'>
                    <I18n
                        langKey='crossbetting.explanation.text'
                        defaultText='Selection of the odds is different on this page.'
                    />
                </S_NotificationInfo>
                &nbsp;
                <S_NotificationLink
                    data-testid='infoBoxLinkText'
                    href={NOTIFICATION_INFO_LINK}
                    onClick={onInfoLinkClick}
                >
                    <I18n langKey='crossbetting.explanation.link' defaultText='Learn how it works' />
                </S_NotificationLink>
            </S_TextWrapper>
            <S_MarginBox>
                <CloseIcon
                    fontSize='small'
                    color={LightBluePalette.lightBlue6}
                    data-testid='infoBoxCloseButton'
                    onClick={onCloseNotification}
                />
            </S_MarginBox>
        </S_Notification>
    );
};

export default CrossBetNotification;
