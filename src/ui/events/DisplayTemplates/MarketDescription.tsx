import InfoBlueIcon from 'libs/ui-icons-svg/src/InfoBlueIcon';

import { S_MarketDescription } from 'src/ui/events/DisplayTemplates/styled';

interface Props {
    description?: string | false;
}

const MarketDescription = ({ description }: Props) => {
    if (!description) {
        return null;
    }

    return (
        <S_MarketDescription>
            <div>
                <InfoBlueIcon fontSize='small' />
            </div>
            {description}
        </S_MarketDescription>
    );
};

export default MarketDescription;
