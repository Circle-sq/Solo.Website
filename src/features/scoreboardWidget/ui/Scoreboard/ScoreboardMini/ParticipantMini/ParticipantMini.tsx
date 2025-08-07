import Box from '@mui/material/Box';

import type { ParticipantType } from '../../../../types';

import { S_ParticipantDetailsMini, S_ParticipantImageMini, S_ParticipantNameMini } from './styled';

interface Props {
    type: ParticipantType;
    name: string;
    uniformUrl?: string;
}

const ParticipantMini = ({ type, name, uniformUrl }: Props) => {
    return (
        <S_ParticipantDetailsMini type={type}>
            {uniformUrl !== undefined && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <S_ParticipantImageMini src={uniformUrl} alt={name} />
                </Box>
            )}
            <S_ParticipantNameMini data-testid={`${type}Participant`}>{name}</S_ParticipantNameMini>
        </S_ParticipantDetailsMini>
    );
};

export default ParticipantMini;
