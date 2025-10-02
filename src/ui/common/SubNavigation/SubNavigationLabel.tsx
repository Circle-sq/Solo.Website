import { type ReactElement, useEffect, useRef } from 'react';

import { S_SubNavMenuSpan } from './styled';

interface Props {
    testId?: string;
    isNav: boolean;
    isInHeader?: boolean;
    label: string | ReactElement;
}

export const SubNavigationLabel = ({ testId, isNav, isInHeader, label }: Props) => {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (ref.current !== null) {
            isTruncated(ref.current)
                ? ref.current.setAttribute('title', label as string)
                : ref.current.removeAttribute('title');
        }
    }, [label]);

    const isTruncated = (e: HTMLSpanElement) => e.scrollWidth > e.clientWidth;

    return (
        <S_SubNavMenuSpan data-testid={`${testId}Value`} isNav={isNav} isInHeader={isInHeader} ref={ref}>
            {label}
        </S_SubNavMenuSpan>
    );
};
