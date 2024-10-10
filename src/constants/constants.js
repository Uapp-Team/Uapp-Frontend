const environment = process.env.REACT_APP_ENV;

let rootUrl;
let etest;
let cms;
let leadlink;
let leadUrl;
let leadApi;
switch (environment) {
    case 'dev':
        rootUrl = process.env.REACT_APP_ROOT_URL_DEV;
        etest = process.env.REACT_APP_ROOT_URL_ETEST_DEV;
        cms = process.env.REACT_APP_ROOT_URL_CMS_DEV;
        leadlink = process.env.REACT_APP_ROOT_URL_LEADLINK_DEV;
        leadUrl = process.env.REACT_APP_ROOT_URL_LEADURL_DEV;
        leadApi = process.env.REACT_APP_ROOT_URL_LEADAPI;
        break;
    case 'local':
        rootUrl = process.env.REACT_APP_ROOT_URL_LOCAL;
        break;
    case 'prod':
        rootUrl = process.env.REACT_APP_ROOT_URL_PROD;
        etest = process.env.REACT_APP_ROOT_URL_ETEST_PROD;
        cms = process.env.REACT_APP_ROOT_URL_CMS_PROD;
        leadlink = process.env.REACT_APP_ROOT_URL_LEADLINK_PROD;
        leadUrl = process.env.REACT_APP_ROOT_URL_LEADURL_PROD;
        leadApi = process.env.REACT_APP_ROOT_URL_LEADAPI;
        break;
    default:
        rootUrl = process.env.REACT_APP_ROOT_URL;
}

export { rootUrl, etest, cms, leadApi, leadUrl, leadlink };
