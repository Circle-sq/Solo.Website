import type { ReactElement } from 'react';

import type { Testable } from 'src/utils/Testable/types';

export interface Filter extends Testable {
    id: string;
    label: ReactElement | string | null;
}
