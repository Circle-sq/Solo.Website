import isEmpty from 'lodash/isEmpty';
import { observer } from 'mobx-react-lite';

import InfoAlert from 'src/ui/common/InfoAlert/InfoAlert';
import { I18n } from 'src/ui/common/Language/I18n';
import Loader from 'src/ui/common/Loader/Loader';

import useAggregatedSports from '../../../hooks/useAggregatedSports';
import { isESport } from '../../../typeGuards';
import ExpandableSportListItem from '../SportListItem/ExpandableSportListItem';
import SportListItem from '../SportListItem/SportListItem';

import { S_SportList } from './styled';

const SportContainer = () => {
    const { sports, isLoading } = useAggregatedSports();

    if (isLoading) {
        return (
            <Loader
                testId='loadingLHNSports'
                message={<I18n langKey='asianView.lhn.sports.loading' defaultText='Loading sports...' />}
            />
        );
    }

    if (isEmpty(sports)) {
        return (
            <InfoAlert type='info'>
                <I18n langKey='asianView.lhn.sports.empty' defaultText='Currently there are no events available!' />
            </InfoAlert>
        );
    }

    return (
        <S_SportList>
            {sports.map((sport) => {
                if (isESport(sport)) {
                    if (sport.sports.length === 0) {
                        return null;
                    }

                    return <ExpandableSportListItem key={sport.id} eSports={sport} />;
                }

                return <SportListItem key={sport.id} sport={sport} />;
            })}
        </S_SportList>
    );
};

export default observer(SportContainer);
