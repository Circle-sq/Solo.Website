import { LeftArrowIcon, RightArrowIcon } from '@sc-ui/icons/svg';
import { GenericColors, Opacities } from '@sc-ui/system';

import { I18n } from 'src/ui/common/Language/I18n';
import { capitalizeString } from 'src/utils/format';

import { Direction } from '../../../enums';

import { S_NextBetButton } from './styled';

interface Props {
    disabled?: boolean;
    startTransition: () => void;
    direction?: Direction;
}

const NavigationButton = ({ disabled, startTransition, direction = Direction.Next }: Props) => {
    const defaultText = `${capitalizeString(direction)} bet`;
    const langKey = `speedbetting.button.${direction}`;

    return (
        <S_NextBetButton onClick={startTransition} disabled={disabled} data-testid={`${direction}BetButton`}>
            {direction === Direction.Previous && (
                <LeftArrowIcon color={GenericColors.white + Opacities.opacity60} fontSize='small' />
            )}
            <span>
                <I18n langKey={langKey} defaultText={defaultText} />
            </span>
            {direction === Direction.Next && (
                <RightArrowIcon color={GenericColors.white + Opacities.opacity60} fontSize='small' />
            )}
        </S_NextBetButton>
    );
};

export default NavigationButton;
