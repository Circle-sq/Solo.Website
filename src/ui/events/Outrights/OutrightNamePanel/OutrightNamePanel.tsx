import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import type { MouseEvent } from 'react';

import { DownArrowIcon, UpArrowIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import { DATE_FORMAT } from 'src/utils/constants';
import { slug } from 'src/utils/deburr';

import { HeaderDate, HeaderLabel, HeaderName, S_OutrightNamePanel, ToggleButton } from '../styled';
import type { EventData } from '../types';
import { isValidOutrightDate } from '../utils';

interface Props {
    event: EventData;
    isOpen: boolean;
    isEventExpandable: boolean;
    eventGroupKey: string;
    changeIsOpen: (group: number, index: string) => void;
}

const OutrightNamePanel = ({ event, isOpen, isEventExpandable, eventGroupKey, changeIsOpen }: Props) => {
    const { router } = useAppStateContext();

    const onToggle = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        changeIsOpen(2, eventGroupKey);
    };

    const onLinkEvent = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        router.redirect(RouteName.Event, { id: event.id, slug: slug(event.originalName) });
    };

    const shouldShowOutrightDate = isValidOutrightDate(event.date);

    return (
        <S_OutrightNamePanel
            data-testid={`event-${event.id}`}
            isEventExpandable={isEventExpandable}
            isOpen={isOpen}
            onClick={onLinkEvent}
        >
            <HeaderLabel>
                <HeaderName>{event.name}</HeaderName>

                {shouldShowOutrightDate && (
                    <HeaderDate>
                        {format(new Date(event.date), DATE_FORMAT.NUMERIC_FULL_DATE_TIME_W_SEPARATOR)}
                    </HeaderDate>
                )}
            </HeaderLabel>

            {isEventExpandable && (
                <ToggleButton data-testid='arrowIndicator' onClick={onToggle}>
                    {isOpen ? (
                        <UpArrowIcon fontSize='xsmall' color={cssColor('--icon-light-color')} />
                    ) : (
                        <DownArrowIcon fontSize='xsmall' color={cssColor('--icon-light-color')} />
                    )}
                </ToggleButton>
            )}
        </S_OutrightNamePanel>
    );
};

export default observer(OutrightNamePanel);
