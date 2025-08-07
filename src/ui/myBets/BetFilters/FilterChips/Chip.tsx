import { CloseIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { S_Chip, S_RemoveFilterButton } from '../styled';

interface Props {
    label?: string;
    onClick: () => void;
}

const Chip = ({ label, onClick }: Props) => {
    return (
        <S_Chip>
            {label}
            <S_RemoveFilterButton onClick={onClick}>
                <CloseIcon fontSize='xsmall' color={cssColor('--icon-generic-color')} />
            </S_RemoveFilterButton>
        </S_Chip>
    );
};

export default Chip;
