import { useEffect, useRef, useState } from 'react';

import BalanceTabFreeBetSection from '@solo-account/components/BalanceTab/BalanceTabFreeBetSection';

import { useAppStateContext } from 'src/appState/AppState';
import { DropdownMenuPlacement } from 'src/common/enums';

import LanguageSelector from '../LanguageSelector';
import { HEIGHT_OFFSET, LANGUAGE_ROW_HEIGHT } from '../utils';

import { S_BottomSection } from './styled';

interface Props {
    languageSelectorExpandable: boolean;
    showFreeBetSection: boolean;
    hasMinHeight: boolean;
    onMenuOpen: () => void;
    onMenuClose: () => void;
    toggleFreeBetsExpanded: () => void;
}

const BottomSection = ({
    languageSelectorExpandable,
    showFreeBetSection,
    hasMinHeight,
    onMenuOpen,
    onMenuClose,
    toggleFreeBetsExpanded,
}: Props) => {
    const languageSelectorRef = useRef<HTMLDivElement>(null);
    const [currentHeight, setCurrentHeight] = useState(0);

    const { language } = useAppStateContext();
    const languageCount = language.getLanguages().length;

    const calculatedHeight = currentHeight + HEIGHT_OFFSET + languageCount * LANGUAGE_ROW_HEIGHT;
    const minHeight = hasMinHeight ? calculatedHeight : 0;

    const placement = languageSelectorExpandable ? DropdownMenuPlacement.Bottom : DropdownMenuPlacement.Top;

    useEffect(() => {
        if (languageSelectorRef.current !== null) {
            const height = languageSelectorRef.current.clientHeight;
            setCurrentHeight(height);
        }
    }, []);

    return (
        <S_BottomSection minHeight={minHeight}>
            <div ref={languageSelectorRef}>
                <LanguageSelector menuPlacement={placement} onMenuOpen={onMenuOpen} onMenuClose={onMenuClose} />
            </div>

            {showFreeBetSection && (
                <BalanceTabFreeBetSection isDesktop={false} toggleHandler={toggleFreeBetsExpanded} />
            )}
        </S_BottomSection>
    );
};

export default BottomSection;
