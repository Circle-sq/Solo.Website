import styled from '@emotion/styled';

import { GenericColors, GreyPalette, LightBluePalette } from '@sc-ui/system';

import Button from 'src/ui/common/Button/Button';

export const S_AcceptButton = styled(Button)`
    width: 100%;
    margin-top: 10px;
    background-color: ${LightBluePalette.lightBlue5};
    color: ${GreyPalette.grey7};
    border: solid 1px ${GenericColors.transparent};

    &:hover {
        border: solid 1px ${LightBluePalette.lightBlue5};
        background-color: ${LightBluePalette.lightBlue9};
    }
`;
