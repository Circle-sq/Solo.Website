import { Tooltip } from '@mui/material';
import { useWindowWidth } from '@solo-hooks';
import { type PropsWithChildren } from 'react';

import { S_Label } from './styled';
import { useTruncation } from './useTooltipTruncatedText';

interface Props {
    className?: string;
    title?: string | null;
}

const TooltipTruncatedText = ({ className, title, children, ...props }: PropsWithChildren<Props>) => {
    const [currentTitle, ref] = useTruncation(title ?? '');
    const { isTablet } = useWindowWidth();

    if (isTablet) {
        return (
            <Tooltip
                onContextMenu={(e) => e.preventDefault()}
                slotProps={{
                    popper: {
                        disablePortal: true,
                    },
                }}
                title={currentTitle}
            >
                <S_Label {...props} className={className} ref={ref}>
                    {children}
                </S_Label>
            </Tooltip>
        );
    }

    return (
        <S_Label {...props} className={className} title={currentTitle} ref={ref}>
            {children}
        </S_Label>
    );
};

export default TooltipTruncatedText;
