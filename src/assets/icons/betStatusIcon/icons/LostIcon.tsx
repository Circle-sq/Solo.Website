import type { Testable } from 'src/utils/Testable/types';
import SvgElement from 'src/assets/icons/SvgElement/SvgElement';

const LostIcon = ({ testId = 'testId' }: Testable) => (
    <SvgElement testId={testId}>
        <path
            fill='#D34F44'
            d='M10.6805 11.7333L11.7333 10.6805L9.05273 8L11.7333 5.31946L10.6805 4.26666L7.99994 6.9472L5.3194 4.26666L4.2666 5.31946L6.94713 8L4.2666 10.6805L5.3194 11.7333L7.99994 9.0528L10.6805 11.7333Z'
        />
        <path
            fill='#D34F44'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z'
            data-testid={`bet-status-icon-${testId}`}
        />
    </SvgElement>
);

export default LostIcon;
