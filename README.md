# WALLET EXCHANGE APP

App to compare FX Rates using Exchange Rates API, React and Context Api.

Project stack:

- Webpack 4
- React 16.6
- Sass
- Lint (Eslint, Prettier e Stylelint)
- Precommit Lints
- Visual Studio Code config like Lint Integration

# Demo

[https://qoxou.sse.codesandbox.io/](https://qoxou.sse.codesandbox.io/)

# What you need?

- Node.js 8.4.0 or more
- NPM
- Yarn

# Install

After clone the repo execute:

```sh
$ yarn install
```

# Setup of your IDE

To maintain code quality and always have a standard across all of the team's
project has rules defined for javascript and css / scss. We use the Eslint /
Prettier for Javascript / React and Stylelint for SCSS. It is necessary to
integration of these rules with your favorite IDE. We recommend using Visual
Studio Code with the following plugins:

| Plugin    | README                                                                                     |
| --------- | ------------------------------------------------------------------------------------------ |
| ESlint    | [check plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) |
| Prettier  | [check plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) |
| stylelint | [check plugin](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)       |

# Pre-commit

Before running git commit, the rules of ESLint and Stylelint are executed. If
there is an error or some non-default code of the site will generate an error
and you will not be able to commit.

# Environments

Basically the project has two environments:

- Development
- Production (used only for build and simulate production mode)

# Configuration

The webpack configurations and environments that are shared within are in the
"config" directory at the root of the project. Below a description of each file:

| File                   | Description                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| common.json            | Common infos that can be shared in application                                                                   |
| webpack.common.js      | Default webpack settings that are shared across all environments                                                 |
| webpack.config.js      | Default file that is called by the webpack that manages the loading of the settings according to the environment |
| webpack.development.js | Webpack settings that are only valid in "Development" mode                                                       |
| webpack.production.js  | Webpack settings that are valid only in "Production" mode                                                        |

To read the entries that are in the configuration files via javascript use: For
example your common.json file looks like this:

```json
{
  "namespace": "wexg"
}
```

Retrieves the information as follows:

```javascript
console.log(common.namespace);
```

# Running the project

Here are the commands that are used in the project:

| Command      | Description                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------- |
| yarn run dev | Run the project in development mode with webpack and its settings. The webpack runs on port 8080. |

# Build

For run the build execute:

```sh
$ yarn build
```
