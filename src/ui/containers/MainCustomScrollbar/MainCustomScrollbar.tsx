import { observer } from 'mobx-react-lite';
import type { PropsWithChildren } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import type { Scrollbars } from 'react-custom-scrollbars-2';
import { useSetRecoilState } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import { S_ScrolledContent } from 'src/layouts/MainWrapper/styled';
import CustomScrollbar from 'src/ui/common/CustomScrollbar';
import ScrollTopButton from 'src/ui/common/ScrollTopButton/ScrollTopButton';

import { scrollBarAtom } from './store/scrollBar';

const verticalBarPosition = { top: '16px', bottom: '16px' };

interface Props {
    noScrollButton?: boolean;
}

const MainCustomScrollbar = ({ children, noScrollButton }: PropsWithChildren<Props>) => {
    const setSidebarScrollPosition = useSetRecoilState(scrollBarAtom);
    const scrollbarRef = useRef<Scrollbars>(null);

    const {
        router: { route },
    } = useAppStateContext();

    useEffect(() => {
        if (route.name === RouteName.Event) {
            return;
        }

        scrollbarRef.current?.scrollToTop();
    }, [route.name, route.params]);

    const handleClick = useCallback(() => {
        if (scrollbarRef?.current !== null) {
            setSidebarScrollPosition(scrollbarRef.current.getScrollTop());
        }
    }, [setSidebarScrollPosition]);

    const scrollToTop = useCallback(() => {
        if (scrollbarRef?.current !== null) {
            scrollbarRef.current.scrollToTop();
        }
    }, []);

    return (
        <>
            <CustomScrollbar
                ref={noScrollButton ? null : scrollbarRef}
                onItemClick={handleClick}
                verticalBarPosition={verticalBarPosition}
            >
                <S_ScrolledContent>{children}</S_ScrolledContent>
            </CustomScrollbar>
            {noScrollButton ? null : <ScrollTopButton containerRef={scrollbarRef} onClick={scrollToTop} />}
        </>
    );
};

export default observer(MainCustomScrollbar);
