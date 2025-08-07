import type { CSSProperties, MouseEvent, PropsWithChildren } from 'react';

import { validRevision } from 'src/utils/socket-io/utils';

import type { SubKey } from '../subKeys';

import { debugConfigs } from './configs';
import { BorderBox, S_Frame } from './styled';

interface Props {
    id: number | undefined;
    subKey: SubKey;
    title?: string;
    revision?: number;
    style?: CSSProperties;
}

const copyToClipboard = async (e: MouseEvent<HTMLDivElement>, id?: number) => {
    e.preventDefault();
    e.stopPropagation();
    // copy id to clipboard
    await navigator.clipboard.writeText(`${id}`);
};

export const DebugSubscribableElement = ({
    id,
    subKey,
    children,
    title,
    revision,
    style,
}: PropsWithChildren<Props>) => {
    const { align, color, entityType = 'Y' } = debugConfigs[subKey];

    if (!validRevision(revision)) {
        console.info(
            `%c  *** M I S S I N G     R E V I S I O N !*** subKey:${subKey}, id:${id} revision:${revision}`,
            'color:red',
        );
    }

    const [type] = entityType;
    const defaultTitle = `#${subKey}:${type}-${id}|${revision ?? '?'}`;

    return (
        <S_Frame color={color} style={style}>
            <BorderBox
                style={style}
                align={align}
                color={color}
                data-label={title ?? defaultTitle}
                onClick={(e) => void copyToClipboard(e, id)}
            >
                {children}
            </BorderBox>
        </S_Frame>
    );
};
