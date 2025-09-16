import type { Testable } from 'src/utils/Testable/types';
import SvgElement from 'src/assets/icons/SvgElement/SvgElement';

const WonIcon = ({ testId = 'testId' }: Testable) => (
    <SvgElement testId={testId}>
        <rect width='100%' height='100%' fill='transparent' />
        <circle cx='8' cy='8' r='7.5' fill='none' stroke='#8BD97F' stroke-width='1' />
        <text
            data-testid={`bet-status-icon-${testId}`}
            x='8'
            y='12'
            text-anchor='middle'
            font-size='11'
            font-family='Noto Sans'
            fill='#8BD97F'
        >
            W
        </text>
    </SvgElement>
);

export default WonIcon;
