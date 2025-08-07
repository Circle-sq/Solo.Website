import type { ReactElement } from 'react';

import type { Testable } from 'src/utils/Testable/types';

export interface Props extends Testable {
    alt?: string;
    className?: string;
    src?: string | null;
}

const TeamImage = (props: Props): ReactElement | null => {
    const { src = null, alt, className, testId } = props;

    return src !== null ? <img loading='lazy' src={src} alt={alt} className={className} data-testid={testId} /> : null;
};

export default TeamImage;
