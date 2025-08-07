import MockComponent from '@sc-tests/unit/mocks/MockComponent';
import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import LoginMessage from './LoginMessage';

vi.mock('src/utils/Router/Link', () => ({ default: MockComponent }));

describe('LoginMessage', () => {
    it('should render links', async () => {
        const { queryByText, findByText } = renderWithAppWrapper(
            <LoginMessage message='To watch live videos, please [loginLink].' />,
        );

        const loginLink = await findByText(/log in/i);
        const registerLink = queryByText(/register now/i);

        expect(loginLink).not.toBeNull();
        expect(registerLink).toBeNull();
    });
});
