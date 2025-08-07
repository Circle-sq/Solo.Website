import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: PropsWithChildren) => {
    const modalRoot = document.getElementById('modal-root') as Element;

    return createPortal(<div className='modal'>{children}</div>, modalRoot);
};

export default Portal;
