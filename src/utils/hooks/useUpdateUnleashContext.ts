import { useUnleashContext } from '@unleash/proxy-client-react';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

import { userDataAtom } from '@solo-account/store/atoms';

const useUpdateUnleashContext = () => {
    const userData = useAtomValue(userDataAtom);
    const updateContext = useUnleashContext();

    useEffect(() => {
        if (userData !== null) {
            const context = {
                userId: userData.id.toString(),
                externalId: userData.externalId.toString(),
                ...(userData.brandId !== null && { brandId: userData.brandId.toString() }),
            };

            void updateContext(context);
        }
    }, [userData, updateContext]);
};

export default useUpdateUnleashContext;
