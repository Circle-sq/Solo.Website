import type { GroupBase } from 'react-select';
import { useRecoilValue } from 'recoil';

import { sportIconUrlSelectorFamily } from 'src/common/store/icons/selectors';
import { SPORT_ICONS } from 'src/config/sport-icons';
import { S_ContentIcon } from 'src/ui/common/NavigationList/styled';
import type { Option } from 'src/ui/crossbetting/FilterDropdown/types';

import { S_GroupHeaderWrapper, S_SportIcon } from './styled';

type Props = GroupBase<Option>;

const MediaGroupLabel = (props: Props) => {
    const { label, value } = props as Props & { value: string };

    const sportIconUrl = useRecoilValue(sportIconUrlSelectorFamily(value));
    const sportIcon = SPORT_ICONS[value] ?? SPORT_ICONS.default;

    return (
        <S_GroupHeaderWrapper>
            {sportIconUrl !== undefined ? (
                <S_ContentIcon src={sportIconUrl} isLoaded />
            ) : (
                <S_SportIcon className={sportIcon} />
            )}

            {label}
        </S_GroupHeaderWrapper>
    );
};

export default MediaGroupLabel;
