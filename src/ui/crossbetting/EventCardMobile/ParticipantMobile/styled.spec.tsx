import { screen } from '@testing-library/react';

import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';
import { fontWeight } from '@solo-ui/system';

import { S_ParticipantTitleMobile, S_TimeContainerContent } from './styled';

describe('CrossBettingParticipant', () => {
    it('should render ParticipantTitle with font-weight bold', () => {
        renderWithTheme(<S_ParticipantTitleMobile data-testid='ParticipantTitle' />);
        const span = screen.getByTestId('ParticipantTitle');
        expect(span).toHaveStyleRule('font-weight', fontWeight.medium);
    });

    it('should render TimeContainerContent with styles', () => {
        renderWithTheme(<S_TimeContainerContent data-testid='TimeContainerContent' />);
        const div = screen.getByTestId('TimeContainerContent');
        expect(div).toHaveStyleRule('display', 'flex');
        expect(div).toHaveStyleRule('justify-content', 'space-between');
        expect(div).toHaveStyleRule('display', 'flex');
    });
});
