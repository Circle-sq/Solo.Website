import { computed, action, observable, makeObservable } from 'mobx';

import type Application from 'src/app';
import { isStandalone } from 'src/infra.client';
import { NUMBERS, SPORT_BOOK_MESSAGES } from 'src/utils/constants';
import type { Router } from 'src/utils/Router';

import type { LanguagesState } from './LanguagesState';

interface MessageType {
    readonly title: string;
    readonly message: string;
}

export class MessageBoxState {
    private readonly router: Router;
    private readonly language: LanguagesState;
    private userSendLogoutAction = false;
    private maximumBetsExceeded = false;

    private message: MessageType | null = null;

    constructor(router: Router, language: LanguagesState) {
        makeObservable<MessageBoxState, 'message'>(this, {
            message: observable.ref,
            messageForView: computed,
            showMessage: action,
            markAsLogout: action,
            onCloseModal: action,
            onClose: action,
            maximumBetsLimit: action,
        });

        this.router = router;

        this.language = language;
    }

    get messageForView(): MessageType | null {
        if (this.userSendLogoutAction || this.maximumBetsExceeded) {
            return null;
        }

        return this.message;
    }

    showMessage(title: string, message: string) {
        this.message = {
            title,
            message,
        };
    }

    markAsLogout = () => {
        this.userSendLogoutAction = true;
    };

    onCloseModal = () => {
        this.message = null;
    };

    onClose = () => {
        if (!this.maximumBetsExceeded) {
            this.maximumBetsExceeded = false;

            this.onCloseModal();

            return;
        }

        if (!this.userSendLogoutAction) {
            this.userSendLogoutAction = true;

            this.router.redirect(void NUMBERS.zero, { account: 'login' });

            setTimeout(() => {
                window.location.reload();
            }, NUMBERS.zero);
        }
    };

    maximumBetsLimit = () => {
        const { getTranslation } = this.language;

        if (isStandalone()) {
            const app: Application = window.$app;
            app.postExternalMessage(SPORT_BOOK_MESSAGES.message_box_popup, {
                title: getTranslation('window.betslip-full.title', 'Bet slip full'),
                message: getTranslation(
                    'window.betslip-full.message',
                    'You have added the maximum number of picks to your bet slip.',
                ),
            });

            return;
        }

        this.showMessage(
            getTranslation('window.betslip-full.title', 'Bet slip full'),
            getTranslation(
                'window.betslip-full.message',
                'You have added the maximum number of picks to your bet slip.',
            ),
        );
    };
}
