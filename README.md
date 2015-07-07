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
