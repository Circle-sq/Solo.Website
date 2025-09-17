import type { Testable } from 'src/utils/Testable/types';
import SvgElement from 'src/assets/icons/SvgElement/SvgElement';

const VoidIcon = ({ testId = 'testId' }: Testable) => (
    <SvgElement testId={testId}>
        <rect width='100%' height='100%' fill='transparent' />
        <circle cx='8' cy='8' r='7.5' fill='none' stroke='#FEBE3F' strokeWidth='1' />
        <text
            data-testid={`bet-status-icon-${testId}`}
            x='8'
            y='12'
            textAnchor='middle'
            fontSize='11'
            fontFamily='Noto Sans'
            fill='#FEBE3F'
        >
            V
        </text>
    </SvgElement>
);

export default VoidIcon;
