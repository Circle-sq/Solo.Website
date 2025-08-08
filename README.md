## SOLO Platform Table of Contents
- [SOLO Platform Table of Contents](#solo-platform-table-of-contents)
- [Preparing application](#preparing-application)
- [Operators](#operators)
- [Basic commands](#basic-commands)
- [Environment variables](#environment-variables)
- [NODE env variables](#node-env-variables)
- [Libraries](#libraries)
- [Additional tools which will help you in development](#additional-tools-which-will-help-you-in-development)
- [Other in-code things which can help (development version)](#other-in-code-things-which-can-help-development-version)
- [Structure](#structure)
- [Routing](#routing)
- [Data modules](#data-modules)
- [UI modules](#ui-modules)
- [Translations](#translations)
  - [**Caution**](#caution)
  - [**Possible issues**](#possible-issues)
- [Git Flow](#git-flow)
- [Troubleshooting](#troubleshooting)
- [Code style](#code-style)
  - [Folder structure](#folder-structure)
  - [Configure editors](#configure-editors)
- [To implement:](#to-implement)



Preparing application
---------------------

To start development you need to have [Node.js](http://nodejs.org) installed and run `npm install` command.
After you'll run `npm run dev` command, you've got ready dev server with watching Webpack.
**Remember:** You need all environment variables before you can even install application!

Operators
---------


You have to create local file `config.json` which content will have configuration of operators, e.g.:

```
{
  "star": {
    "domains": [
      "*"
    ],
    "api_username": "website",
    "api_password": "PASSWORD_HERE"
  }
}
```

Basic commands
--------------

- `npm start` - build for production and start this version on `localhost:3000`
- `npm run dev` - start development version on `localhost:3000` with Hot Module Replacement
- `npm run build` - build production-ready version
- `npm test` - run unit tests and generate JUnit report in `build/tests.xml`
- `npm run test_watch` - run unit tests watcher (with Karma)
- `npm run lint` - run code linters **(TODO)**

Environment variables
--------------------

Some of basic stuff, like operators or API connection is get through environment variables.
You should include them in your `.env` file.
(If you don't have one then create it. See [.env.example](.env.example) as reference)

- `OPERATOR` - operator name (default: `star`)
- `HTTP_PORT` - port to start application (default: `3000`)
- `API_URL` - needed for API working version
- `API_USERNAME` - username for `program` user
- `API_PASSWORD` - password for this user
- `NPM_TOKEN` - Access Token for NPM account with access to `@solo/solo-frontend-api`
- `LOG_FORMAT` - Logs formatter - you can switch for development to `pretty`
- `LOG_LEVEL` - Logs level - you can switch for development to `debug`
- `REDIS_MASTER_NAME` - Master name of Redis instance used by Frontend API
- `REDIS_NODES` - Sentinels URL of Redis instance used by Frontend API
- `REDIS_PORT` - Port of Redis instances from line above
- `REDIS_PASSWORD` - Password of Redis instances from line above
- `WEBSOCKET_HOST` - Host where is WebSocket server prepared
- `DISABLE_SERVER_RENDER` - Disable react server side rendering,
- `ENABLE_REDUX_LOGGER` - Enable redux logger
- `IMG_API_URL` - Streaming Services API URL
- `STANDALONE` - Variable defining if website is used as standalone service/app

server (qa/uat/prod) only:
- `GTM_ENV_ID` - String composed of values from GoogleTagManager code snippet configured to be used on multiple envs 

## NODE env variables

- `CONNECTION_TIMEOUT` - a library (`connect-timeout`) will emit a 'timeout' event when requests exceed the `CONNECTION_TIMEOUT`.
                         accepts ms format `string` e.g. 1s - 1 second, 1w - 1 week


Libraries
---------

- [ES6](https://ponyfoo.com/articles/es6) which is transpiled to ES5 by [SWC](https://github.com/vitejs/vite-plugin-react-swc)
- [SCSS](http://sass-lang.com) as CSS Preprocessor
- [Vite](https://vitejs.dev/) for module bundling, look also [here](https://github.com/vitejs/vite)
- [React](https://facebook.github.io/react) for User Interface
- [Redux](http://redux.js.org/) as State Machine
- [Redux-Saga](https://github.com/yelouafi/redux-saga) for handling side effects in Redux
- [Immutable.js](https://facebook.github.io/immutable-js) for immutable structures (used mostly for application state, to achieve real snapshots and brilliant performance)
- [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for basic unit testing
- [Istanbul](https://gotwarlost.github.io/istanbul) for code coverage **(TODO)**
- [ESLint](http://eslint.org) for linting JS code **(TODO)**
- [EditorConfig](http://editorconfig.org) for keeping some code style
- [classnames](https://github.com/JedWatson/classnames) for simplifying className prop setting.
- [Lodash](https://lodash.com) for complex data manipulations.
- [ms](https://www.npmjs.com/package/ms#readme) - stop writing X * Y * Y * 1000 to get the time - `ms('1w')` - 1 week , `ms('1h')` - 1 hour - si much simpler;
Additional tools which will help you in development
---------------------------------------------------

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) to inspect current components structure and state; to enable it in development, switch `devtools` flag in `config/config`

Other in-code things which can help (development version)
---------------------------------------------------------

- React has amazing performance tools - there is `Perf` variable exposed to `window`. [More information](https://facebook.github.io/react/docs/perf.html)

Structure
---------

Basic application structure:

- `app` - files for creating base application
- `config` - all application configuration files
- `modules` - data application
- `styles` - common & layout styles, including also used components
- `ui` - React UI components
- `utils` - shared utils for whole application

More about each part you can read below.

Routing
-------

It's handled by `utils/Router` module. Configuration is placed in `config/routes.json` file: `url => layout ID`.
To use links in code you have to use `utils/Router/Link` component: `<Link route="sport" params={{ id: 'y' }}>Content</Link>`.
It will automatically provide correct URL according to configuration. If few URL patterns matches it, it will use first one.

Data modules
------------

In `modules` directory we've got all domain-oriented modules. Each of them has:

- `actions` - action creators that are needed by application for such domain
- `effects` - sagas, which handle side-effects for actions
- `reducers` - reducers to handle application state changes
- `services` - logic to handle some requests - effects shouldn't handle directly API requests, it's service logic
- `utils` - utils which are commonly used for this domain

*Should be finished.*

UI modules
----------

In `ui` directory there are all UI components which are used. They are splitted to modules connected to specified domain, e.g. `events`.
If some components are using directly application state, we create plain version of them, then we pack it
with high-order component which will be placed in `containers` directory of specified domain.
If we need some mixins/decorators, we put them into `mixins` directory in domain namespace.

Additionally if there are no connection with any domain directly, we put these shared components to `common` directory.

All components has tests in `tests/` subdirectory of component' directory

*Should be finished.*

Translations
--------
Every translation that is added to the system it's part of a section (group), this groups the translations by category like `events`, `sports`, `site` etc. All of the translations defined in website are considered to be in the `site` section. To get translations for any section `events`, `participants` etc., in the request there must be a header `Accept-Language` with a value like `en-gb`. This will return the value for that api translated in the language provided.

There are two ways to translate any text. The first method is by using the `I18n` component and the second will be use `getTranslation` function.

```jsx
getTranslation('feature.key.for.translation', 'translation value');

// The name from the params will be searched in translation and replaced with the value defined.
<I18n
  langKey="feature.key.for.translation"
  defaultText="translation {value}"
  params={{value: 44}}
/>
```

When a new translation was added in the code it must be added to the system by generating a csv file that should be uploaded in Backoffice > CMS application. To generate the csv file a command must be run.

```
npm run generate_languages
```
The files is generated by scanning project source code and matching the above mentioned methods to add translations. When matching the values and key is being extracted from translation.

### **Caution**
When matching `getTranslation` it will match anything from he name for the function until it encounters the following combination of characters and you should make sure these are not added in the translation key/value.

```
// set for getTranslation
// Including spaced between these set of characters
,)
),
);
,{
):

// set for <I18n> translation
>
```

If no error occurs you should see a message like `solo-website/node_task/../build/lang.csv saved.` after all the key values were shown in the console.

### **Possible issues**
There are some cases that the generation of the language file is not finished successfully. Some possible issues may be related to having two translations with the same key, regex fails to match translation because of unknown words/symbols in translation.

Git Flow
--------

- Create branch for specified task with name like `(feature|bugfix)/PLATFORM-999-slugged-task-name`
- Make your changes and prepare unit tests if possible
- Don't forget to prepare tests
- Use this format of commit:
> [PLATFORM-9999] [WIP] Make something very important
>
> - Here you can write few additional comments
> - For example you can write that message header should be with imperative form
> - Or that `WIP` above means that it's still work in progress

Troubleshooting
---------------

- If you have unidentified problems with tests in Wallaby.js which should work, try to clean its cache by adding `workers: { recycle: true }` property
and restarting Wallaby. After that remove this line.

## Code style
### Folder structure
When working on features make sure that you create a folder for that feature in `src/ui` and in the respective folders, here you have a list of folder describing different sections from website. Based on what the feature is doing you should choose wisely where you put your feature in.

The folder structure for a feature should be similar to this:
```
MyFeatured/
  tests/                    // <-- test unit for the feature, folder
  MyFeatured.tsx            // <-- feature's component (dumb component)
  MyFeaturedContainer.tsx   // <-- Create this file only if you're component requires access to state (smart component)
  index.ts                  // <-- entry point for your component, here you should export the MyFeaturedContainer.tsx or MyFeatured.tsx
  styled.ts                 // <-- definition of styled components
  types.ts                  // <-- component's interface/types and everything that defines typing
  config.ts                 // <-- only if it is specific to component constants/configurations
```

Here is a quick description of the current folders:

- `account` - is responsible for features that should be located in the right hand sidebar
- `betting` - everything that is related to bets and bet slip
- `cash out` - specific components that describe in a way the cash out
- `common` - feature that are used in multiple places
- `content` - here you should put components that interacts with CMS that is not related to backoffice (TODO: To consider this folder)
- `events` - components that are related for displaying events/markets/selections i.e. sporting
- `layout` - defines pages/routing that is used for navigation to different pages, it is related to the `configRoutes.ts`
- `sports` - templates that are defining what layout should be used to display a specific sport/event template

### Configure editors
Install the following extensions if you're using `Visual Studio Code`, these will enable auto-formatting and will lint any errors/warnings that you have on you code. The rules for linting are defined in `.eslintrc.js` file.
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

You can have this configuration in `VSCode` to automatically fix any issues on file save. To add this configurations you can use GUI options by pressing `CTRL+SHIFT+P` (if the combination was not changed) then search for `Open Settings (UI)`. Then find all these options, `eslint` options should be under `Extensions > Eslint`.

```json
{
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": false
    },
    "[javascriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": false
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": false
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": false
    },
    "eslint.validate": [
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ],
    "eslint.autoFixOnSave": true
}
```

For linting and fixing issues using eslint from terminal or if you're using other editor that can do this automatically, use the following commands:

- `npm run eslint` - run this command to see all the warnings/errors that were missed
- `npm run eslint:fix` - by running this command you will eslint and auto-fix any code styles that don't follow the ones from configuration file
- `npm run eslint:errors` - will report only errors and you

For custom commands follow this link [eslint comamnd interface](https://eslint.org/docs/user-guide/command-line-interface)

To implement:
-------------

- [ ] Add unit tests
- [x] Add **pre-commit** hook which will run tests and lint code
