import { Box } from '@mui/material';

import { cssColor } from '@sc-ui/system';

import type { PlacedBetLeg } from '../../../../api/types/placedBet';

import MultipleBetHeader from './MultipleBetHeader/MultipleBetHeader';
import MultipleBetLegItem from './MultipleBetLegItem/MultipleBetLegItem';
import { S_MultipleBetLegItem } from './styled';

const MultipleBetItem = ({ legs }: { legs: PlacedBetLeg[] }) => {
    return (
        <Box sx={{ backgroundColor: cssColor('--list-primary-item-bg') }}>
            <MultipleBetHeader />

            {legs.map((leg) => {
                return (
                    <S_MultipleBetLegItem key={leg.uuid}>
                        <MultipleBetLegItem leg={leg} />
                    </S_MultipleBetLegItem>
                );
            })}
        </Box>
    );
};

export default MultipleBetItem;
