import { ThemeProvider } from '@emotion/react';
import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/setup/setup';
import type { ReactNode } from 'react';

import { SoloTheme } from './solo-theme';

const solo = {
    star: SoloTheme,
};

export const renderWithTheme = (ui: ReactNode): RenderResult & { user: UserEvent } => {
    const result = render(<ThemeProvider theme={solo}>{ui}</ThemeProvider>);

    return { ...result, user: userEvent.setup() };
};
