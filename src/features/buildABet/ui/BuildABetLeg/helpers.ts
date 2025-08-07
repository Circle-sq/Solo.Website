import { BetStatus } from 'src/common/enums';

import { statusWithIcons } from './config';

export const hasLegStatusIcon = (status = BetStatus.Open) => statusWithIcons.includes(status);
