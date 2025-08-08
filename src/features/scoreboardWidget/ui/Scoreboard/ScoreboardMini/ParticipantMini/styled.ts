import styled from '@emotion/styled';

import { fontWeight } from '@solo-ui/system';

import TeamShirt from 'src/ui/common/TeamImage/TeamImage';

import { ParticipantType } from '../../../../types';

export const S_ParticipantDetailsMini = styled.div<{ type: ParticipantType }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    width: 100%;
    flex-direction: ${({ type }) => (type === ParticipantType.Home ? 'row-reverse' : 'row')};
`;

export const S_ParticipantNameMini = styled.span`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    white-space: normal;
    word-break: break-word;
    font-size: 12px;
    font-weight: ${fontWeight.semibold};
    line-height: 24px;
    padding: 0 8px;
    -webkit-line-clamp: 1;
`;

export const S_ParticipantImageMini = styled(TeamShirt)`
    height: 20px;
    width: 20px;
    flex-shrink: 0;
`;
