import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventModel } from 'src/appState/models/models/EventModel';

interface Props {
    americanMarketIds: (number | undefined)[];
    event: EventModel;
    displayMarketIds: number[];
    isAmericanSports: boolean;
    templateIds: string;
}

const SUSPENDED_ROW_MISSING_REVISION = -18;

export function DebugEventAndMarkets({
    americanMarketIds = [],
    event,
    displayMarketIds,
    isAmericanSports,
    templateIds,
}: Props) {
    const { models } = useAppStateContext();

    if (isEmpty(displayMarketIds) && isEmpty(displayMarketIds)) {
        return 'no markets';
    }

    return (
        <div
            css={{
                padding: '40px 4px 20px 4px ',
            }}
        >
            templates: {templateIds}
            <hr />
            [e:{event.id}]
            {isAmericanSports ? (
                <div>american market ids: {americanMarketIds.join(':')}</div>
            ) : (
                <div>
                    displayMarket ids:
                    {map(displayMarketIds, (mid) => {
                        const market = models.getMarket(mid);

                        return `${mid}|${market?.revision ?? SUSPENDED_ROW_MISSING_REVISION} : `;
                    })}
                </div>
            )}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '16px',
                    border: '2px dotted red',
                    padding: '20px 4px 0px 4px',
                }}
            >
                {map(event.markets, (m) => {
                    const selected = includes(displayMarketIds, m.id);
                    let color: string;
                    color = 'lightgray';

                    if (m.isSuspended) {
                        color = 'red';
                    }

                    if (selected) {
                        color = 'green';
                    }

                    return (
                        <button
                            key={m.id}
                            css={{
                                border: `1px solid ${color}`,
                                borderRadius: '4px',
                                padding: '2px',
                                background: '#333',
                                textAlign: 'center',
                                color,
                                opacity: 0.5,
                                '&:hover': {
                                    opacity: 1,
                                },
                            }}
                            onClick={() => console.info('DEBUG market', m)}
                        >
                            <div>
                                ({m.id} | {m.revision ?? '-17'})
                            </div>
                            <div>{m.template.marketTypeGeneric}</div>
                            <div>suspended: {m.isSuspended ? 'T' : 'F'}</div>
                            <div>display:{m.display ? 'T' : 'F'}</div>
                            <div>displayed:{m.displayed ? 'T' : 'F'}</div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
