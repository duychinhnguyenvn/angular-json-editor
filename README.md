# Angular JSON Editor Directives
Angular.js directive for Jos de Jong's JSON Editor. Website: http://angular-json-editor.oqbox.com
<img alt="json editor" src="https://raw.github.com/josdejong/jsoneditor/master/misc/jsoneditor.png">
## Requirements
- [Bootstrap](http://getbootstrap.com/)
- jQuery
- AngularJS
- [Jsoneditor](https://github.com/josdejong/jsoneditor)

## Usage
Load the script files in your application:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <title>Angular JSON Editor Directives</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">  
    <link rel="stylesheet" href="css/jsoneditor.css">
    <link rel="stylesheet" href="css/angular-json-editor.css">
    
    <script src="js/angularjs/angular.min.js"></script>
    <script src="js/jsoneditor/jsoneditor.min.js"></script>
    <script src="js/angular-json-editor/angular-json-editor.js"></script>
    ...
  </head>
  <body>
    ...
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
```
Add the 'angular-json-editor' module as a dependency to your application module:
```javascript
var myAppModule = angular.module('MyApp', ['angular-json-editor']);
```
Finally, add the directive to your html:
```html
<div style="height: 400px;" json-editor type="text" model="obj" options="options"/>
```
## Demo
Link http://angular-json-editor.oqbox.com/
### Sample code
```javascript
myAppModule.controller('MyController', [ '$scope', function($scope) {
  $scope.people={
      "name": "Mr A. Payne",
      "address": {
        "street": "30 Commercial Road",
        "city area/district": "Fratton"
      }
    };
  $scope.configuration={
      "editable": false,
      "viewButtonClass": "btn-info",
      "editButtonClass": "btn-success"
    };
    $scope.options={
      "mode": "code",
      "modes": [
        "tree",
        "form",
        "code",
        "text"
      ],
      "history": false
    };
});
```
Input directive:
```html
<json-editor-input model="people" configuration="configuration"/>
```
Or full editor directive:
```html
<div json-editor model="people" options="options" style="height: 400px;"/>
```
### Licence
The MIT License (MIT)

Copyright (c) 2014 Filippo Oretti, Dario Andrei

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
