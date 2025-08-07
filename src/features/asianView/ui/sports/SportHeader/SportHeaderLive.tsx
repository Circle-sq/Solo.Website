import { useAtomValue } from 'jotai';

import { I18n } from 'src/ui/common/Language/I18n';

import { sportAtom } from '../../../store/sports';

import SportConfigHeader from './SportConfigHeader';
import SportHeaderIcon from './SportHeaderIcon';
import { S_LiveText, S_SportHeader, S_TableHeadCell, S_TableHeadRowLive } from './styled';

const SportHeaderLive = ({ counter }: { counter: number }) => {
    const sport = useAtomValue(sportAtom);

    return (
        <S_SportHeader>
            <S_TableHeadRowLive data-testid='sportHeader'>
                <S_TableHeadCell>
                    <SportHeaderIcon />

                    <span>{sport?.name}</span>
                    <S_LiveText>
                        <I18n langKey='asianView.eventList.sportHeader.live' defaultText='Live' />
                    </S_LiveText>
                    <span>{`( ${counter} )`}</span>
                </S_TableHeadCell>
            </S_TableHeadRowLive>
            <SportConfigHeader />
        </S_SportHeader>
    );
};

export default SportHeaderLive;
