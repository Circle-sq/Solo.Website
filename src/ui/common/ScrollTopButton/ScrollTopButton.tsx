import { useWindowWidth } from '@solo-hooks';
import debounce from 'lodash/debounce';
import { type MouseEventHandler, type RefObject, useEffect, useState } from 'react';
import type Scrollbars from 'react-custom-scrollbars-2';
import { useRecoilValue } from 'recoil';

import { ScrollTopIcon } from '@solo-ui/icons/svg';

import { useCustomScroll } from 'src/appState/customHooks';
import { quickBetAnimationStateSelector } from 'src/ui/betting/store/selectors';
import { QuickBetAnimationState } from 'src/ui/betting/store/types';
import { scrollBarTopPositionAtom } from 'src/ui/containers/MainCustomScrollbar/store/scrollBar';

import { S_ScrollTopButton } from './styled';

const WIDTH = 35;

const RIGHT_OFFSET = 30;
const BOTTOM_OFFSET = 30;
const BOTTOM_OFFSET_QUICK_BET_ACTIVE = 60;
const SCROLL_TOP_OFFSET = 100;

const DEBOUNCE_DELAY = 10;

interface Props {
    containerRef?: RefObject<Scrollbars>;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const useVisibleScrollTopButton = () => {
    const { isScrollStarted: visible } = useCustomScroll();
    const scrollTopPosition = useRecoilValue(scrollBarTopPositionAtom);

    return visible && scrollTopPosition > SCROLL_TOP_OFFSET;
};

const ScrollTopButton = ({ containerRef, onClick }: Props) => {
    const { isTabletSmall } = useWindowWidth();

    const quickBetAnimationState = useRecoilValue(quickBetAnimationStateSelector);
    const isPreview = quickBetAnimationState === QuickBetAnimationState.Preview;

    const visible = useVisibleScrollTopButton();
    const bottomOffset = isTabletSmall && isPreview ? BOTTOM_OFFSET_QUICK_BET_ACTIVE : BOTTOM_OFFSET;

    const [position, setPosition] = useState({
        left: getLeftPosition(containerRef?.current?.container),
        bottom: bottomOffset,
    });

    useEffect(() => {
        const onResize = debounce(() => {
            setPosition({ left: getLeftPosition(containerRef?.current?.container), bottom: bottomOffset });
        }, DEBOUNCE_DELAY);

        window.addEventListener('resize', onResize);
        onResize();

        return () => {
            window.removeEventListener('resize', onResize);
            onResize.cancel();
        };
    }, [containerRef, bottomOffset]);

    return (
        <S_ScrollTopButton
            data-testid='scroll-top-button'
            visible={visible}
            left={position.left}
            bottom={position.bottom}
            onClick={onClick}
        >
            <ScrollTopIcon />
        </S_ScrollTopButton>
    );
};

const getLeftPosition = (container: HTMLDivElement | undefined): number => {
    let containerRightEdge = window.innerWidth;

    if (container !== undefined) {
        containerRightEdge = container.getBoundingClientRect().right;
    }

    return containerRightEdge - WIDTH - RIGHT_OFFSET;
};

export default ScrollTopButton;
