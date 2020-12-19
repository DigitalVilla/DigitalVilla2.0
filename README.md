[<p align="center"><img src="https://images.ctfassets.net/pmkj1uycby9e/3G4uz5HTKLAOGWdg9Gudfp/d9a349299df8768d2800b3ded5d3870c/Logo.svg" width="450"></p>](https://digitalvilla.ca)

## Monorepo for Serverless Applications with React & AWS

> Built on top of NX and the Serverless framework

## Requisites

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed globally
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/) installed globally
- [Nx CLI](https://nx.dev/latest/react/cli/overview) installed globally
- [NVM](https://github.com/nvm-sh/nvm) installed globally or use Node 12.x
- Setup AWS CLI and Serverless with [AWS Credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials#setup-with-serverless-config-credentials-command)

## Installation

- Set the correct Node version
  - `nvm use`
- Install all Node dependencies
  - `yarn install`

# Development

## React development

- **Create** a new application
  - `yarn app:new <AppName>`
- **Add** a new component in a directory
  - `yarn app:addComponent <AppName> [Components] <directory>`
  - Note: The default directory is AppName/src/app/components
  - Note: Use flag `--dir` to change to AppName/src/app/`directory`
  ```
  # Example
  yarn app:addComponent digitalvilla Button DatePicker Menu
  yarn app:addComponent digitalvilla Home NotFound --dir pages
  ```
- **Remove** a component from a directory
  - `yarn app:removeComponent <AppName> [Components] <directory>`
- **Serve** the application locally
  - `yarn app:serve <AppName> [port (optional)]`
  ```
  # Example
  yarn app:serve digitalvilla --port 4321
  ```
- **Build** the application to dist/
  - `yarn app:build <AppName> <skipCache (optional)>`
  - `--skip-cache` forces a clean build
- **Deploy** an AWS cloudformation
  - `yarn app:deploy <AppName> [stage, region (optional)]`
  ```
  # Example
  yarn app:deploy digitalvilla --stage prod --region ca-central-1
  ```
- **Remove** the app's AWS cloudformation
  - `yarn app:remove <AppName> [stage, region (optional)]`
- **Remove** the apps' cloudFormation and the directory from this workspace
  - `yarn app:destroy <AppName> [stage, region (optional)]`

## Serverless development

- **Create** a new API
  - `yarn api:new <ApiName>`
  - Note: Do not add the suffix `"-api"` to the `<ApiName>`. It is automatically added by script
- **Add** a npm package to API
  - `yarn api:addPackage <ApiName> [yarn params]`
  ```
  # Examples
  yarn api:addPackage digitalvilla --dev dotenv serverless-app-sync-sdk
  yarn api:addPackage digitalvilla graphql react-templates
  ```
- **Remove** a npm package from API
  - `yarn api:removePackage <ApiName> [yarn params]`
- **Build** API for deployment to dist/
  - `yarn api:build <ApiName> [stage, region, ApiBuildOptions (optional)]`
  - Note: ApiBuildOptions for faster builds (applicable only to APIs):
    - `--skip-func`: Skip recompiling functions/ code
    - `--skip-libs`: Skip recompiling libs/ libraries
    - `--skip-node`: Skip installing node dependencies
    - `--only-func`: Compile only the functions/ directory
- **Serve** the API locally / offline
  - `yarn api:serve <ApiName> [stage, region, port (optional)]`
  ```
  # Examples
  yarn api:serve digitalvilla --stage dev --port 4321
  yarn api:serve digitalvilla --only-func
  ```
- **Deploy** to an AWS cloudformation
  - `yarn api:deploy <ApiName> [stage, region (optional)]`
- **Remove** the AWS cloudformation
  - `yarn api:remove <ApiName> [stage, region (optional)]`
- **Remove** the AWS cloudformation and the API from this workspace
  - `yarn api:destroy <ApiName> [stage, region (optional)]`

## Library development

- **Create** a new library
  - `yarn lib:new <LibName>`
- **Remove** the library from this workspace
  - `yarn lib:destroy <LibName>`

# General

- Libraries are sharable across libraries and applications. They can be imported from `@digitalvilla/libName`
- Only library imports inside API's must be `pure` (this rule does not apply to imports inside apps)

  - **Pure library imports:**
  - The name of the import `must match` the filename of the exporter

  ```
  import { Response } from '@digitalvilla/lambdas'
  ## Exported by libs/..../Response.js
  ```

  - The exporter file exports `only one` Object | Function | Array
  - The exporter file `must not` depend on another import (export must be self sufficient)

  ```
  // At someExport.js
  import { someUtil } from '@digitalvilla/utils'

  export someExport = () => {
    ...
    return someUtil()
  }

  ## This will result in a missing dependency as `someUtil` will not be compiled
  ```

- The library `lambdas` contains only pure exports and can be used across all projects
- Only app:serve `automatically updates` the server if you change any of the source files.
- You need to kill api:serve and run it again to update changes
- app:serve is hosted by default at `http://localhost:4200`
- api:serve is hosted by default at `http://localhost:3000/[stage]/[function]`

### Testing with NX

- Run linting
  - `nx lint <[App|Api]Name>`
- Run tests
  - `nx test <[App|Api]Name>`
- Open end to end Cypress
  - `nx e2e <AppName>`
- Open the dependency graph
  - `nx dep-graph`

### Running unit tests

- Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

- Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

- Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

- Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

- Run `nx dep-graph` to see a diagram of the dependencies of your projects.

### Further help

- Visit the [Nx Documentation](https://nx.dev) to learn more.
- Visit the [Serverless Documentation](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml) to learn more.
