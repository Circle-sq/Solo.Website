import { useAtomValue } from 'jotai';
import { useRecoilValue } from 'recoil';

import { lhnSportAtom } from '@solo-asianView/store/lhn';
import { S_ContentIcon } from '@solo-asianView/ui/lhn/SportListItem/styled';
import SportIcon from '@solo-ui/icons/config/SportIcon';

import { sportIconUrlSelectorFamily } from 'src/common/store/icons/selectors';

import { S_Icon } from './styled';

const SportHeaderIcon = () => {
    const lhnSport = useAtomValue(lhnSportAtom);
    const iconUrl = useRecoilValue(sportIconUrlSelectorFamily(lhnSport));

    if (iconUrl !== undefined) {
        return <S_ContentIcon src={iconUrl} isLoaded />;
    }

    return (
        <S_Icon>
            <SportIcon fontSize='small' sport={lhnSport} />
        </S_Icon>
    );
};

export default SportHeaderIcon;
