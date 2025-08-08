import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

import Link from 'src/utils/Router/Link';

export const S_SearchEvents = styled.div`
    height: 100%;
`;

export const S_Autocomplete = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    margin: 8px 10px;
    border-bottom: 1px solid ${cssColor('--divider-search-bg')};

    &:focus-visible {
        outline: 0;
    }
`;

export const S_Label = styled.label`
    font-size: 13px;
`;

export const S_Input = styled.input`
    outline: none;
    padding: 0 24px;
    width: 100%;
    min-height: 28px;
    border: 1px solid ${cssColor('--input-search-border')};
    background: transparent;
    color: ${cssColor('--body-text')};
`;

export const S_InputAdornment = styled.div`
    position: absolute;
    left: 4px;
    top: 55%;
    z-index: 25;
`;

export const S_ClearButton = styled.button`
    position: absolute;
    top: 60%;
    right: 6px;
    z-index: 25;
    line-height: 0;
    background: none;
    border: none;
    margin: 0;
    padding: 0;
`;

export const S_Loader = styled.div`
    position: absolute;
    top: 50%;
    width: 100%;
    font-size: 24px;
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
`;

export const S_EmptyResults = styled.div`
    text-align: center;
    color: ${cssColor('--body-text')};
`;

export const Divider = styled.span`
    display: block;
    width: 100%;
    height: 6px;
    background: ${cssColor('--divider-search-bg')};
`;

export const S_SearchResultLink = styled(Link)<{ active?: boolean }>`
    display: block;
    position: relative;
    padding: 5px 35px 5px 10px;
    text-decoration: none;
    color: ${cssColor('--body-text')};

    ${({ active }) => {
        if (active) {
            return `
                background-color: ${cssColor('--link-search-bg')};
            `;
        }

        return '';
    }}
`;

export const S_SearchEventsContent = styled.div`
    padding: 0 16px 0 10px;
    height: calc(100% - 69px);
    text-align: left;
`;

export const S_SearchResult = styled.div`
    padding-top: 16px;
`;

export const S_SearchResultContent = styled.div`
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: ${fontWeight.medium};
`;

export const S_SearchResultItem = styled.div`
    border-bottom: 1px solid ${cssColor('--divider-search-bg')};

    &:last-child {
        border-bottom: none;
    }
`;

export const S_SearchResultIcon = styled.div`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 11px;
    line-height: 0;
`;
