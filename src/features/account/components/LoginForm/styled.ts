import styled from '@emotion/styled';

import { LightBluePalette } from '@sc-ui/system';

import Button from 'src/ui/common/Button/Button';

export const S_LoginForm = styled.form`
    padding: 10px 20px 20px;
    margin: 0;
`;

export const LoginButton = styled(Button)`
    display: block;
    margin-top: 30px;
    width: 100%;
    color: ${LightBluePalette.lightBlue12};
    background-color: ${LightBluePalette.lightBlue6};
    border-color: ${LightBluePalette.lightBlue6};

    &:hover {
        background-color: ${LightBluePalette.lightBlue9};
        border-color: ${LightBluePalette.lightBlue9};
    }
`;
