import classNames from 'classnames';
import type { ReactElement } from 'react';

import { CheckboxIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import type { Testable } from 'src/utils/Testable/types';

import { S_CheckboxWrap, S_Input, S_LabelText, S_CheckmarkWrap } from './styled';

interface Props extends Testable {
    field?: string;
    onChange?: (value: boolean) => void;
    onBlur?: (value: boolean) => void;
    isChecked: boolean;
    name?: string;
    label?: string | ReactElement;
    className?: string;
    color?: string;
}

const Checkbox = ({ isChecked, label, className, testId, color, onChange, onBlur }: Props) => {
    const labelClassNames = classNames([className]);

    const change = () => {
        onChange?.(!isChecked);
        onBlur?.(!isChecked);
    };

    return (
        <S_CheckboxWrap className={labelClassNames} onClick={change}>
            <S_CheckmarkWrap data-testid={testId}>
                {isChecked ? <CheckboxIcon fontSize='small' color={color ?? cssColor('--checkbox-bg')} /> : null}
            </S_CheckmarkWrap>

            <S_Input type='checkbox' onChange={change} checked={isChecked} />

            {label !== undefined ? <S_LabelText>{label}</S_LabelText> : null}
        </S_CheckboxWrap>
    );
};

export default Checkbox;
