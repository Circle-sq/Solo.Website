import type { IconProps } from '../types';
import SvgElement from 'src/assets/icons/SvgElement/SvgElement';

const WarningIcon = ({ className, testId = 'testId' }: IconProps) => (
    <SvgElement className={className} height='26' testId={testId}>
        <path
            d='M14 7.11111H13V5.07937C13 2.27556 10.76 0 8 0C5.24 0 3 2.27556 3 5.07937V7.11111H2C0.9 7.11111 0 8.0254 0 9.14286V19.3016C0 20.419 0.9 21.3333 2 21.3333H14C15.1 21.3333 16 20.419 16 19.3016V9.14286C16 8.0254 15.1 7.11111 14 7.11111ZM8 16.254C6.9 16.254 6 15.3397 6 14.2222C6 13.1048 6.9 12.1905 8 12.1905C9.1 12.1905 10 13.1048 10 14.2222C10 15.3397 9.1 16.254 8 16.254ZM11.1 7.11111H4.9V5.07937C4.9 3.34222 6.29 1.93016 8 1.93016C9.71 1.93016 11.1 3.34222 11.1 5.07937V7.11111Z'
            data-testid={`warning-icon-${testId}`}
            fill='#FEBE3F'
        />
    </SvgElement>
);

export default WarningIcon;
