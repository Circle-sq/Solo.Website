import isUndefined from 'lodash/isUndefined';
import { isMobile as isMobileDevice } from 'react-device-detect';

export const isMobile = (widthBreakpoint = 769): boolean => {
    return (!isUndefined(window) && window.innerWidth < widthBreakpoint) || isMobileDevice;
};
