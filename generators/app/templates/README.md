# `ng-supack`
> Yet another minimal seed app for Angular 1.x powered by Webpack.

### Usage

```bash
  # clone the application and change directory
  $ git clone https://github.com/umayr/ng-supack.git && cd $_ 
  
  # install dependencies
  $ npm install
  
  # run the webpack dev server
  $ npm start
```

### Features

The directory structure is based on John Papa's [style guide](https://github.com/johnpapa/angular-styleguide) 
with a minor addition of stylesheets being included in the module directory.

#### Structure:

```
.
├── app
│   ├── images
│   │   ├── angular.png
│   │   └── webpack.png
│   ├── index.html
│   └── src
│       ├── app.module.js
│       ├── common
│       │   ├── common.module.js
│       │   └── common.scss
│       ├── core
│       │   ├── core.module.js
│       │   ├── core.scss
│       │   ├── restangular.config.js
│       │   ├── router.config.js
│       │   └── router.run.js
│       └── welcome
│           ├── welcome.controller.js
│           ├── welcome.html
│           ├── welcome.module.js
│           └── welcome.scss
├── LICENSE
├── package.json
└── webpack.config.js

```

#### Linting:

```bash
  $ npm run lint
```

It uses `eslint` for linting that includes [`angularjs-eslint`](https://github.com/Gillespie59/angularjs-eslint) 
plugin that makes sure you're properly following John Papa's guidelines. Although it uses shareable configuration
so things that you don't agree with can be changed.

