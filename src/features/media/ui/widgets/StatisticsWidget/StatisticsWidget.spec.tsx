import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import { LANGUAGES } from 'src/utils/constants';

import StatisticsWidget from './StatisticsWidget';

describe('StatisticsWidget', () => {
    beforeEach(() => {
        window.SIR = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = (matchId: string | null) =>
        renderWithAppWrapper(<StatisticsWidget matchId={matchId} language={LANGUAGES.en} />);

    it('should render StatisticsWidget when matchId is available', () => {
        const { getByTestId } = renderComponent('52307509');

        expect(getByTestId('statisticsWidget')).toBeInTheDocument();

        expect(window.SIR).toHaveBeenCalledWith('addWidget', '.sr-widget-2', 'match.generalStatistics', {
            matchId: '52307509',
            disableWidgetHeader: true,
            disablePeriods: true,
        });
    });

    it('should render the error message when matchId is not available', () => {
        const { getByText } = renderComponent(null);

        expect(getByText('No statistics available')).toBeInTheDocument();
        expect(window.SIR).not.toHaveBeenCalled();
    });

    it('should remove the widget when the component unmounts', () => {
        const { unmount } = renderComponent('52307509');

        unmount();
        expect(window.SIR).toHaveBeenCalledWith('removeWidget', document.querySelector('.sr-widget-2'));
    });
});
