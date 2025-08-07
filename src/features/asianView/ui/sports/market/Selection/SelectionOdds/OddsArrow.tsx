import BlueArrowDownIcon from '@sc-asianView/icons/BlueArrowDownIcon';
import RedArrowUpIcon from '@sc-asianView/icons/RedArrowUpIcon';

import { PriceChange } from 'src/common/enums';
import usePriceChange from 'src/utils/hooks/usePriceChange';

import { S_OddsChangeArrow } from '../styled';

interface Props {
    decimalPrice: number | undefined;
    offsetRight?: string;
}

const OddsArrow = ({ decimalPrice, offsetRight }: Props) => {
    const { priceDirection } = usePriceChange(decimalPrice);

    if (priceDirection === null) {
        return null;
    }

    return (
        <S_OddsChangeArrow offsetRight={offsetRight}>
            {priceDirection === PriceChange.Up ? <RedArrowUpIcon /> : <BlueArrowDownIcon />}
        </S_OddsChangeArrow>
    );
};

export default OddsArrow;
