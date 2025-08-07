import type { Testable } from 'src/utils/Testable/types';
import SvgElement from 'src/assets/icons/SvgElement/SvgElement';

const VoidIcon = ({ testId = 'testId' }: Testable) => (
    <SvgElement testId={testId}>
        <path
            fill='#FEBE3F'
            d='M8.0018 2.4534V3.96613C10.3002 3.96613 12.1618 5.77131 12.1618 8.00007C12.1618 8.79173 11.9226 9.52792 11.517 10.1481L10.7578 9.41195C10.9918 8.99342 11.1218 8.50935 11.1218 8.00007C11.1218 6.33102 9.723 4.97461 8.0018 4.97461V6.48734L5.9218 4.47037L8.0018 2.4534Z'
        />
        <path
            fill='#FEBE3F'
            d='M4.8818 8.00007C4.8818 9.66911 6.2806 11.0255 8.0018 11.0255V9.51279L10.0818 11.5298L8.0018 13.5467V12.034C5.7034 12.034 3.8418 10.2288 3.8418 8.00007C3.8418 7.20841 4.081 6.47221 4.4866 5.85199L5.2458 6.58819C5.0118 7.00671 4.8818 7.49078 4.8818 8.00007Z'
        />
        <path
            fill='#FEBE3F'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z'
            data-testid={`bet-status-icon-${testId}`}
        />
    </SvgElement>
);

export default VoidIcon;
