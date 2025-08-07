import type { PropsWithChildren, ReactElement } from 'react';

import { RequestStatus } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';
import Loader from 'src/ui/common/Loader/Loader';
import { NUMBERS } from 'src/utils/constants';

import { S_Message } from './styled';

interface Props {
    status: string;
    count: number;
}

const Messages = ({ status, count, children }: PropsWithChildren<Props>) => {
    const messages: ReactElement[] = [];

    switch (status) {
        case RequestStatus.Error:
            messages.push(
                <I18n
                    langKey='events.list.error'
                    defaultText="Sorry, because of temporary issues we can't load events. Try again."
                />,
            );

            break;

        case RequestStatus.Progress:
            messages.push(
                <Loader
                    testId='loadingEvents'
                    message={<I18n langKey='events.list.loading' defaultText='Loading events...' />}
                />,
            );

            break;

        case RequestStatus.Ready:
            if (count !== NUMBERS.zero) {
                break;
            }

            messages.push(
                <I18n langKey='events.table.empty' defaultText='There are no events being traded. Come back later!' />,
            );

            break;
    }

    return (
        <>
            {messages.length > NUMBERS.zero
                ? messages.map((message, index) => {
                      const key = message?.key || index;

                      return (
                          <S_Message key={key} data-testid={`message_${index}`}>
                              {message}
                          </S_Message>
                      );
                  })
                : children}
        </>
    );
};

export default Messages;
