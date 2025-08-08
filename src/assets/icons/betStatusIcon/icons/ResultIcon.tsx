import { cssColor } from '@solo-ui/system';

import SvgElement from 'src/assets/icons/SvgElement/SvgElement';
import type { Testable } from 'src/utils/Testable/types';

const ResultIcon = ({ testId = 'testId' }: Testable) => (
    <SvgElement width='8' height='8' viewBox='0 0 10 10' testId={testId}>
        <circle
            cx='5'
            cy='5'
            r='3'
            fill={cssColor('--icon-chain-link-bg')}
            stroke={cssColor('--icon-chain-link-stroke')}
            strokeWidth='1.5'
            data-testid={`bet-status-icon-${testId}`}
        />
    </SvgElement>
);

export default ResultIcon;
