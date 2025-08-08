import { GreyPalette } from '@solo-ui/system';

const ExpandIcon = () => {
    return (
        <>
            <svg xmlns='http://www.w3.org/2000/svg' width='8' height='6' viewBox='0 0 8 6' fill='none'>
                <path
                    d='M2.7413 0.562732C3.14395 0.031374 3.94396 0.0353516 4.34131 0.570687L6.8154 3.904C7.30516 4.56385 6.83416 5.5 6.01241 5.5L1.01244 5.5C0.186116 5.5 -0.28364 4.55464 0.215425 3.89605L2.7413 0.562732Z'
                    fill={GreyPalette.grey7}
                />
            </svg>
            <svg xmlns='http://www.w3.org/2000/svg' width='8' height='6' viewBox='0 0 8 6' fill='none'>
                <path
                    d='M5.2587 5.43727C4.85605 5.96863 4.05604 5.96465 3.65869 5.42931L1.1846 2.096C0.694842 1.43615 1.16584 0.499999 1.98759 0.499999L6.98756 0.5C7.81388 0.5 8.28364 1.44536 7.78457 2.10395L5.2587 5.43727Z'
                    fill={GreyPalette.grey7}
                />
            </svg>
        </>
    );
};

export default ExpandIcon;
