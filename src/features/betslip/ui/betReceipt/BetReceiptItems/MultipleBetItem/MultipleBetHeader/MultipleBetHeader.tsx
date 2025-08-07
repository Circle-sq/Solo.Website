import { useRecoilValue } from 'recoil';

import { I18n } from 'src/ui/common/Language/I18n';
import { capitalizeString } from 'src/utils/format';

import { hasBetReceiptFreeBetSelector, identifiedBetTypeSelector } from '../../../../../store/selectors/betReceipt';
import FreeBetBadge from '../../../../freeBet/badge/FreeBetBadge';
import { S_MultipleBetHeader } from '../styled';

const MultipleBetHeader = () => {
    const isFreeBet = useRecoilValue(hasBetReceiptFreeBetSelector);
    const placedBetType = useRecoilValue(identifiedBetTypeSelector);

    return (
        <S_MultipleBetHeader>
            <div>
                <I18n
                    langKey={`betslip.receipt.list-label.${placedBetType}`}
                    defaultText={`{placedBetType} bet`}
                    params={{
                        placedBetType: capitalizeString(placedBetType),
                    }}
                />
            </div>

            {isFreeBet && <FreeBetBadge />}
        </S_MultipleBetHeader>
    );
};

export default MultipleBetHeader;
