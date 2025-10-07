import styled from '@emotion/styled';

import { cssColor } from '@solo-ui/system';

import type { Testable } from 'src/utils/Testable/types';

export const Spinner = ({ testId }: Testable) => {
    return (
        <SpinnerStyled data-testid={testId}>
            <span />
            <span />
            <span />
        </SpinnerStyled>
    );
};

const SpinnerStyled = styled.div`
    display: inline-flex;
    position: relative;
    justify-content: center;
    margin-left: 8px;
    vertical-align: middle;

    & > span {
        margin-left: 5px;
        width: 4px;
        height: 4px;
        background: ${cssColor('--box-default-bg')};
        border-radius: 50%;
        animation: dots3 1.5s infinite ease-out;
    }

    & > span:nth-of-type(1) {
        left: 0;
        animation-delay: 0.2s;
    }

    & > span:nth-of-type(2) {
        left: 15px;
        animation-delay: 0.4s;
    }

    & > span:nth-of-type(3) {
        left: 30px;
        animation-delay: 0.8s;
    }

    @keyframes dots3 {
        0% {
            background: ${cssColor('--spinner-primary-color')};
        }
        50% {
            background: ${cssColor('--spinner-secondary-color')};
        }
        100% {
            background: ${cssColor('--spinner-tertiary-color')};
        }
    }
`;
