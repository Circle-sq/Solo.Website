import { FormControlLabel, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import type { SportType } from 'src/common/enums';
import { SpecialMarketsSports } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';

import { hasSpecificSportEventAtom, specialsToggleAtom } from '../../store/atoms';

import { S_SpecialMarketsToggle } from './styled';

const SpecialsMarketToggle = () => {
    const [specialsMarketToggle, setSpecialsMarketToggle] = useRecoilState(specialsToggleAtom);
    const {
        router: { route },
    } = useAppStateContext();

    const [hasSpecificSportEvent, setHasSpecificSportEvent] = useRecoilState(hasSpecificSportEventAtom);

    useEffect(() => {
        setHasSpecificSportEvent(false);
    }, [route.params.sport]);

    useEffect(() => {
        const sport = route.params.sport as SportType;
        setSpecialsMarketToggle(SpecialMarketsSports.includes(sport));
    }, [route.params.sport, setSpecialsMarketToggle]);

    const handleToggle = () => setSpecialsMarketToggle((prev) => !prev);

    const shouldHideToggle =
        !SpecialMarketsSports.includes(route.params.sport as SportType) &&
        !specialsMarketToggle &&
        !hasSpecificSportEvent;

    if (shouldHideToggle) {
        return null;
    }

    return (
        <FormControlLabel
            data-testid='specialsToggle'
            control={<S_SpecialMarketsToggle checked={specialsMarketToggle} onChange={handleToggle} />}
            label={
                <Typography
                    sx={{
                        marginLeft: '6px',
                        fontWeight: 'medium',
                        fontSize: '10px',
                        '@media (max-width:360px)': {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '0.7rem',
                            fontSize: '0.75rem',
                        },
                    }}
                    variant='body4'
                >
                    <I18n langKey='events.coupons.specials.label' defaultText='Specials' />
                </Typography>
            }
        />
    );
};

export default SpecialsMarketToggle;
