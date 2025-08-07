import { Global, css } from '@emotion/react';

const defaultRootStyles = css`
    html,
    body,
    #root,
    #app {
        width: unset;
        height: unset;
        margin: 0;
        padding: 0;
        overflow: unset;
    }
`;

export const DefaultRootStyles = () => <Global styles={defaultRootStyles} />;
