import { useAppStateContext } from 'src/appState/AppState';
import { S_Container, S_Item } from 'src/ui/common/ButtonGroup/styled';

import type { SortOption } from './types';

interface Props {
    options: SortOption[];
    selectedId?: string;
    setSortValue: (value: string) => void;
}

const SortControllerDesktop = ({ options = [], selectedId, setSortValue = () => undefined }: Props) => {
    const { language } = useAppStateContext();

    const handleSortValue = (id: string) => () => {
        setSortValue(id);
    };

    return (
        <S_Container data-testid='sortController'>
            {options.map(({ id, label }) => (
                <S_Item
                    data-testid={`sort-${id}`}
                    key={id}
                    selected={selectedId === id}
                    className={selectedId === id ? 'active' : ''}
                    onClick={handleSortValue(id)}
                >
                    {language.getTranslation(`event.list.header.${id}`, label)}
                </S_Item>
            ))}
        </S_Container>
    );
};

export default SortControllerDesktop;
