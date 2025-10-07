import styled from '@emotion/styled';

import { cssColor } from '@solo-ui/system';

import Button from 'src/ui/common/Button/Button';

export const S_LoginForm = styled.form`
    padding: 10px 20px 20px;
    margin: 0;
`;

export const LoginButton = styled(Button)`
    display: block;
    margin-top: 30px;
    width: 100%;
    color: ${cssColor('--body-text')};
    background-color: ${cssColor('--button-default-bg')};

    &:hover {
        background-color: ${cssColor('--button-default-hover-bg')};
    }
`;
