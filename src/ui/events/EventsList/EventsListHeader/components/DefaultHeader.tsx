import { useRecoilValue } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import { sportIconUrlSelectorFamily } from 'src/common/store/icons/selectors';
import { SPORT_ICONS } from 'src/config/sport-icons';
import { I18n } from 'src/ui/common/Language/I18n';
import { S_ContentIcon } from 'src/ui/common/NavigationList/styled';
import { S_SportIcon } from 'src/ui/events/EventsList/styled';

const DefaultHeader = ({ sportId }: { sportId: string }) => {
    const {
        reduxState,
        router: { route },
    } = useAppStateContext();

    const sportIconUrl = useRecoilValue(sportIconUrlSelectorFamily(sportId));

    if (route.name === RouteName.Sport) {
        return <I18n langKey='event.list.header.title' defaultText='Highlights' />;
    }

    const sportName = reduxState.getSportName(sportId);

    return (
        <>
            {sportIconUrl ? (
                <S_ContentIcon src={sportIconUrl} isLoaded />
            ) : (
                <S_SportIcon className={SPORT_ICONS[sportId] ?? SPORT_ICONS.default} />
            )}
            {sportName}
        </>
    );
};

export default DefaultHeader;
