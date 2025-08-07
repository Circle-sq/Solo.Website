import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getStreams } from 'src/modules/media/actions/stream';

export const useFetchStreams = (): void => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStreams());
    }, []);
};
