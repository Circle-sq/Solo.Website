import type { PropsWithChildren } from 'react';

const MessageWrapper = ({ children, bwinLoading }: PropsWithChildren & { bwinLoading?: boolean }) => {
    return (
        <section className='event-card' data-testid='eventPage'>
            <div className={`event-card__info${bwinLoading ? '__loader' : ''}`}>{children}</div>
        </section>
    );
};

export default MessageWrapper;
