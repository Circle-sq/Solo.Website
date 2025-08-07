import type { IconProps } from '../types';
import SvgElement from 'src/assets/icons/SvgElement/SvgElement';

const ErrorIcon = ({ className, testId = 'testId' }: IconProps) => (
    <SvgElement className={className} testId={testId}>
        <path
            d='M0 14H16L8 0L0 14ZM8.72727 11.7895H7.27273V10.3158H8.72727V11.7895ZM8.72727 8.8421H7.27273V5.89474H8.72727V8.8421Z'
            data-testid={`error-icon-${testId}`}
            fill='#D34F44'
        />
    </SvgElement>
);

export default ErrorIcon;
