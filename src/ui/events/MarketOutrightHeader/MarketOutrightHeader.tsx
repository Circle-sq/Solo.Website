import { DownArrowIcon, UpArrowIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { S_MarketHeaderTitle, S_MarketHeaderWrapper, S_MarketHeaderContent } from './styled';
import Terms from './Terms';

export interface Props {
    isOpen: boolean;
    onClick: () => void;
    marketId: number;
    name: string | undefined;
}

const MarketOutrightHeader = ({ isOpen, onClick, marketId, name }: Props) => {
    return (
        <S_MarketHeaderWrapper>
            <S_MarketHeaderContent data-testid='arrowIndicator' onClick={onClick}>
                <S_MarketHeaderTitle>{name}</S_MarketHeaderTitle>
                {isOpen ? (
                    <UpArrowIcon fontSize='xsmall' color={cssColor('--icon-generic-color')} />
                ) : (
                    <DownArrowIcon fontSize='xsmall' color={cssColor('--icon-generic-color')} />
                )}
            </S_MarketHeaderContent>

            {isOpen && <Terms marketId={marketId} />}
        </S_MarketHeaderWrapper>
    );
};

export default MarketOutrightHeader;
