import { isMobile, isTablet } from 'react-device-detect';

import { DeviceType } from 'src/common/enums';

export const getDeviceType = () => (isMobile ? DeviceType.MOBILE : isTablet ? DeviceType.TABLET : DeviceType.DESKTOP);
