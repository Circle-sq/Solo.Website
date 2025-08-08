import type { MouseEvent, PropsWithChildren } from 'react';

import { DownArrowIcon, LockIcon } from '@solo-ui/icons/svg';
import { DarkBluePalette, cssColor } from '@solo-ui/system';

import { S_MarketHeaderTitle, S_MarketHeaderWrapper, S_MarketHeaderContent, S_TitleWrapper } from './styled';

interface Props {
    name: string;
    isOpen: boolean;
    isSuspended?: boolean;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const getIcon = (isSuspended: boolean, isOpen: boolean) => {
    if (isSuspended) {
        return <LockIcon fontSize='small' color={DarkBluePalette.darkBlue5} />;
    }

    if (!isOpen) {
        return <DownArrowIcon fontSize='small' color={cssColor('--icon-generic-color')} />;
    }
};

const MarketHeader = ({ onClick, isOpen, isSuspended = false, name, children }: PropsWithChildren<Props>) => {
    const icon = getIcon(isSuspended, isOpen);
    const handleOnClick = isSuspended ? undefined : onClick;

    return (
        <S_MarketHeaderWrapper isOpen={isOpen && !isSuspended}>
            <S_MarketHeaderContent isSuspended={isSuspended} onClick={handleOnClick}>
                <S_TitleWrapper>
                    <S_MarketHeaderTitle>{name}</S_MarketHeaderTitle>
                    {children}
                </S_TitleWrapper>
                {icon}
            </S_MarketHeaderContent>
        </S_MarketHeaderWrapper>
    );
};

export default MarketHeader;
