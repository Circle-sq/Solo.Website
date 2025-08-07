import type { Testable } from 'src/utils/Testable/types';
import SvgElement from 'src/assets/icons/SvgElement/SvgElement';

const HalfLostIcon = ({ testId = 'testId' }: Testable) => (
    <SvgElement testId={testId}>
        <path
            fill='#FEBE3F'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8 14C6.34315 14 4.84314 13.3284 3.75736 12.2426L5.18231 10.8177C4.45068 10.0907 4 9.09667 4 8.00007C4 7.20841 4.2392 6.47221 4.6448 5.85199L5.404 6.58819C5.17 7.00671 5.04 7.49078 5.04 8.00007C5.04 8.81127 5.37043 9.54862 5.90771 10.0923L10.2473 5.75268C9.69418 5.26918 8.9621 4.97461 8.16 4.97461V6.48734L6.08 4.47037L8.16 2.4534V3.96613C9.24481 3.96613 10.2323 4.36827 10.9727 5.02729L12.2426 3.75736C13.3284 4.84315 14 6.34315 14 8C14 11.3137 11.3137 14 8 14ZM9.97817 10.824L11.1062 11.952L11.9542 11.104L10.8262 9.97603L11.9542 8.84803L11.1062 8.00003L9.97817 9.12803L8.85017 8.00003L8.00217 8.84803L9.13017 9.97603L8.00217 11.104L8.85017 11.952L9.97817 10.824Z'
        />
        <path
            fill='#FEBE3F'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16ZM8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z'
            data-testid={`bet-status-icon-${testId}`}
        />
    </SvgElement>
);

export default HalfLostIcon;
