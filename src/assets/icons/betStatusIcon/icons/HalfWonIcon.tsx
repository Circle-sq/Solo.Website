import type { Testable } from 'src/utils/Testable/types';
import SvgElement from 'src/assets/icons/SvgElement/SvgElement';

const HalfWonIcon = ({ testId = 'testId' }: Testable) => (
    <SvgElement testId={testId}>
        <path
            fill='#8BD97F'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M3.75736 12.2426C4.84314 13.3284 6.34315 14 8 14C11.3137 14 14 11.3137 14 8C14 6.34315 13.3284 4.84315 12.2426 3.75736L10.9727 5.02729C10.2323 4.36827 9.24481 3.96613 8.16 3.96613V2.4534L6.08 4.47037L8.16 6.48734V4.97461C8.9621 4.97461 9.69418 5.26918 10.2473 5.75268L5.90771 10.0923C5.37043 9.54862 5.04 8.81127 5.04 8.00007C5.04 7.49078 5.17 7.00671 5.404 6.58819L4.6448 5.85199C4.2392 6.47221 4 7.20841 4 8.00007C4 9.09667 4.45068 10.0907 5.18231 10.8177L3.75736 12.2426ZM9.51467 12.4501L9.5232 12.4416L9.53173 12.4587L12.5525 9.43786L11.648 8.53333L9.5232 10.6496L8.3712 9.49759L7.46667 10.4021L9.51467 12.4501Z'
        />
        <path
            fill='#8BD97F'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M16 8C16 12.4 12.4 16 8 16C3.6 16 0 12.4 0 8C0 3.6 3.6 0 8 0C12.4 0 16 3.6 16 8ZM15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z'
            data-testid={`bet-status-icon-${testId}`}
        />
    </SvgElement>
);

export default HalfWonIcon;
