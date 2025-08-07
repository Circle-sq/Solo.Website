import { ThemeProvider } from '@emotion/react';
import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/setup/setup';
import type { ReactNode } from 'react';

import { BeteastTheme } from './beteast-theme';

const beteast = {
    star: BeteastTheme,
};

export const renderWithTheme = (ui: ReactNode): RenderResult & { user: UserEvent } => {
    const result = render(<ThemeProvider theme={beteast}>{ui}</ThemeProvider>);

    return { ...result, user: userEvent.setup() };
};
