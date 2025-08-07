import { Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useLHNSports } from '../../hooks/useLHNSports';

import Item from './Item';
import { S_Loader } from './styled';

const InPlayLHN = () => {
    const { sports, isLoading } = useLHNSports();

    if (isLoading) {
        return <S_Loader />;
    }

    return (
        <Stack spacing={0.5}>
            {sports.map((sport) => (
                <Item key={sport.id} sport={sport} />
            ))}
        </Stack>
    );
};

export default observer(InPlayLHN);
