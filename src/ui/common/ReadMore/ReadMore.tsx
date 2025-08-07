import { useEffect, useRef, useState } from 'react';

import { DownArrowIcon, UpArrowIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { I18n } from 'src/ui/common/Language/I18n';

import { S_MarginBox, S_ReadMoreBtn, S_ReadMoreContent } from './styled';
import type { EventClick } from './types';

interface Props {
    text: string;
    type?: 'plainText' | 'html';
    containerHeight?: string;
    lines?: number;
    isOpen?: boolean;
}

const ReadMore = (props: Props) => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleExpand = (event: EventClick) => {
        event.preventDefault();
        event.stopPropagation();
        setExpanded(!expanded);
    };

    const { type = 'plainText', text = '', lines = 3, isOpen = false } = props;

    useEffect(() => {
        const el = containerRef.current;

        if (!el) {
            return;
        }

        if (el.scrollHeight > el.clientHeight) {
            setIsOverflowing(true);
        }
    }, [lines, expanded, isOpen]);

    const formatText = (textValue: string): string => textValue.replace(/(?:\r\n|\r|\n)/g, '<br />');

    const _html = formatText(text);

    return (
        <div className='rm-container'>
            <div ref={containerRef} className='rm-text-wrapper'>
                {type === 'html' ? (
                    <S_ReadMoreContent
                        expanded={expanded}
                        isOverflowing={isOverflowing}
                        lines={lines}
                        dangerouslySetInnerHTML={{ __html: _html }}
                    />
                ) : (
                    <S_ReadMoreContent expanded={expanded} isOverflowing={isOverflowing} lines={lines}>
                        {text}
                    </S_ReadMoreContent>
                )}
            </div>
            {isOverflowing ? (
                <div className='rm-action-button-container'>
                    <S_ReadMoreBtn data-testid='readMore' onClick={toggleExpand}>
                        <span>
                            <I18n
                                langKey={
                                    expanded
                                        ? 'events.selections-group.button.read-less'
                                        : 'events.selections-group.button.read-more'
                                }
                                defaultText={expanded ? 'Read Less' : 'Read More'}
                            />
                        </span>
                        <S_MarginBox>
                            {expanded ? (
                                <UpArrowIcon color={cssColor('--icon-generic-color')} style={{ fontSize: '6px' }} />
                            ) : (
                                <DownArrowIcon color={cssColor('--icon-generic-color')} style={{ fontSize: '6px' }} />
                            )}
                        </S_MarginBox>
                    </S_ReadMoreBtn>
                </div>
            ) : null}
        </div>
    );
};

export default ReadMore;
