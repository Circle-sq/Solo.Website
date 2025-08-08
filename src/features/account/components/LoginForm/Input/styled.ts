import styled from '@emotion/styled';

import { GenericColors, GreyPalette, RedPalette } from '@solo-ui/system';

export const S_LoginFormInput = styled.div`
    display: inline-flex;
    flex-direction: column;
    position: relative;
    vertical-align: top;
    padding: 0;
    width: 100%;
    margin: 8px 0;
`;

export const ErrorText = styled.p`
    font-weight: 400;
    font-size: 10px;
    line-height: 1.66;
    letter-spacing: 0.03333em;
    text-align: left;
    margin: 8px 14px 0 0;
    color: ${RedPalette.red4};
`;

export const InputLabel = styled.label<{ error: boolean }>`
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: ${({ error }) => (error ? RedPalette.red4 : GreyPalette.grey7)};
`;

export const InputBase = styled.input<{ error: boolean }>`
    display: block;
    width: 100%;
    border: 1px solid ${({ error }) => (error ? RedPalette.red4 : GenericColors.black)};
    padding: 12px 10px;
    font-size: 14px;
    color: ${GenericColors.black};
`;
