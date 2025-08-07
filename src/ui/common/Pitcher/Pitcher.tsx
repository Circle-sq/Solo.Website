import { Tooltip } from '@mui/material';
import { useRef } from 'react';

import type { Pitchers } from 'src/common/types/event';

import { S_PitcherBox, S_PitcherIcon, S_PitcherName } from './styled';

interface Props {
    type: Pitchers['role'];
    pitchers: { home: string; away: string };
    iconPosition?: 'left' | 'right';
    invert?: boolean;
}

const Pitcher = ({ type, pitchers, iconPosition = 'left', invert = false }: Props) => {
    const textRef = useRef<HTMLDivElement>(null);

    const pitcherName = pitchers[type];

    return (
        <Tooltip
            data-testid='pitcher-tooltip'
            title={textRef.current?.offsetWidth !== textRef.current?.scrollWidth ? pitcherName : ''}
        >
            <S_PitcherBox>
                <S_PitcherIcon data-testid='pitcher-icon' iconPosition={iconPosition} invert={invert} />
                <S_PitcherName ref={textRef}>{pitcherName}</S_PitcherName>
            </S_PitcherBox>
        </Tooltip>
    );
};

export default Pitcher;
