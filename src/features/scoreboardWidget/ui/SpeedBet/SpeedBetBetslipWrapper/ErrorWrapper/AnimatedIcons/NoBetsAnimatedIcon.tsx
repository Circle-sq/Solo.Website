import { CircleIcon, NoBetsIcon } from 'src/features/scoreboardWidget/assets/icons';

import { S_AnimatedIcon } from '../styled';

export const NoBetsAnimatedIcon = () => {
    return (
        <S_AnimatedIcon>
            <CircleIcon />
            <NoBetsIcon />
        </S_AnimatedIcon>
    );
};
