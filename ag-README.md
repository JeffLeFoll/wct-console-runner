## angular 1.5 generator
[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![AppVeyor Build Status][appveyor-badge]][appveyor-badge-url]
[![Test Coverage][coveralls-badge]][coveralls-badge-url]
[![Dependency Status][david-badge]][david-badge-url]
[![devDependency Status][david-dev-badge]][david-dev-badge-url]

A command line utility to quickly generate angular 1.5 component and route-component written in TypeScript.

## Prerequisites

The generated project has dependencies that require **Node 4.5.x and NPM 3.x.x**.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Generating Components and Routes Components](#generating-components-and-routes-components)
* [Generating or Updating Components/Routes module's index file](#generating-or-updating-componentsroutes-modules-index-file)
* [Configuration](#configuration)
* [Updating](#updating)
* [Contributing](#contributing)

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)
```bash
npm install -g angular15-generator
```

## Default structure

By default the tool assume that you use the following project structure:

    root
    └── src
        └── app
            ├── components
            ├── filters
            ├── routes
            └── services

If this is not your project structure, please have a look at the [Configuration](#configuration) section.

## Usage

```bash
ag --help
ag -v  / ag --version
ag g --help
ag g component --help
ag g route --help
ag g service --help
ag g filter --help
```

### Generating Components

You can use the `ag g` command to generate Angular components:
```bash
ag g component my-new-component
ag g route my-new-route-component
ag g service my-new-route-service
ag g filter my-new-route-filter
```

If you want to create your component/route/service/filter in an other folder that the one configured 
you can use the following syntax (**even on Windows system**) : 
```bash
ag g component down/my-new-component
    => will create the component in /src/app/components/down/my-new-component
ag g route ../up/my-new-route-component
    => will create the route in /src/app/up/my-new-route-component
```
Please note that this is also compatible with the `--uc` flag describe below.

### Generating or Updating module's index file

You can use the `--uc` to update or create the module's index.ts file
(with a name or not, the default one is in the config file).
```bash
ag g component my-new-component --uc
ag g route my-new-route-component --uc routes.ts
```
Alternatively you can set the option `updateOrCreate` to true in your config file to always update module's index.ts file.

If you use WebPack to build your project by setting the flag `useWebpackRequire` in the configuration file 
the tool will require the html template file instead of using the template URL.

### Configuration

If our project's structure does not match yours, you can override it:

```bash
ag config
```

This will add a new file `angular-generator.config.json` in your root directory.

You can edit this file to specify your project's structure.

```json
{
  "componentsRoot": "src/app/components",
  "routesRoot": "src/app/routes",
  "servicesRoot": "src/app/services",
  "filtersRoot": "src/app/filters",
  "componentsRootModuleName": "index.ts",
  "routesRootModuleName": "index.ts",
  "servicesRootModuleName": "index.ts",
  "filtersRootModuleName": "index.ts",
  "updateOrCreate": false,
  "useWebpackRequire": false
}
```
(This is the config.json file for our default project structure)
N.B: even on Windows you **should** use the `/` separator, the CLI will handle it correctly.

### Updating
**Before updating it is recommended to backup your custom config file and regenerate it**

To update `angular15-generator` to a new version, you must update both the global package and your project's local package.

Global package:
```
npm uninstall -g angular15-generator
npm cache clean
npm install -g angular15-generator@latest

=> then check for new configuration options in the config file.
```

## Contributing

Currently the tool is available in French and English.

Feel free to send a PR with your locale file (see in `/lib/cli/locales`).

## License

This project is licensed under the [MIT License](LICENSE).

[npm-badge]: https://img.shields.io/npm/v/angular15-generator.svg
[npm-badge-url]: https://www.npmjs.com/package/angular15-generator
[travis-badge]: https://img.shields.io/travis/JeffLeFoll/angular15-generator/master.svg?label=TravisCI
[travis-badge-url]: https://travis-ci.org/JeffLeFoll/angular15-generator
[appveyor-badge]: https://img.shields.io/appveyor/ci/JeffLeFoll/angular15-generator/master.svg?label=AppVeyor
[appveyor-badge-url]: https://ci.appveyor.com/project/JeffLeFoll/angular15-generator/branch/master
[coveralls-badge]: https://img.shields.io/coveralls/JeffLeFoll/angular15-generator/master.svg
[coveralls-badge-url]: https://coveralls.io/github/JeffLeFoll/angular15-generator
[david-badge]: https://david-dm.org/JeffLeFoll/angular15-generator.svg
[david-badge-url]: https://david-dm.org/JeffLeFoll/angular15-generator
[david-dev-badge]: https://david-dm.org/JeffLeFoll/angular15-generator/dev-status.svg
[david-dev-badge-url]: https://david-dm.org/JeffLeFoll/angular15-generator?type=dev
