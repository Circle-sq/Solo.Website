import type { PropsWithChildren } from 'react';

function MockComponent({ children, className }: PropsWithChildren<{ className?: string }>) {
    return <div className={className}>{children}</div>;
}

export default MockComponent;
