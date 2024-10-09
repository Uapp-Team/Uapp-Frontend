const environment = process.env.REACT_APP_ENV;

let rootUrl;
switch (environment) {
    case 'dev':
        rootUrl = process.env.REACT_APP_ROOT_URL_DEV;
        break;
    case 'local':
        rootUrl = process.env.REACT_APP_ROOT_URL_LOCAL;
        break;
    case 'prod':
        rootUrl = process.env.REACT_APP_ROOT_URL_PROD;
        break;
    default:
        rootUrl = process.env.REACT_APP_ROOT_URL;
}

export { rootUrl };
