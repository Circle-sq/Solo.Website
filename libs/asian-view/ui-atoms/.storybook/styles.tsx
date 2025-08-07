import { css, Global } from '@emotion/react';

import { GreyPalette } from '@sc-ui/system';

export const GlobalStyles = () => (
    <Global
        styles={css`
            body {
                font-family: 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                background-color: ${GreyPalette.grey8};
                overflow: auto;
            }
        `}
    />
);
