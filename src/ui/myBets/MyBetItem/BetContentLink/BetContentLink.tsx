import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';

import { slug } from 'src/utils/deburr';

import { S_BetContentInfo, S_BetContent, S_ContentLink } from './styled';

export interface Props {
    eventId: number;
    eventName: string;
    disabled: boolean;
    onClick?: () => void;
}

const BetContentLink = ({ eventId, eventName, disabled, children, onClick }: PropsWithChildren<Props>) => {
    const linkParams = useMemo(
        () => ({
            id: eventId,
            slug: slug(eventName),
        }),
        [eventId, eventName],
    );

    return (
        <S_ContentLink route='event' params={linkParams} disabled={disabled} onClick={onClick}>
            <S_BetContent>
                <S_BetContentInfo>{children}</S_BetContentInfo>
            </S_BetContent>
        </S_ContentLink>
    );
};

export default BetContentLink;
