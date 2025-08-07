import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { useAppStateContext } from 'src/appState/AppState';

import { Lines } from '../../../enums';
import { linesFilterAtom } from '../../../store/filters';
import { lineOptions } from '../configs';
import Select from '../Select/Select';

const LinesFilter = () => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const [linesFilter, setLinesFilter] = useAtom(linesFilterAtom);

    useEffect(() => {
        return () => {
            setLinesFilter(Lines.Three);
        };
    }, []);

    const label = getTranslation(`asianView.filters.lines.${linesFilter}`, lineOptions[linesFilter].defaultText);

    return (
        <Select
            testId='linesFilter'
            label={label}
            value={linesFilter}
            options={lineOptions}
            onChange={setLinesFilter}
            width={88}
        />
    );
};

export default LinesFilter;
