import type { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';

import { S_ContentIcon } from 'src/ui/common/NavigationList/styled';
import { isSportIconsInitialLoadingSelector } from 'src/common/store/icons/selectors';

import { getSubNavigationIcons } from './helpers';
import { S_SubNavigationIconPlaceholder } from './styled';

interface Props {
    iconUrl: string;
    iconType: string;
    testId?: string;
}

const SubNavigationIcon = ({ iconUrl, iconType, testId }: Props): ReactElement => {
    const isSportIconsInitialLoading = useRecoilValue(isSportIconsInitialLoadingSelector);

    if (isSportIconsInitialLoading) {
        return <S_SubNavigationIconPlaceholder />;
    }

    if (iconUrl) {
        return <S_ContentIcon isLoaded className='mobile-header-nav' src={iconUrl} />;
    }

    return getSubNavigationIcons(iconType, testId);
};

export default SubNavigationIcon;
