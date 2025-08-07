import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import { useEffect, useMemo, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper/types';

import { useAppStateContext } from 'src/appState/AppState';
import { getCompetitionLocation, getCompetitionLocationLabel } from 'src/appState/utils';
import CompetitionLocationIcon from 'src/assets/icons/competitionLocationIcon/CompetitionLocationIcon';
import { SIMULATED_REALITY_LEAGUES } from 'src/config/config';
import { selectedCountryAtom } from 'src/ui/layouts/store/atoms';

import type { AggregationLocation } from '../../types';

import { S_CountriesContainer, S_Country } from './styled';

export interface Props {
    locations: AggregationLocation[];
    selectedId: string | number | null;
    sportId: string;
}

const CountrySelector = ({ locations = [], sportId, selectedId }: Props) => {
    const {
        language: { getTranslation },
        reduxState,
    } = useAppStateContext();
    const setSelectedCountry = useSetRecoilState(selectedCountryAtom);

    const onClick = (country: string | null) => () => setSelectedCountry(country);
    const onlyOneCountry = locations.length === 1;
    const competitionLocation = getCompetitionLocation(sportId);
    const swiperRef = useRef<SwiperCore>();

    const contentSlides: AggregationLocation[] = useMemo(
        () => (locations.length ? [{ key: 'livefilter.all-button', count: 999, label: 'All' }, ...locations] : []),
        [locations],
    );

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.updateSlides();
        }
    }, [contentSlides]);

    const uniqueContentSlides = uniqBy(contentSlides, (slide) => slide.key);
    const orderedContentSlides = orderBy(uniqueContentSlides, ['count'], ['desc']);

    return (
        <S_CountriesContainer>
            <Swiper
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                slidesPerView={'auto'}
                navigation={true}
                modules={[Navigation]}
            >
                {orderedContentSlides.map((slide) => {
                    const isSimulatedRealityLeague = SIMULATED_REALITY_LEAGUES.includes(slide?.label);
                    const competitionTag = isSimulatedRealityLeague ? 'category' : competitionLocation.tag;

                    return (
                        <SwiperSlide key={slide.key}>
                            {!onlyOneCountry && slide.label === 'All' ? (
                                <S_Country selected={!selectedId} onClick={onClick(null)}>
                                    <CompetitionLocationIcon sport={sportId} wrapper='swiper' iconSize='xsmall' />
                                    {getCompetitionLocationLabel(getTranslation, slide.key, slide.label)}
                                </S_Country>
                            ) : (
                                <S_Country
                                    onClick={onClick(slide.key)}
                                    selected={slide.key === selectedId || onlyOneCountry}
                                >
                                    <CompetitionLocationIcon
                                        wrapper='swiper'
                                        location={slide.key}
                                        sport={sportId}
                                        iconSize='xsmall'
                                        locationIcon={reduxState.getCompetitionLocationIconUrl(
                                            competitionTag,
                                            slide.key,
                                        )}
                                        sportLabel={slide.key}
                                    />
                                    {getCompetitionLocationLabel(getTranslation, slide.key, slide.label)}
                                </S_Country>
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </S_CountriesContainer>
    );
};

export default CountrySelector;
