import type { GroupBase } from 'react-select';
import { useRecoilValue } from 'recoil';

import SportIcon from '@solo-ui/icons/config/SportIcon';

import { sportIconUrlSelectorFamily } from 'src/common/store/icons/selectors';
import { S_ContentIcon } from 'src/ui/common/NavigationList/styled';
import type { Option } from 'src/common/types/option';

import { S_GroupHeaderWrapper, S_SportIcon } from './styled';

type Props = GroupBase<Option>;

const MediaGroupLabel = (props: Props) => {
    const { label, value } = props as Props & { value: string };

    const sportIconUrl = useRecoilValue(sportIconUrlSelectorFamily(value));

    return (
        <S_GroupHeaderWrapper>
            {sportIconUrl !== undefined ? (
                <S_ContentIcon src={sportIconUrl} isLoaded />
            ) : (
                <S_SportIcon>
                    <SportIcon fontFamily='small' sport={value} />
                </S_SportIcon>
            )}

            {label}
        </S_GroupHeaderWrapper>
    );
};

export default MediaGroupLabel;
