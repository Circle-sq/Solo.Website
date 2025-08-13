import type { PropsWithChildren } from 'react';

const MessageWrapper = ({ children, loading }: PropsWithChildren & { loading?: boolean }) => {
    return (
        <section className='event-card' data-testid='eventPage'>
            <div className={`event-card__info${loading ? '__loader' : ''}`}>{children}</div>
        </section>
    );
};

export default MessageWrapper;
