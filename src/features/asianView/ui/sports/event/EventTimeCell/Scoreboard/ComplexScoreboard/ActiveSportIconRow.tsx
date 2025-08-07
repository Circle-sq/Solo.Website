import type { SportType } from 'src/common/enums';
import ActiveSportIcon from 'src/ui/common/ActiveSportIcon/ActiveSportIcon';

import { S_NumberRow, S_EventRowActiveIcon } from '../styled';

const ActiveSportIconRow = ({ sport, turnValue }: { sport?: SportType; turnValue?: string }) => (
    <span>
        <S_NumberRow>
            <ActiveSportIcon sport={sport} hasTeam={turnValue === 'Team01'} icon={S_EventRowActiveIcon} />
        </S_NumberRow>
        <S_NumberRow>
            <ActiveSportIcon sport={sport} hasTeam={turnValue === 'Team02'} icon={S_EventRowActiveIcon} />
        </S_NumberRow>
    </span>
);

export default ActiveSportIconRow;
