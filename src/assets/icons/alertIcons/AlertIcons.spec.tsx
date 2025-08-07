/* eslint-disable vitest/expect-expect */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';

import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from 'src/assets/icons/alertIcons';
import { AlertIcon } from 'src/ui/common/InfoAlert/types';

import type { IconProps } from '../types';

describe('AlertIcons', () => {
    const defaultProps = {
        className: 'test-className',
    };

    afterEach(() => {
        vi.clearAllMocks();
    });

    const renderIconWithTests = (
        Icon: (props: IconProps) => ReactElement<IconProps>,
        type: string,
        fillSelector: string,
    ) => {
        const { container, getByTestId } = render(<Icon {...defaultProps} />);
        const svgElement = container.querySelector(`.${defaultProps.className}`);
        const iconElement = getByTestId(`${type}-icon-testId`);

        expect(svgElement).toBeInTheDocument();
        expect(iconElement).toBeInTheDocument();
        expect(container.querySelector(fillSelector)).toBeInTheDocument();
    };

    it('should render the ErrorIcon', () => {
        renderIconWithTests(ErrorIcon, AlertIcon.Error, '[fill="#D34F44"]');
    });

    it('should render the WarningIcon', () => {
        renderIconWithTests(WarningIcon, AlertIcon.Warning, '[fill="#FEBE3F"]');
    });

    it('should render the SuccessIcon', () => {
        renderIconWithTests(SuccessIcon, AlertIcon.Success, '[fill="#D6D6D6"]');
    });

    it('should render the InfoItalicIcon', () => {
        renderIconWithTests(InfoIcon, AlertIcon.Info, '[fill="#00A3FE"]');
    });
});
