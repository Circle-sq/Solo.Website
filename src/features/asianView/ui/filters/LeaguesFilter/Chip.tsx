import Loader from 'src/ui/common/Loader/Loader';

import { S_Chip } from '../styled';

interface Props {
    isLoading?: boolean;
    value?: number;
}

const Chip = ({ isLoading = false, value }: Props) => {
    if (value === undefined) {
        return null;
    }

    if (isLoading) {
        return <Loader />;
    }

    return <S_Chip>{value}</S_Chip>;
};

export default Chip;
