import classNames from 'classnames';
import type { PropsWithChildren, ReactElement } from 'react';
import { useEffect, useState } from 'react';

import type { Testable } from 'src/utils/Testable/types';

import ArrowIcon from '../../events/EventGroupHeader/ArrowIcon';

import { S_Heading, S_Header, S_Section, S_CollapsibleHeading } from './styles';

interface Props extends Testable {
    title: string | ReactElement;
    className?: string;
    id?: string;
    isToggle?: boolean;
    disabled?: boolean;
    routeParamsId?: string;
    testId?: string;
    isCollapsible?: boolean;
}

const Panel = ({
    id,
    title,
    children,
    testId,
    routeParamsId,
    className = '',
    isToggle = false,
    disabled = false,
    isCollapsible = false,
}: PropsWithChildren<Props>) => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setIsOpen(true);
    }, [routeParamsId]);

    const onToggle = () => {
        if (isToggle === void 0 || id === void 0) {
            return void 0;
        }
        setIsOpen(!isOpen);
    };

    return (
        <S_Section className={classNames('panel', className)} data-testid={testId}>
            <S_Header onClick={onToggle} disabled={disabled} data-testid={`header-${testId}`}>
                {isCollapsible ? (
                    <S_CollapsibleHeading>
                        {title}
                        <ArrowIcon isOpen={isOpen} />
                    </S_CollapsibleHeading>
                ) : (
                    <S_Heading>{title}</S_Heading>
                )}
            </S_Header>
            {isOpen && children}
        </S_Section>
    );
};

export default Panel;
