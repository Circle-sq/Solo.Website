import isEmpty from 'lodash/isEmpty';
import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { SwiperProps } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';

import { useAppStateContext } from 'src/appState/AppState';
import { AnchorTarget, type Notification as Banner } from 'src/appState/redux/types';
import SwiperCarousel from 'src/ui/common/Carousel/SwiperCarousel';

import { generateTargetName } from '../utils/helpers';

import { ActionButton, S_BannersContainer, Content, Description, Image, Overlay, SlideAnchor, Title } from './styled';

const BaseBanners = ({ banners }: { banners: Banner[] }) => {
    const {
        language: { getTranslation },
        router,
    } = useAppStateContext();

    const SLIDE_MAX_WIDTH = 768;
    const TOTAL_SIDES = 2;
    const DEFAULT_OFFSET = 0;
    const AUTOPLAY_DELAY = 8000;

    const containerRef = useRef<HTMLDivElement>(null);

    const [navButtonsOffset, setNavButtonsOffset] = useState(DEFAULT_OFFSET);

    const calculateNavButtonsOffset = () => {
        if (containerRef !== null && containerRef.current !== null) {
            const containerWidth = containerRef.current.offsetWidth;
            setNavButtonsOffset(
                Math.round(
                    containerWidth > SLIDE_MAX_WIDTH
                        ? (containerWidth - SLIDE_MAX_WIDTH) / TOTAL_SIDES
                        : DEFAULT_OFFSET,
                ),
            );
        }
    };

    useEffect(() => {
        calculateNavButtonsOffset();
    }, []);

    const options: SwiperProps = {
        loop: true,
        slidesPerView: 1,
        centeredSlides: true,
    };

    const onOpenLink = (event: MouseEvent<HTMLAnchorElement>, target: AnchorTarget, url: string, id: number) => {
        event.preventDefault();

        const { href } = event.currentTarget;

        if (target === AnchorTarget.SAME_TAB) {
            const parsedUrl = new URL(href);
            const [page, id, sport] = parsedUrl.pathname.split('/').filter(Boolean);
            router.redirect(page, { id: id, slug: sport });

            return;
        }

        if (target === AnchorTarget.NEW_WINDOW) {
            const { innerWidth: width, innerHeight: height } = window;
            const windowOpenOptions = `width=${width},height=${height},resizable,scrollbars,status`;
            window.open(href, generateTargetName(url, id), windowOpenOptions);

            return;
        }

        const openTabIn = target === AnchorTarget.NEW_TAB ? generateTargetName(url, id) : '_self';
        window.open(href, openTabIn);
    };

    return (
        <S_BannersContainer ref={containerRef}>
            <SwiperCarousel
                options={options}
                themeColor='dark'
                autoplayDelay={AUTOPLAY_DELAY}
                navButtonsOffset={navButtonsOffset}
            >
                {banners.map(({ id, background, content, buttonUrl, buttonLabel, openUrl, title }) => {
                    const { url, altText } = background;

                    const alt = altText ?? title ?? getTranslation('banner.image.alt.text', 'Banner Image');

                    const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
                        onOpenLink(event, openUrl, url, id);
                    };

                    return (
                        <SwiperSlide key={id}>
                            <SlideAnchor data-testid={`banner-${id}`} href={buttonUrl ?? ''} onClick={onClick}>
                                <Image loading='lazy' src={url} alt={alt} />

                                {!isEmpty(content) && (
                                    <>
                                        <Overlay />
                                        <Content>
                                            {!isEmpty(title) && <Title>{title}</Title>}
                                            <Description dangerouslySetInnerHTML={{ __html: content! }} />
                                            {isEmpty(buttonLabel) && (
                                                <ActionButton size='small'>{buttonLabel}</ActionButton>
                                            )}
                                        </Content>
                                    </>
                                )}
                            </SlideAnchor>
                        </SwiperSlide>
                    );
                })}
            </SwiperCarousel>
        </S_BannersContainer>
    );
};

export default BaseBanners;
