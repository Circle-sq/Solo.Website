import { S_MarketName, S_SelectionMarketName, S_SelectionName } from './styled';

interface Props {
    marketName: string;
    selectionName: string;
}

const SelectionMarketName = ({ marketName, selectionName }: Props) => {
    return (
        <S_SelectionMarketName>
            <S_SelectionName data-testid='selectionName'>{selectionName}</S_SelectionName>
            <S_MarketName data-testid='marketName'>{marketName}</S_MarketName>
        </S_SelectionMarketName>
    );
};

export default SelectionMarketName;
