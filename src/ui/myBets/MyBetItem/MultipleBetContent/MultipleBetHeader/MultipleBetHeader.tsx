import { DownArrowIcon, UpArrowIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import type { BetStatus } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';
import BetSelectionStatus from 'src/ui/myBets/MyBetItem/SelectionStatus/SelectionStatus';
import {
    S_BetHeader,
    S_BetHeaderMain,
    S_BetHeaderRow,
    S_BetHeaderTitle,
    VerticalDivider,
} from 'src/ui/myBets/MyBetItem/styled';

import MultipleBetHeaderTitle from './MultipleBetHeaderTitle';
import { S_MultipleBetHeaderText, S_MultipleBetStatus } from './styled';

interface Props {
    betType: string;
    betStatus: BetStatus;
    legsCounter: number;
    isOpen: boolean;
}

const MultipleBetHeader = ({ betType, betStatus, legsCounter, isOpen }: Props) => {
    return (
        <S_BetHeader data-testid='betHeader'>
            <S_BetHeaderRow>
                <S_BetHeaderMain>
                    <S_BetHeaderTitle data-testid='betType'>
                        <MultipleBetHeaderTitle betType={betType} />
                    </S_BetHeaderTitle>

                    <VerticalDivider />

                    <S_MultipleBetHeaderText>
                        <span>{legsCounter} </span>
                        <span>
                            <I18n langKey='bets.selection.picks.label' defaultText='picks' />
                        </span>
                    </S_MultipleBetHeaderText>

                    <S_MultipleBetStatus>
                        <BetSelectionStatus status={betStatus} />
                    </S_MultipleBetStatus>
                </S_BetHeaderMain>

                {isOpen ? (
                    <UpArrowIcon
                        color={cssColor('--icon-default-color')}
                        fontSize='xsmall'
                        data-testid='betDetailsArrow'
                    />
                ) : (
                    <DownArrowIcon
                        color={cssColor('--icon-default-color')}
                        fontSize='xsmall'
                        data-testid='betDetailsArrow'
                    />
                )}
            </S_BetHeaderRow>
        </S_BetHeader>
    );
};

export default MultipleBetHeader;
