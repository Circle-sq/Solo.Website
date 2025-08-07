import { memo } from 'react';

import { DownArrowIcon, UpArrowIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

interface Props {
    isOpen: boolean;
    fontSize?: string;
    color?: string;
}

const ArrowIcon = ({ isOpen, color, fontSize = 'small' }: Props) => {
    const IconComponent = isOpen ? UpArrowIcon : DownArrowIcon;

    return <IconComponent fontSize={fontSize} color={color ?? cssColor('--icon-generic-color')} />;
};

export default memo(ArrowIcon);
