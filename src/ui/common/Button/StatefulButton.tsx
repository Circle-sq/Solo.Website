import { Spinner } from './spinner';
import { ActionButton } from './styled';
import type { ActionButtonProps } from './types';

const StatefulButton = (props: ActionButtonProps) => {
    const { disabled = false, size = 'xs', className, loading = false, onClick, children, color, testId } = props;

    return (
        <ActionButton
            type='button'
            data-testid={testId}
            className={className}
            size={size}
            color={color}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
            {loading && <Spinner testId='spinner' />}
        </ActionButton>
    );
};

export default StatefulButton;
