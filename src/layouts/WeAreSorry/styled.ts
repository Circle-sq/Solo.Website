import styled from '@emotion/styled';

import { LightBluePalette } from '@sc-ui/system';

export const S_SorryMessage = styled.div`
    padding: 10px;
    margin: auto;
    width: 600px;
    color: ${LightBluePalette.lightBlue10};

    @media (max-device-width: 480px) {
        width: 300px;
    }
`;
