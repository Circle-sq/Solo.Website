import { useCallback, useState } from 'react';

import { BetStatus } from 'src/common/enums';
import type { MyBet } from 'src/common/types/myBet';

import MultipleBetContentDetails from './MultipleBetContentDetails/MultipleBetContentDetails';
import MultipleBetHeader from './MultipleBetHeader/MultipleBetHeader';
import { S_MultipleBetHeader } from './MultipleBetHeader/styled';

const MultipleBetContent = ({ bet, betStatus }: { bet: MyBet; betStatus: BetStatus }) => {
    const { legs, type: betType } = bet;
    const isSettledBet = bet.status === BetStatus.Settled;

    const [isOpen, setIsOpen] = useState(false);

    const toggleContentDetails = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);

    return (
        <>
            <S_MultipleBetHeader onClick={toggleContentDetails}>
                <MultipleBetHeader betType={betType} betStatus={betStatus} legsCounter={legs.length} isOpen={isOpen} />
            </S_MultipleBetHeader>

            <MultipleBetContentDetails legs={legs} betStatus={betStatus} isSettledBet={isSettledBet} isOpen={isOpen} />
        </>
    );
};

export default MultipleBetContent;
