import { I18n } from 'src/ui/common/Language/I18n';
import LoaderSpinner from 'src/ui/common/LoaderSpinner/LoaderSpinner';

import { LoaderText, Wrapper } from './styled';

const LoaderContent = () => (
    <Wrapper>
        <LoaderSpinner />
        <LoaderText>
            <I18n langKey='betslip.loader.adding' defaultText='Adding' />
            ...
        </LoaderText>
    </Wrapper>
);

export default LoaderContent;
