import { observer } from 'mobx-react-lite';
import type { MouseEvent, PropsWithChildren } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { Testable } from 'src/utils/Testable/types';

import type { ParamsType } from './types';

export interface Props extends Testable {
    title?: string;
    linkHref?: string;
    className?: string;
    params?: ParamsType;
    route?: string | null;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
    disabled?: boolean;
    urlParam?: string;
    loading?: boolean;
}

const Link = ({
    children,
    route,
    params,
    className,
    title,
    testId,
    linkHref,
    onClick,
    disabled = false,
    urlParam,
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
        <a
            href={hrefAttribute}
            title={title}
            data-testid={testId}
            className={className}
            onClick={redirect}
            data-param={urlParam}
        >
            {children}
        </a>
    );
};

export default observer(Link);
