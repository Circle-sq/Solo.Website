import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { IconCategory } from 'src/common/enums';
import { request as getContentIcons } from 'src/modules/content/actions/get-content-icons';

export const useGetContentIcons = (): void => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getContentIcons(IconCategory.Competitions));
        dispatch(getContentIcons(IconCategory.CompetitionLocations));
        dispatch(getContentIcons(IconCategory.Sports));
    }, []);
};
