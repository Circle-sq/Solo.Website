import type { ReactElement, ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

import { S_ContentIcon } from 'src/ui/common/NavigationList/styled';
import { isSportIconsInitialLoadingSelector } from 'src/common/store/icons/selectors';

import { S_SubNavigationIconPlaceholder } from './styled';

interface Props {
    iconUrl: string;
    Icon: ReactNode;
    testId?: string;
}

const SubNavigationIcon = ({ iconUrl, Icon }: Props): ReactElement => {
    const isSportIconsInitialLoading = useRecoilValue(isSportIconsInitialLoadingSelector);

    if (isSportIconsInitialLoading) {
        return <S_SubNavigationIconPlaceholder />;
    }

    if (iconUrl) {
        return <S_ContentIcon isLoaded className='mobile-header-nav' src={iconUrl} />;
    }

    return Icon as ReactElement;
};

export default SubNavigationIcon;
