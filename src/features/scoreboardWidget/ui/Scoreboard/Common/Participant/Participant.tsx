import TeamImage from 'src/ui/common/TeamImage';

import type { ParticipantType } from '../../../../types';

import { S_ParticipantDetails, S_ParticipantImageWrapper, S_ParticipantName } from './styled';

interface Props {
    type: ParticipantType;
    name: string;
    uniformUrl?: string;
    layout?: 'horizontal' | 'vertical';
}

const Participant = ({ type, name, uniformUrl, layout = 'vertical' }: Props) => {
    return (
        <S_ParticipantDetails layout={layout}>
            {uniformUrl !== undefined && (
                <S_ParticipantImageWrapper layout={layout}>
                    <TeamImage src={uniformUrl} alt={name} />
                </S_ParticipantImageWrapper>
            )}
            <S_ParticipantName data-testid={`${type}Participant`} layout={layout}>
                {name}
            </S_ParticipantName>
        </S_ParticipantDetails>
    );
};

export default Participant;
