import some from 'lodash/some';

import { DownArrowIcon, UpArrowIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import type { LinkItem as Link } from 'src/ui/common/AllCountries/types';
import CountryListItem from 'src/ui/common/CountryListItem';
import { S_ToggleButton, S_RightSide, S_Counter } from 'src/ui/common/CountryListItem/styled';
import { S_ContentIcon } from 'src/ui/common/NavigationList/styled';
import { S_CountryList } from 'src/ui/common/NavigationPanel/styled';
import type { NestedLinkItem } from 'src/ui/common/NavigationPanel/types';
import { PAGE_ROUTE_NAME } from 'src/utils/constants';

import { S_LinkLabel, S_Wrapper, S_SportIcon } from './styled';

interface Props {
    link: Link;
    onClick: () => void;
    activeLink?: boolean;
    isOpen: boolean;
}

const SportItem = (props: Props) => {
    const { link, onClick, isOpen } = props;
    const {
        router: { route },
    } = useAppStateContext();
    const { name: routeName, params: routeParams } = route;

    const isLinkOpen = (link: Link): boolean => {
        if (link.children) {
            switch (routeName) {
                case PAGE_ROUTE_NAME.competition: {
                    const { slug, id } = routeParams;

                    return some(link.children, { params: { slug, id } });
                }

                case PAGE_ROUTE_NAME.country: {
                    const { sportId, countryId } = routeParams;

                    return some(link.children, { params: { sportId, countryId } });
                }
            }
        }

        return false;
    };

    return (
        <>
            <S_Wrapper onClick={onClick} data-testid={`sport-${link?.params?.sport}`}>
                <>
                    {link.imageUrl === undefined && (link.iconName || link.icon) ? (
                        <S_SportIcon className={link.iconName || link.icon} />
                    ) : (
                        <S_ContentIcon src={link.imageUrl} isLoaded={true} />
                    )}

                    <S_LinkLabel>{link.label}</S_LinkLabel>
                </>
                <S_RightSide>
                    {link.count && <S_Counter data-testid='sportsCounter'>{link.count}</S_Counter>}
                    <S_ToggleButton data-testid='toggleLHNCountryCompetitions' isOpen={isOpen}>
                        {isOpen ? (
                            <UpArrowIcon fontSize='xsmall' color={cssColor('--icon-generic-color')} />
                        ) : (
                            <DownArrowIcon fontSize='xsmall' color={cssColor('--icon-generic-color')} />
                        )}
                    </S_ToggleButton>
                </S_RightSide>
            </S_Wrapper>
            {isOpen && (
                <S_CountryList data-testid='countryList'>
                    {link?.children?.map((childLink: NestedLinkItem) => (
                        <li key={childLink.params?.id ?? childLink.key ?? childLink.countryId}>
                            <CountryListItem
                                link={childLink}
                                open={isLinkOpen(childLink)}
                                sportId={link.sportId}
                                data-testid={childLink.label?.toString()}
                            />
                        </li>
                    ))}
                </S_CountryList>
            )}
        </>
    );
};

export default SportItem;
