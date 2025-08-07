/* eslint-disable @typescript-eslint/no-magic-numbers */
import { waitFor } from '@testing-library/dom';
import { act, renderHook } from '@testing-library/react';
import { vi, describe, test, beforeEach } from 'vitest';

import useIsAppRenderDone from './useIsAppRenderDone';

const mockQuerySelectorAll = vi.fn((selector, options = {}) => {
    switch (selector) {
        case '.loading__standalone':
            return new Array(options.loading__standaloneCount).fill(null);

        default:
            return [];
    }
});

Object.defineProperty(document, 'querySelectorAll', {
    value: mockQuerySelectorAll,
    writable: true,
});

beforeEach(() => {
    mockQuerySelectorAll.mockClear();
});

describe('useIsAppRenderDone', () => {
    test('should return false when loading classes exist', async () => {
        mockQuerySelectorAll.mockImplementation((selector, _options = {}) => {
            if (selector === '.loading__standalone') {
                // Simulate loading__standalone elements '<div class="loading__standalone"></div><div class="loading__standalone"></div>';
                return new Array(2).fill(null);
            }

            return [];
        });

        const { result } = renderHook(() => useIsAppRenderDone(false));

        await act(async () => {});

        expect(mockQuerySelectorAll).toBeCalled();
        expect(result.current).toBe(false);
    });

    test('should return true when no loading__standalone classes exist', async () => {
        mockQuerySelectorAll.mockImplementation((selector, _options = {}) => {
            if (selector === '.loading__standalone') {
                // Simulate 3 elements loading__standalone
                return new Array(3).fill(null);
            }

            return [];
        });

        const { result, rerender } = renderHook(() => useIsAppRenderDone(false));

        await act(async () => {});

        expect(mockQuerySelectorAll).toBeCalled();
        expect(result.current).toBe(false);
        mockQuerySelectorAll.mockClear();
        mockQuerySelectorAll.mockImplementation((selector, _options = {}) => {
            if (selector === '.loading__standalone') {
                // Simulate no elements loading__standalone
                return new Array(0).fill(null);
            }

            return [];
        });

        rerender();
        await act(async () => {});
        await waitFor(() => {
            expect(result.current).toBe(true);
        });
    });

    test('should reset state when reInitParam is true', async () => {
        mockQuerySelectorAll.mockImplementation((selector, _options = {}) => {
            if (selector === '.loading__standalone') {
                // Simulate loading__standalone elements '<div class="loading__standalone"></div><div class="loading__standalone"><div class="loading__standalone"></div>';
                return new Array(2).fill(null);
            }

            return [];
        });
        const { result } = renderHook(() => useIsAppRenderDone(false));
        await act(async () => {});

        expect(result.current).toBeFalsy();

        renderHook(() => useIsAppRenderDone(true));
        await act(async () => {});

        expect(result.current).toBeFalsy();
    });
});
