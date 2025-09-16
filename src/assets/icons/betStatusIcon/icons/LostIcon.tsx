import type { Testable } from 'src/utils/Testable/types';
import SvgElement from 'src/assets/icons/SvgElement/SvgElement';

const LostIcon = ({ testId = 'testId' }: Testable) => (
    <SvgElement testId={testId}>
        <rect width='100%' height='100%' fill='transparent' />
        <circle cx='8' cy='8' r='7.5' fill='none' stroke='#D34F44' stroke-width='1' />
        <text
            data-testid={`bet-status-icon-${testId}`}
            x='8'
            y='12'
            text-anchor='middle'
            font-size='11'
            font-family='Noto Sans'
            fill='#D34F44'
        >
            L
        </text>
    </SvgElement>
);

export default LostIcon;
