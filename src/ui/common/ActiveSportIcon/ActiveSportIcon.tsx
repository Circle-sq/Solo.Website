import type { ElementType } from 'react';

import { SportType } from 'src/common/enums';

import { InactiveIcon } from './styled';

interface Props {
    sport?: SportType;
    hasTeam: boolean;
    icon: ElementType;
}

const ActiveSportIcon = ({ sport, hasTeam, icon: ActiveIcon }: Props) => {
    if (hasTeam) {
        const circleIcon = <>&#9679;</>;

        switch (sport) {
            case SportType.Baseball: {
                return <ActiveIcon className='theme-baseball-indicator' />;
            }

            default:
                return <ActiveIcon>{circleIcon}</ActiveIcon>;
        }
    }

    // we need something to replace the emptiness
    return <InactiveIcon />;
};

export default ActiveSportIcon;
