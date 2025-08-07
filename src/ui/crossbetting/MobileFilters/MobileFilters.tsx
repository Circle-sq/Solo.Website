import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import type { CSSObjectWithLabel } from 'react-select';

import { useAppStateContext } from 'src/appState/AppState';
import CompetitionFilter from 'src/ui/common/Filters/CompetitionFilter';
import CountryFilter from 'src/ui/common/Filters/CountryFilter';
import SortFilter from 'src/ui/common/Filters/SortFilter';

import { S_TimeFilterWrapper, S_CountryFilterWrapper, S_FiltersWrapper } from './styled';

const MobileFilters = () => {
    const { router } = useAppStateContext();

    const { day, sport, countryId, sortBy } = router.route.params;

    useEffect(() => {
        const {
            params: { sport, day, countryId, sortBy },
            name,
        } = router.route;
        router.redirect(name, { sport, day, countryId, sortBy });
    }, [sport, day, countryId, router, sortBy]);

    return (
        <Box
            sx={{
                mt: '8px',
            }}
        >
            <S_FiltersWrapper>
                <S_TimeFilterWrapper>
                    <SortFilter
                        styles={{
                            valueContainer: (): CSSObjectWithLabel => ({
                                padding: '2px 4px',
                                width: '100%',
                            }),
                            control: (): CSSObjectWithLabel => ({
                                minWidth: '99px',
                            }),
                            menu: (base: CSSObjectWithLabel) => ({
                                ...base,
                                marginTop: '2px',
                                minWidth: '100%',
                                width: 'max-content',
                                boxShadow: '5px 2px 6px rgb(23, 23, 23)',
                                backgroundColor: 'unset',
                            }),
                        }}
                    />
                </S_TimeFilterWrapper>
                <S_CountryFilterWrapper>
                    <CountryFilter
                        className='country-filter'
                        styles={{
                            menu: (base: CSSObjectWithLabel) => ({
                                ...base,
                                minWidth: '100%',
                                width: 'max-content',
                                marginTop: '2px',
                                boxShadow: '0px 4px 6px rgb(23, 23, 23)',
                                backgroundColor: 'unset',
                            }),
                            valueContainer: (base: CSSObjectWithLabel) => ({
                                ...base,
                                paddingRight: '4px',
                            }),
                        }}
                    />
                    <CompetitionFilter
                        styles={{
                            menu: (base: CSSObjectWithLabel) => ({
                                ...base,
                                right: 0,
                                minWidth: '100%',
                                width: 'max-content',
                                marginTop: '2px',
                                boxShadow: '-4px 2px 6px rgb(23, 23, 23)',
                                backgroundColor: 'unset',
                            }),
                            valueContainer: (base: CSSObjectWithLabel) => ({
                                ...base,
                                paddingRight: '4px',
                            }),
                        }}
                        className='competition-filter'
                    />
                </S_CountryFilterWrapper>
            </S_FiltersWrapper>
        </Box>
    );
};

export default observer(MobileFilters);
