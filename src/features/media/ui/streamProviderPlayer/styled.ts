import styled from '@emotion/styled';

export const S_FullScreenButton = styled.button``;

export const S_GLiveOptions = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 10px 12px;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
    &:hover {
        opacity: 1;
        visibility: visible;
    }
    & > button {
        cursor: pointer;
        padding: 5px;
        margin-left: 10px;
        border: none;
        background: none;
        display: inline-flex;
        align-items: center;
    }
`;
