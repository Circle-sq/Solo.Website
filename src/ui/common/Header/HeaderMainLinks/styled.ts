import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@solo-ui/system';

import Link from 'src/utils/Router/NewLink';

export const S_HeaderMainLinkWrapper = styled.nav<{ hasSidebar?: boolean }>`
    align-items: center;
    display: flex;
    flex-flow: ${(props) => (props.hasSidebar ? 'column nowrap' : 'row nowrap')};
    flex: 1 0 auto;
    padding-left: 26px;
    gap: 20px;
`;

interface HeaderStyledLinkPropsType {
    linkBackground?: string;
    comingSoon?: boolean;
    active: boolean;
}

const redUnderlineStyle = `
    p::after {
        content: '';
        width: 100%;
        left: 0;
        border-left: 0;
        height: 2px;
        border-bottom-left-radius: 0;
        background-color: ${cssColor('--link-selected-bg')};
        bottom: -4px;
        position: absolute;
    }
`;

export const HeaderStyledLink = styled(Link)<HeaderStyledLinkPropsType>`
    position: relative;
    align-items: center;
    display: flex;
    justify-content: center;

    &:hover {
        cursor: pointer;
        ${redUnderlineStyle};
    }

    p.label {
        position: relative;
        font-size: 16px;
        line-height: 22px;
        font-weight: ${fontWeight.bold};
        color: ${cssColor('--link-text')};
        text-decoration: none;
    }

    ${({ active }): string => (active ? `${redUnderlineStyle}` : '')}
    ${({ comingSoon }) =>
        comingSoon
            ? `
                  pointer-events: none;
                  user-select: none;

                  > * {
                      opacity: 0.3;
                  }

                  &:after {
                      content: 'COMING SOON!';
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      transform: translate(-50%, -50%) rotate(-15deg);
                      white-space: nowrap;
                      font-size: 0.8em;
                  }

                  .navigation-sidebar &:after {
                      left: 27px; /* 15px navigation sidebar + 15px icon margin */
                      transform: translate(0, -50%) rotate(-15deg);
                  }
              `
            : ''}
    &.header__link--active,
    &.btn {
        &.btn--sign-up {
            border: 1px solid rgba(255, 255, 255, 0.5);
            color: #fff;
            padding: 6px 15px;

            &:hover {
                border-color: #13d26c;
                color: inherit;
            }
        }
    }
`;

export const S_LabelBadge = styled.div`
    color: ${cssColor('--badge-text')};
    background: ${cssColor('--badge-error-bg')};
    position: absolute;
    top: -12px;
    right: 0;

    border-radius: 6px;
    padding: 0 3px;
    height: 10px;

    font-family: Noto Sans;
    font-size: 8px;
    font-style: italic;
    font-weight: 800;
    line-height: 10px;
    letter-spacing: 0.04em;
    text-align: left;
`;
