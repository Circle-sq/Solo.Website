import { useAtomValue } from 'jotai';
import { useRecoilValue } from 'recoil';

import { lhnSportAtom } from '@sc-asianView/store/lhn';
import { S_ContentIcon } from '@sc-asianView/ui/lhn/SportListItem/styled';

import { sportIconUrlSelectorFamily } from 'src/common/store/icons/selectors';
import { SPORT_ICONS } from 'src/config/sport-icons';

import { S_Icon } from './styled';

const SportHeaderIcon = () => {
    const lhnSport = useAtomValue(lhnSportAtom);
    const iconUrl = useRecoilValue(sportIconUrlSelectorFamily(lhnSport));

    if (iconUrl !== undefined) {
        return <S_ContentIcon src={iconUrl} isLoaded />;
    }

    const sportIcon = SPORT_ICONS[lhnSport] ?? SPORT_ICONS.default;

    return <S_Icon className={sportIcon} />;
};

export default SportHeaderIcon;
