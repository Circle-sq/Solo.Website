import type { PropsWithChildren, ReactNode } from 'react';

import { S_Title, S_TooltipWrapper } from './styled';

interface Props {
    title: ReactNode;
    titleWrap?: boolean;
}

const Tooltip = (props: PropsWithChildren<Props>) => {
    const { children, title, titleWrap = false } = props;

    return (
        <S_TooltipWrapper>
            <S_Title textWrap={titleWrap}>{title}</S_Title>
            {children}
        </S_TooltipWrapper>
    );
};

export default Tooltip;
