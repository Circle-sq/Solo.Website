import type { Testable } from 'src/utils/Testable/types';

const Spinner = ({ testId = 'spinner' }: Testable) => (
    <svg data-testid={testId} xmlns='http://www.w3.org/2000/svg' width={100} height={20} viewBox='0 0 100 20'>
        <circle cx='16' cy='10' r='10' fill='#fill'>
            <animate
                attributeName='r'
                values='10;0;0;0;0'
                keyTimes='0;0.25;0.5;0.75;1'
                keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
                calcMode='spline'
                dur='1s'
                repeatCount='indefinite'
                begin='0s'
            />
            <animate
                attributeName='cx'
                values='84;84;84;84;84'
                keyTimes='0;0.25;0.5;0.75;1'
                keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
                calcMode='spline'
                dur='1s'
                repeatCount='indefinite'
                begin='0s'
            />
        </circle>
        <circle cx='16' cy='10' r='10' fill='#fill'>
            <animate
                attributeName='r'
                values='0;10;10;10;0'
                keyTimes='0;0.25;0.5;0.75;1'
                keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
                calcMode='spline'
                dur='1s'
                repeatCount='indefinite'
                begin='-0.5s'
            />
            <animate
                attributeName='cx'
                values='16;16;50;84;84'
                keyTimes='0;0.25;0.5;0.75;1'
                keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
                calcMode='spline'
                dur='1s'
                repeatCount='indefinite'
                begin='-0.5s'
            />
        </circle>
        <circle cx='16' cy='10' r='10' fill='#fill'>
            <animate
                attributeName='r'
                values='0;10;10;10;0'
                keyTimes='0;0.25;0.5;0.75;1'
                keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
                calcMode='spline'
                dur='1s'
                repeatCount='indefinite'
                begin='-0.25s'
            />
            <animate
                attributeName='cx'
                values='16;16;50;84;84'
                keyTimes='0;0.25;0.5;0.75;1'
                keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
                calcMode='spline'
                dur='1s'
                repeatCount='indefinite'
                begin='-0.25s'
            />
        </circle>
        <circle cx='16' cy='10' r='10' fill='#fill'>
            <animate
                attributeName='r'
                values='0;10;10;10;0'
                keyTimes='0;0.25;0.5;0.75;1'
                keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
                calcMode='spline'
                dur='1s'
                repeatCount='indefinite'
                begin='0s'
            />
            <animate
                attributeName='cx'
                values='16;16;50;84;84'
                keyTimes='0;0.25;0.5;0.75;1'
                keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
                calcMode='spline'
                dur='1s'
                repeatCount='indefinite'
                begin='0s'
            />
        </circle>
        <circle cx='16' cy='10' r='10' fill='#fill'>
            <animate
                attributeName='r'
                values='0;0;10;10;10'
                keyTimes='0;0.25;0.5;0.75;1'
                keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
                calcMode='spline'
                dur='1s'
                repeatCount='indefinite'
                begin='0s'
            />
            <animate
                attributeName='cx'
                values='16;16;16;50;84'
                keyTimes='0;0.25;0.5;0.75;1'
                keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
                calcMode='spline'
                dur='1s'
                repeatCount='indefinite'
                begin='0s'
            />
        </circle>
    </svg>
);

export default Spinner;
