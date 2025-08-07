import styled from '@emotion/styled';

import type { Testable } from 'src/utils/Testable/types';

const SvgElement = styled.svg`
    width: auto;
    height: auto;
`;

interface Props extends Testable {
    className?: string;
}

const RightIcon = ({ className, testId }: Props) => (
    <SvgElement
        data-testid={testId}
        fill='#fff'
        className={className}
        width={24}
        height={24}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
    >
        <path
            fillRule='evenodd'
            fill='#fill'
            d='M18.342 11.064L7.954.384A1.25 1.25 0 0 0 7.05 0a1.25 1.25 0 0 0-.903.383l-.765.787a1.34 1.34 0 0 0 0 1.857l8.723 8.968-8.733 8.978c-.24.248-.373.577-.373.929 0 .351.133.681.373.928l.765.787c.24.247.561.383.903.383.342 0 .663-.136.903-.383l10.398-10.69c.24-.248.373-.58.372-.931a1.319 1.319 0 0 0-.372-.932z'
        />
    </SvgElement>
);

export default RightIcon;
