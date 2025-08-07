import { observer } from 'mobx-react-lite';
import type { MouseEvent, PropsWithChildren } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { Testable } from 'src/utils/Testable/types';

import { NewLinkWrapper } from './styled';

export interface Props extends Testable {
    route?: string;
    params?: Record<string, string | number | null | undefined>;
    className?: string;
    size?: 'large' | 'medium' | 'small' | 'xs';
    isButton?: boolean;
    onClick?: (e: MouseEvent) => void;
    disabled?: boolean;
    linkHref?: string;
}

const Link = ({
    size,
    children,
    route,
    params,
    className,
    isButton,
    testId,
    linkHref,
    onClick,
    disabled = false,
}: PropsWithChildren<Props>) => {
    const { router } = useAppStateContext();

    const hrefAttribute = linkHref ?? router.buildUrl(route, params);

    const redirect = (e: MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
            e.preventDefault();
        }

        if (onClick) {
            onClick(e);
        }

        if (e.defaultPrevented) {
            return;
        }

        e.preventDefault();

        router.redirect(route, params);

        if (route && typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    };

    return (
        <NewLinkWrapper
            href={hrefAttribute}
            data-testid={testId}
            className={className}
            onClick={redirect}
            isButton={isButton}
            size={size}
        >
            {children}
        </NewLinkWrapper>
    );
};

export default observer(Link);
