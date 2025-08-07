import type { Props } from './types';
import { ActionButton, ActionLink, SpinnerIcon } from './styled';

const Button = (props: Props) => {
    const {
        type = 'button',
        disabled = false,
        size = 'xs',
        className,
        loading = false,
        onClick,
        children,
        params,
        route,
        color,
        testId,
    } = props;

    const commonProps = {
        size,
        className,
        color,
        disabled,
    };

    return type === 'anchor' ? (
        <ActionLink route={route} params={params} {...commonProps}>
            {children}
        </ActionLink>
    ) : (
        <ActionButton {...commonProps} onClick={onClick} type={type} data-testid={testId}>
            {loading ? <SpinnerIcon /> : children}
        </ActionButton>
    );
};

export default Button;
