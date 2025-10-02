import { useRecoilValue } from 'recoil';

import SportIcon from '@solo-ui/icons/config/SportIcon';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import { sportIconUrlSelectorFamily } from 'src/common/store/icons/selectors';
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
                <S_SportIcon>
                    <SportIcon sport={sportId} />
                </S_SportIcon>
            )}
            {sportName}
        </>
    );
};

export default DefaultHeader;
