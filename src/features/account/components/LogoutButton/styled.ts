import styled from '@emotion/styled';

import { cssColor } from '@solo-ui/system';

import Button from 'src/ui/common/Button/Button';

export const S_LogoutBtnWrapper = styled(Button)`
    margin-right: 5px !important;
    margin-left: 15px;
    background-color: ${cssColor('--button-primary-bg')};
    color: ${cssColor('--body-text')};

    &:hover {
        background-color: ${cssColor('--button-primary-hover-bg')};
    }
`;
