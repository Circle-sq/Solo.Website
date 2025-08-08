import styled from '@emotion/styled';

import { cssColor } from '@solo-ui/system';

export const S_CheckboxWrap = styled.div`
    cursor: pointer;
    display: inline-block;
    user-select: none;
`;

export const S_Input = styled.input`
    display: none;
`;

export const S_LabelText = styled.span`
    line-height: 1.25;
    vertical-align: middle;
    display: inline-block;
    margin-left: 7px;
`;

export const S_CheckmarkWrap = styled.span`
    color: ${cssColor('--checkbox-color')};
    border: 1px solid ${cssColor('--checkbox-border')};
    display: inline-block;
    vertical-align: middle;
    height: 16px;
    width: 16px;
    line-height: 15px;
    border-radius: 3px;
    text-align: center;
`;
