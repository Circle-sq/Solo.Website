import Fade from '@mui/material/Fade';
import { forwardRef } from 'react';

const Backdrop = forwardRef<HTMLDivElement, { open?: boolean; ownerState: unknown }>(
    ({ open, ownerState, ...props }, ref) => {
        return (
            <Fade in={open}>
                <div ref={ref} {...props} />
            </Fade>
        );
    },
);

Backdrop.displayName = 'Backdrop';

export default Backdrop;
