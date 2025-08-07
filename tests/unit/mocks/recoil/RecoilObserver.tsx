import { useEffect } from 'react';
import { RecoilState, type SetterOrUpdater, useRecoilState } from 'recoil';

interface Props<T> {
    node: RecoilState<T>;
    onChange: (value: T, setValue: SetterOrUpdater<T>) => void;
}

const RecoilObserver = <T,>({ node, onChange }: Props<T>) => {
    const [value, setValue] = useRecoilState(node);

    useEffect(() => {
        onChange(value, setValue);
    }, [onChange, value, setValue]);

    return null;
};

export default RecoilObserver;
