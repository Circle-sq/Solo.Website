import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

const useTooltipTruncatedText = () => {
    const [isTruncatedText, setTruncatedText] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (ref.current && ref.current.clientWidth < ref.current.scrollWidth) {
            setTruncatedText(true);
        } else {
            setTruncatedText(false);
        }
    }, [ref.current]);

    return { isTruncatedText, ref };
};

export const usePareTruncation = (possibleTitle: string): [string, RefObject<HTMLElement>, RefObject<HTMLElement>] => {
    const { ref: homeRef, isTruncatedText: isHomeTruncatedText } = useTooltipTruncatedText();
    const { ref: awayRef, isTruncatedText: isAwayTruncatedText } = useTooltipTruncatedText();

    let title = '';

    if (isHomeTruncatedText || isAwayTruncatedText) {
        title = possibleTitle;
    }

    return [title, awayRef, homeRef];
};

export const useTruncation = (possibleTitle: string): [string, RefObject<HTMLElement>] => {
    const { ref, isTruncatedText } = useTooltipTruncatedText();

    let title = '';

    if (isTruncatedText) {
        title = possibleTitle;
    }

    return [title, ref];
};
