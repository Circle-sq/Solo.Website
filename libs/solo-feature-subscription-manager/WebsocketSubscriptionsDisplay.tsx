import { Typography } from '@mui/material';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import split from 'lodash/split';
import { Fragment } from 'react';

import { debugConfigs } from './debug/configs';
import type { SubKey } from './subKeys';

interface Props {
    inline: boolean;
    namespace: string;
    subscriptions: Record<string, unknown>;
    onPause?: (channel: string) => void;
    onResume?: (channel: string) => void;
    paused?: (channel: string) => boolean;
    open?: boolean;
}

function Tag({ tag, backgroundColor = '#777' }: { tag: string; backgroundColor?: string }) {
    return (
        <span
            style={{
                display: 'inline-block',
                border: '1px solid gray',
                fontSize: '0.7rem',
                borderRadius: '3px',
                backgroundColor,
                padding: '0 5px',
                lineHeight: '12px',
                color: 'white',
            }}
        >
            #{tag}
        </span>
    );
}

const EVENT_ID_INDEX = 2;
const extractEventId = (channel: string): string => split(channel, ':')[EVENT_ID_INDEX];

export function WebsocketSubscriptionsDisplay({ subscriptions, namespace, open = true }: Props) {
    const ids = sortBy(keys(subscriptions));
    const groups = groupBy(ids, (id: string) => {
        const [prefix, groupName] = id.toLowerCase().split(':');

        if (!groupName) {
            return 'orphans';
        }

        if (prefix === '*') {
            return `${groupName}s`;
        }

        return `[${prefix}]: ${groupName}s`;
    });

    return (
        <>
            <details style={{ textAlign: 'left' }} open={open}>
                <summary>
                    <Typography variant='h2' style={{ display: 'inline' }}>
                        namespace:[{namespace}] (<span data-testid={`${namespace}-events-count`}>{ids.length}</span>)
                    </Typography>
                </summary>

                <div>ids: #refs</div>

                <div data-testid={`${namespace}-websocket-subscription`} style={{ paddingLeft: '10px' }}>
                    {isEmpty(ids)
                        ? 'no subscriptions'
                        : map(keys(groups), (groupName) => (
                              <Group
                                  key={groupName}
                                  header={groupName}
                                  ids={groups[groupName]}
                                  subscriptions={subscriptions}
                              />
                          ))}
                </div>
            </details>
        </>
    );
}

const Group = ({ header, ids, subscriptions }: { header: string; ids: string[] } & Pick<Props, 'subscriptions'>) => {
    return (
        <details open style={{ marginTop: 8 }}>
            <summary>
                {header} [{ids.length}]
            </summary>
            <ol style={{ margin: 0 }}>
                {map(sortBy(ids), (id: string) => (
                    <li key={id}>
                        <span data-testid={`event-${extractEventId(id)}-refs`}>
                            {extractEventId(id)}:
                            {map(keys(subscriptions[id]), (src: SubKey, index: number) => {
                                return (
                                    <Fragment key={`subEl-${id}-${index}`}>
                                        {index !== 0 ? ',' : ''}
                                        <Tag tag={src} backgroundColor={debugConfigs[src].color} />
                                    </Fragment>
                                );
                            })}
                        </span>
                    </li>
                ))}
            </ol>
        </details>
    );
};
