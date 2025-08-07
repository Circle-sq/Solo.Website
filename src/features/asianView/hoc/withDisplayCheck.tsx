import { type FunctionComponent, memo } from 'react';
import { type RecoilValueReadOnly, useRecoilValue } from 'recoil';

const withDisplayCheck = <Props extends { id: number }>(
    Component: FunctionComponent<Props>,
    displayEntitySelector: (entityId: number) => RecoilValueReadOnly<boolean>,
) => {
    const MemoizedComponent = memo(Component);

    const ComponentWithDisplayCheck = (props: Props) => {
        const display = useRecoilValue(displayEntitySelector(props.id));

        if (!display) {
            return null;
        }

        return <MemoizedComponent {...props} />;
    };

    ComponentWithDisplayCheck.displayName = `WithDisplayCheck(${
        MemoizedComponent.displayName ?? MemoizedComponent.name ?? 'Component'
    })`;

    return ComponentWithDisplayCheck;
};

export default withDisplayCheck;
