import { useAtom } from 'jotai';

import { I18n } from 'src/ui/common/Language/I18n';

import type { LHNTab } from '../../../enums';
import { lhnTabAtom } from '../../../store/lhn';

import { S_LHNTab } from './styled';

interface Props {
    tab: LHNTab;
    langKey: string;
    defaultText: string;
    testId: string;
}

const Tab = ({ tab, langKey, defaultText, testId }: Props) => {
    const [lhnTab, setLhnTab] = useAtom(lhnTabAtom);

    const changeLHNTab = () => {
        setLhnTab(tab);
    };

    return (
        <S_LHNTab isActive={tab === lhnTab} data-testid={testId} onClick={changeLHNTab}>
            <I18n langKey={langKey} defaultText={defaultText} />
        </S_LHNTab>
    );
};

export default Tab;
