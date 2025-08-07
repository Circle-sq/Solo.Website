import { S_TeamImage } from '../ParticipantMobile/styled';

const ParticipantImage = ({ url, name }: { url: string; name: string | null }) => {
    if (name === null) {
        return null;
    }

    return <S_TeamImage src={url} alt={name} />;
};

export default ParticipantImage;
