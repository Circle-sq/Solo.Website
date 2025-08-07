import { cssColor } from '@sc-ui/system';

import SvgElement from 'src/assets/icons/SvgElement/SvgElement';
import type { Testable } from 'src/utils/Testable/types';

const BetOpenIcon = ({ testId = 'testId' }: Testable) => (
    <SvgElement testId={testId}>
        <circle
            cx='8'
            cy='8'
            r='7.5'
            fill={cssColor('--icon-chain-link-bg')}
            stroke={cssColor('--icon-chain-link-stroke')}
            data-testid={`bet-status-icon-${testId}`}
        />
    </SvgElement>
);

export default BetOpenIcon;
