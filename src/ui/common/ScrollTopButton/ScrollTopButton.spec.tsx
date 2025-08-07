import { render } from '@testing-library/react';
import type { RefObject } from 'react';
import type Scrollbars from 'react-custom-scrollbars-2';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ScrollTopButton from './ScrollTopButton';

const OFFSET = 30;
const BUTTON_WIDTH = 35;
const CONTAINER_SIZE = 800;

beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: CONTAINER_SIZE,
    });
});

// Add recoil wrapper
describe.skip('ScrollTopButton', () => {
    it('should calculate left position correctly when no container is provided', async () => {
        const { getByTestId } = render(<ScrollTopButton containerRef={undefined} onClick={vi.fn()} />);

        expect(getByTestId('scroll-top-button')).toHaveStyle(`left: ${CONTAINER_SIZE - BUTTON_WIDTH - OFFSET}px`);
        expect(getByTestId('scroll-top-button')).toHaveStyle('bottom: 30px');
    });

    it('should calculate left position correctly when a container is provided', async () => {
        const container = document.createElement('div');
        const containerRef: RefObject<Scrollbars> = { current: { container } as Scrollbars };

        container.getBoundingClientRect = vi.fn(() => ({ right: CONTAINER_SIZE }) as DOMRect);

        const { getByTestId } = render(<ScrollTopButton containerRef={containerRef} onClick={vi.fn()} />);

        expect(getByTestId('scroll-top-button')).toHaveStyle(`left: ${CONTAINER_SIZE - BUTTON_WIDTH - OFFSET}px`);
        expect(getByTestId('scroll-top-button')).toHaveStyle('bottom: 30px');
    });
});
