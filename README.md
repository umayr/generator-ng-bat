# `generator-ng-bat` [![Build Status](https://travis-ci.org/umayr/generator-ng-bat.svg?branch=master)](https://travis-ci.org/umayr/generator-ng-bat)
> Yet another minimal generator for Angular 1.x powered by Webpack.

### Usage

```bash
  # install yeoman and generator globally
  $ npm install -g yo generator-ng-bat
  
  # create an empty directory
  $ mkdir dummy && cd $_
  
  # invoke generator
  $ yo ng-bat
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

#### Development:
To start development server, try:
```
  $ npm start
```
It starts a `webpack-dev-server` instance with hot module loading.

#### Linting:

```bash
  $ npm run lint
```

It uses `eslint` for linting that includes [`angularjs-eslint`](https://github.com/Gillespie59/angularjs-eslint) 
plugin that makes sure you're properly following John Papa's guidelines. Although it uses shareable configuration
so things that you don't agree with can be changed.

#### Sub-generators:

While generator creates an app structure, sub-generators create parts of app for e.g. controller, service etc.
##### Controller:

Invoked by: 
```bash
  $ yo ng-bat:controller dashboard.user
```
Creates a `user.controller.js` file in the `dashboard` module:
```javascript
'use strict';

module.exports = controller;

/* @ngInject */
function controller($log) {
  var vm = this;

  vm.welcomeMessage = 'Yet another generator for angular powered by webpack.';
  vm.testFunction = testFunction;

  if (__DEV__) { // eslint-disable-line no-undef
    $log.info('Initializing controller');
  }

  function testFunction(num) {
    $log.info('This is a test function number ' + num);
  }
}

```

When provided with flag `--with-view`, it also creates a view with same name in the provided module:
```bash
  $ yo ng-bat:controller dashboard.user --with-view
```
##### Factory:

Invoked by:
```bash
  $ yo ng-bat:factory dashboard.utils
```
Creates a `utils.factory.js` in the `dashboard` module:
```javascript
'use strict';

module.exports = factory;

/* @ngInject */
function factory($log) {
  return {
    testFunction: testFunction
  };

  function testFunction() {
    $log.info('This is a test function.');
  }
}

```
##### View:
Invoked by:
```bash
  $ yo ng-bat:view dashboard.nav
```
Creates a `nav.html` file in the `dashboard` module:
```html
<div class="container">
  <p>A very empty view.</p>
</div>
```
##### Directive:

Invoked by:
```bash
  $ yo ng-bat:directive common.ui-submit
```
Creates a `uiSubmit.directive.js` file in `common` module:

```javascript
'use strict';

module.exports = directive;

/* @ngInject */
function directive($log) {

  return {
    link: link,
    restrict: 'E',
    template: '<div></div>',
    scope: {
      test: '='
    }
  };

  function link(/*scope, elem, attrs*/) {
    if (__DEV__) { // eslint-disable-line no-undef
      $log.info('Initializing directive');
    }
  }
}

```
##### Filter:

Invoked by:
```bash
  $ yo ng-bat:filter common.currency 
```

Creates a `currency.filter.js` file in the `common` module:
```javascript
'use strict';

module.exports = filter;

/* @ngInject */
function filter() {
  return function (input) {
    return 'currency filter: ' + input;
  };
}

```
##### Constant:

Invoked by:
```bash
  $ yo ng-bat:constant common.http-codes
```

Creates a `httpCodes.constant.js` file in the `common` module:
```javascript
'use strict';

module.exports = {
  ConstantKey: 'CONSTANTVALUE'
};

```
##### Value:

Invoked by:
```bash
  $ yo ng-bat:value common.messages
```

Creates a `messages.value.js` file in the `common` module:
```javascript
'use strict';

module.exports = {
  key: 'value'
};

```

#### Production:
To create a build:
```
  $ npm run build
```
#### License
```
The MIT License (MIT)

Copyright (c) 2015 Umayr Shahid <umayrr@hotmail.co.uk> (https://bandooqwala.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
