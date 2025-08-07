import type { EventCentreConstructorArgs } from '@img-arena/front-row-seat';
import { eventCentre, eventCentreUtils } from '@img-arena/front-row-seat';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import merge from 'lodash/merge';
import startsWith from 'lodash/startsWith';
import { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { isAuthenticatedAtom } from '@sc-account/store/atoms';

import { currencyToSymbol } from 'src/appState/utils';
import type { CurrencyType } from 'src/config/types';
import { isStandalone } from 'src/infra.client';
import { launchToken } from 'src/modules/sports/services/sports';
import { LANGUAGES } from 'src/utils/constants';

import { S_CloseFrame, S_IFrameWrapper, S_Overlay } from './styled';

interface Props {
    accountId: string | undefined;
    userLang: string;
    currency: CurrencyType;
    onClose: () => void;
}

export const ImgBetlinkIntegration = ({ accountId, userLang, currency, onClose }: Props) => {
    const currencySymbol = currencyToSymbol(currency);
    const language = startsWith(userLang, 'en') ? LANGUAGES.en : LANGUAGES.ko;
    const OPERATOR_NAME = 'skycity';
    const env = 'sims';
    const initializationOptions = {
        videoPlaybackEnabled: true,
        disablePeopleImages: false,
        units: 'metric',
        options: {
            betlinkOptions: {
                multiplesBetting: true,
                fractionalOdds: false,
                allowDecimalStakes: false,
                allowDecimalPayouts: true,
                showEachWayBets: false,
                currencySymbol,
                quickStakes: {
                    '+5천원': 5000,
                    '+1만원': 10000,
                    '+5만원': 50000,
                    '+10만원': 100000,
                    '+50만원': 500000,
                    '+100만원': 1000000,
                },
                stakeLimits: {
                    maxStake: 10000000,
                    minStake: 5000,
                    maxPayOut: 10000000,
                    minPayOut: 1000,
                },
            },
        },
    };

    const betLinkInitOptions: EventCentreConstructorArgs = {
        operator: OPERATOR_NAME,
        sport: 'golf',
        version: 'latest',
        betlinkVersion: process.env.BETLINK_VERSION ?? 'demo',
        targetModule: 'full', //? this will always be "full"
        targetElementSelector: '#img-arena-betlink',
        env, //? event centre environment (BTEC environment).
        betlinkEnv: env, //? Betlink environment
        theme: 'dark', //? theme targetting both Beltink and the embedded event centre.
    };
    const initOptions = merge(betLinkInitOptions, {
        ...initializationOptions,
        language,
    });
    const { MessageTopics } = eventCentreUtils;

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    const getBetLinkInitOptions = (operatorAuthToken: string) => {
        const context = {
            operatorAuthToken,
            userId: accountId,
            operatorId: OPERATOR_NAME,
        };
        const betlinkInstance = eventCentre(initOptions);

        betlinkInstance.on(MessageTopics.BETLINK_OPERATOR_AUTH_TOKEN_REQUEST, async () => {
            if (!accountId) {
                return;
            }
            betlinkInstance.emit(MessageTopics.BETLINK_OPERATOR_AUTH_TOKEN_RESPONSE, context);
        });
    };

    const { mutate: emitToken } = useMutation({
        mutationFn: async (operatorAuthToken: string) => {
            if (!isAuthenticated) {
                return;
            }

            return launchToken(operatorAuthToken);
        },
        mutationKey: ['launch-token'],
        onSuccess: (_, operatorAuthToken: string) => {
            getBetLinkInitOptions(operatorAuthToken);
        },
    });

    useEffect(() => {
        const operatorAuthToken = uuidV4();

        emitToken(operatorAuthToken);
    }, [accountId, currency, userLang, emitToken]);

    const topOffset = isStandalone() ? '0px' : '78px';

    return (
        <S_Overlay topOffset={topOffset}>
            <S_IFrameWrapper id='img-arena-betlink'>
                <S_CloseFrame onClick={onClose} />
            </S_IFrameWrapper>
        </S_Overlay>
    );
};
