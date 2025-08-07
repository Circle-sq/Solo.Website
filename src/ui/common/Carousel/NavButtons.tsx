import { LeftArrowIcon, RightArrowIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { S_NavigationButton } from './styled';
import type { ArrowSize } from './types';

interface Props {
    offset: number;
    themeColor?: 'dark';
    arrowSize?: ArrowSize;
    isNextButtonHidden?: boolean;
}

const NavButtons = ({ offset, themeColor, arrowSize, isNextButtonHidden = false }: Props) => {
    return (
        <>
            <S_NavigationButton
                className='swiper-nav-prev swiper-arrow'
                position='left'
                colorTheme={themeColor}
                offset={offset}
                size={arrowSize}
            >
                <LeftArrowIcon color={cssColor('--icon-light-color')} />
            </S_NavigationButton>
            <S_NavigationButton
                className='swiper-nav-next swiper-arrow'
                position='right'
                colorTheme={themeColor}
                offset={offset}
                size={arrowSize}
                isHidden={isNextButtonHidden}
            >
                <RightArrowIcon color={cssColor('--icon-light-color')} />
            </S_NavigationButton>
        </>
    );
};

export default NavButtons;
