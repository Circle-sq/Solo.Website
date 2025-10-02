import isUndefined from 'lodash/isUndefined';
import { useState } from 'react';

import { CupIcon } from '@solo-ui/icons/svg';

import { SIMULATED_REALITY_LEAGUES } from 'src/config/config';
import {
    S_CompetitionLocationItemIcon,
    S_SwiperCompetitionLocationItemIcon,
} from 'src/ui/common/NavigationList/styled';
import { COMPETITION_ICON } from 'src/utils/constants';

import { flags } from './flags';
import { Icon, S_AlignmentBox } from './styled';

interface Props {
    location?: string | null;
    sport?: string;
    locationIcon?: string;
    wrapper?: string;
    sportLabel?: string;
    iconSize?: 'xsmall' | 'small' | 'medium' | 'large'; // 12px | 16px | 24px | 32px
}

const CompetitionLocationIcon = (props: Props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { location, sport, locationIcon, wrapper, sportLabel = '', iconSize = 'small' } = props;

    const S_CompetitionLocationItemIconWrapper =
        wrapper === 'swiper' ? S_SwiperCompetitionLocationItemIcon : S_CompetitionLocationItemIcon;

    const ariaLabel = sportLabel || location || undefined;

    switch (true) {
        case sport !== undefined || SIMULATED_REALITY_LEAGUES.includes(sportLabel): {
            if (locationIcon !== undefined && locationIcon !== COMPETITION_ICON) {
                return (
                    <S_AlignmentBox>
                        <S_CompetitionLocationItemIconWrapper
                            aria-label={ariaLabel}
                            src={locationIcon}
                            isLoaded={isLoaded}
                            alt={location as string}
                            onLoad={() => setIsLoaded(true)}
                        />
                    </S_AlignmentBox>
                );
            } else {
                const flag = flags[location as string];

                if (!isUndefined(flag)) {
                    return <Icon src={flag} fontSize={iconSize} aria-label={ariaLabel} />;
                }

                return (
                    <S_AlignmentBox>
                        <CupIcon fontSize='small' />
                    </S_AlignmentBox>
                );
            }
        }

        case locationIcon === COMPETITION_ICON || SIMULATED_REALITY_LEAGUES.includes(sportLabel): {
            return (
                <S_AlignmentBox>
                    <CupIcon fontSize='small' />
                </S_AlignmentBox>
            );
        }

        default: {
            const defaultCountryFlag = flags['WRL'];
            const detectCountryFlag = location !== undefined && location !== null ? flags[location] : undefined;
            const countryFlag = detectCountryFlag ?? defaultCountryFlag;

            return <Icon src={countryFlag} fontSize={iconSize} aria-label={ariaLabel} />;
        }
    }
};

export default CompetitionLocationIcon;
