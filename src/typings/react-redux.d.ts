import type { ReactElement } from 'react';
import 'react-redux';

import type { ReduxState } from 'src/appState/redux/types';

declare module 'react-redux' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface DefaultRootState extends ReduxState {}
}

declare module 'react' {
    interface SVGProps<T> extends SVGAttributes<T> {
        // For theme-ui
        success?: boolean;
        error?: boolean;
    }

    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        label?: string | ReactElement;
    }
}
