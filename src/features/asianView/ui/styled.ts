import styled from '@emotion/styled';

export const S_AsianViewWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    width: inherit;
    height: inherit;

    padding: 0 0 24px 24px;
`;

export const S_Aside = styled.aside`
    display: flex;
    flex-direction: column;
    width: 375px;
    min-width: 375px;
    max-width: 375px;
    height: inherit;
`;

export const S_AsianViewBody = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    margin-top: 12px;
    width: inherit;
    height: inherit;
`;

export const S_SportList = styled.div`
    display: flex;
    flex-direction: column;
    height: inherit;
    width: 100%;
    border-radius: 6px;
    margin-left: 20px;
    padding-right: 9px;

    @media screen and (max-width: 1440px) {
        margin-left: 16px;
    }
`;
