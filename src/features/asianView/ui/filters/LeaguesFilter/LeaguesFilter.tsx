import { ClickAwayListener } from '@mui/base';
import { Fade, Popper } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useCallback, useState, type MouseEvent } from 'react';

import { useAppStateContext } from 'src/appState/AppState';

import { competitionLocationsAtomWithQuery } from '../../../store/competitionLocations';
import { competitionsCountAtom } from '../../../store/filters';
import SelectToggle from '../Select/SelectToggle';
import { S_LeaguesDropdownWrapper } from '../styled';

import Chip from './Chip';
import LeaguesDropdown from './LeaguesDropdown';

const SKIDDING = -9;

const LeaguesFilter = () => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const competitionsCount = useAtomValue(competitionsCountAtom);
    const { isFetching } = useAtomValue(competitionLocationsAtomWithQuery);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const onClose = useCallback(() => setAnchorEl(null), []);

    const onToggle = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            if (anchorEl !== null) {
                onClose();
            } else {
                setAnchorEl(event.currentTarget);
            }
        },
        [anchorEl, onClose],
    );

    const open = Boolean(anchorEl);
    const label = getTranslation('asianView.filters.selectLeagues', 'Select Leagues');

    return (
        <SelectToggle
            label={label}
            onToggle={onToggle}
            endAdornment={<Chip isLoading={isFetching} value={competitionsCount} />}
            testId='leagueFilter'
            isOpen={open}
        >
            <Popper
                transition
                open={open}
                anchorEl={anchorEl}
                placement='bottom-start'
                modifiers={[
                    {
                        name: 'offset',
                        options: { offset: [SKIDDING, 0] },
                    },
                ]}
                sx={{ zIndex: 5 }}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={onClose}>
                        <Fade {...TransitionProps} timeout={300}>
                            <S_LeaguesDropdownWrapper>
                                <LeaguesDropdown onClose={onClose} />
                            </S_LeaguesDropdownWrapper>
                        </Fade>
                    </ClickAwayListener>
                )}
            </Popper>
        </SelectToggle>
    );
};

export default LeaguesFilter;
