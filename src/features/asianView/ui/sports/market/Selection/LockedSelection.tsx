import SmallLockIcon from '@sc-asianView/icons/SmallLockIcon';

import { S_SmallLockWrapper } from './styled';

const LockedSelection = () => {
    return (
        <S_SmallLockWrapper className='market__cell'>
            <SmallLockIcon />
        </S_SmallLockWrapper>
    );
};

export default LockedSelection;
