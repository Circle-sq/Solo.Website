import styled from '@emotion/styled';

import { breakpoints } from '@sc-ui/system';

export const S_MainWrapper = styled.div<{ overlay?: boolean; isEventRoute?: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;

    @media screen and (max-width: ${breakpoints.bp500}) {
        min-height: 100vh;
        position: relative;
    }

    ${({ overlay = false, isEventRoute = false }) => {
        let styles = '';

        if (overlay) {
            styles += `
                pointer-events: none;
                max-height: 100vh;
                overflow: hidden;
            `;
        }

        if (isEventRoute) {
            styles += `
                min-height: 100vh;
            `;
        }

        return styles;
    }}
`;

export const S_BodyWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    flex-wrap: nowrap;
    position: relative;
    max-width: 1920px;
    margin: 0 auto;
    width: 100%;
`;

export const S_MainContent = styled.section`
    flex: 1;
    overflow: hidden;
    width: 100%;
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    position: relative;

    @media (min-width: ${breakpoints.bp1280}) {
        padding: 0 16px 0 24px;
    }

    @media (max-width: ${breakpoints.bp1279max}) {
        padding: 0 12px;
    }

    @media (max-width: ${breakpoints.bp500}) {
        overflow: unset;
        flex: unset;
        padding: 0 8px;
    }
`;

export const S_ScrolledContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    flex: 1 1 auto;
    min-height: 80vh;

    @media (max-width: ${breakpoints.bp1279max}) {
        padding-bottom: 48px;
    }
`;

export const S_PageContent = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    margin-top: 16px;

    position: relative;

    @media (max-width: ${breakpoints.bp1279max}) {
        margin-top: 12px;
        position: relative;
    }

    @media (max-width: ${breakpoints.bp500}) {
        margin-top: 8px;
        height: unset;
    }
`;

export const S_EventPageContent = styled(S_PageContent)`
    @media (max-width: ${breakpoints.bp960}) {
        margin-top: 0px;
    }
`;

export const S_MainPageWrapper = styled.div<{ fullWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    box-sizing: border-box;
    margin-bottom: 40px;
    z-index: 1;
    position: relative;

    ${({ fullWidth = false }) => {
        if (fullWidth) {
            return `
                width: 100%;
                padding: 0;
            `;
        }

        return `
            max-width: 100%;
            min-width: 0;
        `;
    }}

    ${S_EventPageContent} & {
        @media (max-width: ${breakpoints.bp960}) {
            margin-top: 12px;
        }

        @media (max-width: ${breakpoints.bp500}) {
            margin-top: 8px;
        }
    }
`;

export const S_PageNavSection = styled.section`
    margin-right: 16px;

    @media screen and (min-width: ${breakpoints.bp960}) {
        width: 240px;
    }

    @media (max-width: ${breakpoints.bp960}) {
        display: none;
    }
`;

export const S_PageMainSection = styled.section`
    display: flex;
    flex: 1 1 auto;
    padding-right: 8px;
    max-width: 100%;
    min-width: 0;

    @media screen and (max-width: ${breakpoints.bp768}) {
        width: 100%;
    }

    @media screen and (max-width: ${breakpoints.bp1279max}) {
        padding-right: 0;
    }
`;

export const S_InPlayContent = styled.div`
    display: flex;
    flex: 1;
`;

export const LoaderContainer = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const S_SideMenuWrapper = styled.div`
    display: flex;
    z-index: 10001;
    position: fixed;
    top: 0;
    overflow: hidden scroll;
    transition: 0.5s ease;
`;
