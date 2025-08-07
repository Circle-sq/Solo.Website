const { GTM_ENV_ID = '::' } = process.env;
const googleTagManagerEnvIdProvided = (): boolean => GTM_ENV_ID !== '::';

const [GTM_CONTAINER_ID, GTM_AUTH_PARAM, GTM_PREVIEW_PARAM] = GTM_ENV_ID.split(':');
const GTM_START_SCRIPT = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=${GTM_AUTH_PARAM}&gtm_preview=${GTM_PREVIEW_PARAM}&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
`;

const NO_GTM_ENV = 'NO GTM ENV';
const NO_GTM_ENV_COMMENT = `<!-- ${NO_GTM_ENV} -->`;

const NoGtmEnvPlaceholder = () => <div>{NO_GTM_ENV}</div>;

export const GTMContainer = () => {
    if (!googleTagManagerEnvIdProvided()) {
        return <NoGtmEnvPlaceholder />;
    }

    return (
        <>
            {/*<!-- Google Tag Manager -->*/}
            <script dangerouslySetInnerHTML={decorateContentToInnerHTML(GTM_START_SCRIPT)} />
            {/*<!-- End Google Tag Manager -->*/}
        </>
    );
};

export const GtmNoJsSupportInBrowser = () => {
    if (!googleTagManagerEnvIdProvided()) {
        return <NoGtmEnvPlaceholder />;
    }

    return (
        <noscript>
            <iframe
                title='gtm-noscript'
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}&gtm_auth=${GTM_AUTH_PARAM}&gtm_preview=${GTM_PREVIEW_PARAM}&gtm_cookies_win=x`}
                height='0'
                width='0'
                style={{ display: 'none', visibility: 'hidden' }}
            />
        </noscript>
    );
};

export const ReplaceGtmPlaceholdersWithComment = (markup: string): string => {
    const regexp = RegExp(`<div>${NO_GTM_ENV}</div>`, 'g');

    return markup.replace(regexp, NO_GTM_ENV_COMMENT);
};

interface DangerouslySetInnerHTML {
    __html: string;
}

const decorateContentToInnerHTML = (content: string): DangerouslySetInnerHTML => ({ __html: content });
