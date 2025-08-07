interface BaseBody<TId = number | string> {
    event?: { id: TId };
    market?: { id: TId };
}

export const normalizeBody = <TBody extends BaseBody>({
    event,
    market,
    ...body
}: TBody): BaseBody<number> & Omit<TBody, 'event' | 'market'> => {
    return {
        ...body,
        ...(event !== undefined ? { event: { ...event, id: +event.id } } : {}),
        ...(market !== undefined ? { market: { ...market, id: +market.id } } : {}),
    };
};
