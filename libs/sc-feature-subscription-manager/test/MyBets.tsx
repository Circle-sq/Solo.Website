import map from 'lodash/map';
import type { PropsWithChildren } from 'react';

import { DebugColor } from '../debug/configs';
import { SubKey } from '../subKeys';
import { SubscribeElement } from '../SubscribeElement';

import type { MockBet } from './MockEvent';

interface Props {
    bets: MockBet[];
    handleDelete: (id: number) => void;
}

const eventRevision = 30;

const MyBet = ({ bet, children }: PropsWithChildren<{ bet: MockBet }>) => {
    return (
        <SubscribeElement id={bet.event.id} subKey={SubKey.test_bet} revision={eventRevision}>
            <div>
                <span>bet : {bet.event.name}</span>
                {children}
            </div>
        </SubscribeElement>
    );
};

export const MyBets = ({ bets, handleDelete }: Props) => {
    return (
        <div style={{ color: DebugColor.violet }}>
            <h1>MyBets ({bets.length})</h1>
            {map(bets, (bet: MockBet) => (
                <MyBet key={bet.id} bet={bet}>
                    <button data-testid={`remove-bet-${bet.id}`} onClick={() => handleDelete(bet.id)}>
                        x
                    </button>
                </MyBet>
            ))}
        </div>
    );
};
