import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';

import { BreadcrumbLink } from './BreadcrumbLink';

describe('BreadcrumLink', () => {
    const label = <>{`Basketball Betting`}</>;

    it('should render breadcrumbicon', () => {
        const Icon = <svg data-testid='globeIcon' />;
        const counter = 0;
        const liveType = false;

        const { getByTestId, queryByTestId } = renderWithTheme(
            <BreadcrumbLink Icon={Icon} counter={counter} liveType={liveType} label={label} />,
        );

        expect(getByTestId('globeIcon')).toBeTruthy();
        expect(queryByTestId('live-button-label')).toBeFalsy();
    });

    it('should render live button and counter', () => {
        const Icon = <svg data-testid='globeIcon' />;
        const counter = 1;
        const liveType = true;

        const { getByTestId } = renderWithTheme(
            <BreadcrumbLink Icon={Icon} counter={counter} liveType={liveType} label={label} />,
        );

        expect(getByTestId('live-button-label')).toBeTruthy();
        expect(getByTestId('live-button-counter')).toBeTruthy();
    });
});
