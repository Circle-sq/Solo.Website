import classNames from 'classnames';
import isNil from 'lodash/isNil';
import throttle from 'lodash/throttle';
import type { CSSProperties, PropsWithChildren, SyntheticEvent } from 'react';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars-2';
import { useSetRecoilState } from 'recoil';

import { scrollBarTopPositionAtom } from '../../containers/MainCustomScrollbar/store/scrollBar';

import { Track, Thumb, S_Viewport, S_ScrollContainer, S_ScrolledContent } from './styled';

interface Props {
    disabled?: boolean;
    cssPosition?: string;
    position?: string;
    verticalBarPosition?: Record<string, string>;
    horizontalBarPosition?: Record<string, string>;
    eventSelect?: boolean;
    onItemClick?: () => void;
    viewPortStyles?: Record<string, string>;
    showScrollToTopButton?: boolean;
}

const CustomScrollbar = forwardRef<Scrollbars, Props & ScrollbarProps>(function CustomScrollbar(props, ref) {
    const {
        disabled = false,
        children,
        position,
        verticalBarPosition,
        horizontalBarPosition,
        eventSelect = false,
        cssPosition,
        onItemClick,
        viewPortStyles,
        showScrollToTopButton = true,
    } = props;

    const handlePosition = useRef('0');
    const scrolledContentRef = useRef<HTMLDivElement>(null);

    const [scrolledContentHeight, setScrolledContentHeight] = useState(0);
    const setScrollTopPosition = useSetRecoilState(scrollBarTopPositionAtom);

    const renderView = useCallback(
        ({ style, ...props }: { style: CSSProperties }) => {
            const empty = 0;

            const { marginRight = empty } = style;
            const padding = Math.abs(parseFloat(String(marginRight)));

            handlePosition.current = padding === empty ? '0' : '-12px';

            const styles = {
                ...style,
                paddingRight: `${padding}px`,
                ...viewPortStyles,
                ...(typeof cssPosition !== 'undefined' ? { position: cssPosition } : {}),
            } as CSSProperties;

            return <S_Viewport {...props} style={styles} data-showscrolltotopbutton={showScrollToTopButton} />;
        },
        [cssPosition, viewPortStyles, scrolledContentHeight],
    );

    const renderTrackHorizontal = useCallback(
        ({ style, ...props }: { style: CSSProperties }) => {
            const styles = {
                ...style,
                height: '8px',
                bottom: 0,
                ...horizontalBarPosition,
            } as CSSProperties;

            return <Track direction='horizontal' {...props} style={styles} position={position} />;
        },
        [horizontalBarPosition, position],
    );

    const renderTrackVertical = useCallback(
        ({ style, ...props }: { style: CSSProperties }) => {
            const className = classNames({ force_right: eventSelect });
            const styles = {
                ...style,
                width: '8px',
                right: handlePosition.current,
                ...verticalBarPosition,
            } as CSSProperties;

            return <Track direction='vertical' {...props} style={styles} position={position} className={className} />;
        },
        [position, verticalBarPosition, eventSelect],
    );

    const renderThumb = useCallback(
        (props: PropsWithChildren<Record<string, CSSProperties>>) => <Thumb {...props} />,
        [],
    );

    useEffect(() => {
        if (isNil(scrolledContentRef.current)) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => {
            setScrolledContentHeight(scrolledContentRef.current?.scrollHeight as number);
        });
        resizeObserver.observe(scrolledContentRef.current as Element);

        return () => resizeObserver.disconnect();
    }, []);

    if (disabled) {
        return <>{children}</>;
    }

    const handleSetScrollTopPosition = (event: SyntheticEvent) => {
        if ((event.target as HTMLElement).dataset.showscrolltotopbutton === 'false') {
            setScrollTopPosition(0);

            return;
        }

        if (ref) {
            setScrollTopPosition((event.target as HTMLElement).scrollTop);
        } else {
            setScrollTopPosition(0);
        }
    };

    return (
        <S_ScrollContainer
            ref={ref}
            key='custom-scrollbar'
            autoHide={false}
            hideTracksWhenNotNeeded={true}
            renderView={renderView}
            renderTrackHorizontal={renderTrackHorizontal}
            renderTrackVertical={renderTrackVertical}
            renderThumbHorizontal={renderThumb}
            renderThumbVertical={renderThumb}
            onClick={onItemClick}
            onScroll={throttle(handleSetScrollTopPosition, 300)}
        >
            <S_ScrolledContent ref={scrolledContentRef} data-scroll-content position={position}>
                {children}
            </S_ScrolledContent>
        </S_ScrollContainer>
    );
});
export default CustomScrollbar;
