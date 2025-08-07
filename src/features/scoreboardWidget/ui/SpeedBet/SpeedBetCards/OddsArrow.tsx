import { ArrowUpDiagonalIcon, ArrowDownDiagonalIcon } from '@sc-ui/icons/svg';

import { PriceChange } from 'src/common/enums';
// TODO NX:a domain-utils candidate
import usePriceChange from 'src/utils/hooks/usePriceChange';

import { S_OddsChangeArrow } from './styled';

interface Props {
    price: number | undefined;
}

const OddsArrow = ({ price }: Props) => {
    const { priceDirection } = usePriceChange(price);

    if (priceDirection === null) {
        return null;
    }

    return (
        <S_OddsChangeArrow>
            {priceDirection === PriceChange.Up ? <ArrowUpDiagonalIcon /> : <ArrowDownDiagonalIcon />}
        </S_OddsChangeArrow>
    );
};

export default OddsArrow;
