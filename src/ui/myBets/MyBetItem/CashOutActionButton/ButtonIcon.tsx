import { CheckIcon, LockIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { S_MarginBox, S_SuccessIconWrapper } from '../styled';

interface Props {
    isCashOutLocked: boolean;
    isCashOutFulfilled: boolean;
}

const ButtonIcon = ({ isCashOutLocked, isCashOutFulfilled }: Props) => {
    if (isCashOutFulfilled) {
        return (
            <S_SuccessIconWrapper>
                <CheckIcon fontSize='small' color={cssColor('--icon-success-color')} />
            </S_SuccessIconWrapper>
        );
    }

    if (isCashOutLocked) {
        return (
            <S_MarginBox>
                <LockIcon fontSize='xsmall' color={cssColor('--icon-primary-color')} />
            </S_MarginBox>
        );
    }

    return null;
};

export default ButtonIcon;
