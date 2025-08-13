import { waitFor } from '@testing-library/dom';

import { renderWithTheme } from '@solo-ui/system';

import StakeInput from './StakeInput';

describe('StakeInput', () => {
    it('should render error icon when error is true', () => {
        const { getByRole } = renderWithTheme(<StakeInput error={true} />);
        const errorIcon = getByRole('img');
        expect(errorIcon).toBeInTheDocument();
    });

    it('should not render error icon when error is false', () => {
        const { queryByRole } = renderWithTheme(<StakeInput />);
        const errorIcon = queryByRole('img');
        expect(errorIcon).toBeNull();
    });

    it('should call onChange when changed', async () => {
        const onChangeSpy = vi.fn();
        const handleChange = vi.fn().mockImplementation((e) => onChangeSpy(e.target.value));
        const { getByPlaceholderText, user: userEvent } = renderWithTheme(
            <StakeInput onClick={vi.fn()} onChange={handleChange} value={''} placeholder='Stake' />,
        );

        const input = getByPlaceholderText('Stake');
        await userEvent.type(input, '12');

        expect(onChangeSpy).toHaveBeenCalledWith('1');
        expect(onChangeSpy).toHaveBeenCalledWith('2');
        expect(onChangeSpy).toHaveBeenCalledTimes(2);
    });

    it('should call onClick when clicked', async () => {
        const handleClick = vi.fn();
        const { getByPlaceholderText, user: userEvent } = renderWithTheme(
            <StakeInput onClick={handleClick} placeholder='Stake' />,
        );

        const input = getByPlaceholderText('Stake');
        await waitFor(async () => userEvent.click(input));

        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should be disabled', () => {
        const { getByPlaceholderText } = renderWithTheme(<StakeInput disabled={true} placeholder='Stake' />);

        const input = getByPlaceholderText('Stake');
        expect(input).toBeDisabled();
    });
});
