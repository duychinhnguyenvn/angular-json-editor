/*!
 * angular-json-editor.js
 *
 * @brief
 * Angular JSON Editor is a angular module for JSONEditor. JSONEditor is a web-based tool to view, edit, and format JSON.
 * It shows data a clear, editable treeview.
 *
 * Supported browsers: Chrome, Firefox, Safari, Opera, Internet Explorer 8+
 *
 * @license
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *
 * Copyright (c) 2016 Chinh Nguyen, http://angularjsoneditor.oqbox.com
 *
 * @author  Chinh Nguyen, <duychinhnguyenvn@gmail.com>
 * @version 1.0
 * @date    2015-07-06
 */

var jsonEditor=angular.module("angular-json-editor",[]);
jsonEditor.directive("jsonEditor",function(){
	return {
		restrict: 'A',
		scope:{
			model: '=',
			options: '='
		},
		link: function(scope,element, attrs){
			var id="jsoneditor"+Math.floor(Math.random()*100000000); 	
			//console.log("ID: "+id);
			element.attr("id",id);
			attrs.$set('disabled', 'disabled');

			scope.options=scope.options || {};
			scope.options.change= function(){
				setTimeout(function(){ 
					scope.$apply(function(){
							if(scope.editor!=undefined){
								scope.model=scope.editor.get();
							}							
					});
				});						
			};
			scope.editor;			
			scope.setup={};
			scope.setup=angular.extend(scope.setup,scope.options);
			scope.model=scope.model || {};
			scope.container = document.getElementById(id);
			scope.editor = new JSONEditor(scope.container, scope.setup,scope.model);

			scope.globalTimeout=null;
			scope.delay_timeout=function(second_time,func){
				if(scope.globalTimeout != null) clearTimeout(scope.globalTimeout); 
				scope.globalTimeout =setTimeout(function(){func();},second_time);
			}
			// Update editor when change model
			scope.$watch(function(){return scope.model;},function(){
				scope.delay_timeout(1000,function(){
					//console.log("Change on "+id);
					var json1=angular.toJson(scope.model);
					var json2=angular.toJson(scope.editor.get());
					if(!angular.equals(json1,json2)){
						scope.editor.set(scope.model);
					}
				});	
			},true);
			scope.$watchCollection(function(){return scope.model;},function(){
				scope.delay_timeout(1000,function(){
					////console.log("Change on "+id);
					var json1=angular.toJson(scope.model);
					var json2=angular.toJson(scope.editor.get());
					if(!angular.equals(json1,json2)){
						scope.editor.set(scope.model);
					}
				});	
			});

			// Update editor when change options
			scope.$watch(function(){return scope.options;}, function (newValue, oldValue) {
				scope.setup=angular.extend(scope.setup,scope.options);
                    for (var k in newValue) {
                        if (newValue.hasOwnProperty(k)) {
                            var v = newValue[k];
                            if (newValue[k] !== oldValue[k]) {
                                if (k === 'mode') {
                                    scope.editor.setMode(v);
                                } else if (k === 'name') {
                                    scope.editor.setName(v);
                                } else { //other settings cannot be changed without re-creating the JsonEditor
                                    //scope.editor = new JSONEditor(scope.container, scope.setup,scope.model);                                    
                                    //return;
                                }
                            }
                        }
                    }
                }, true);
		}
	}
});

jsonEditor.directive("jsonEditorInput",function(){
	var strVar="";
	strVar += "<div ng-show=\"setupconfiguration.editable\" class=\"input-group\">";
	strVar += "  <input type=\"text\" class=\"form-control\" ng-class=\"{'json-error' : jsonError}\" ng-model=\"stringJson\" \/>";
	strVar += "	 <div class=\"input-group-btn\"><button type=\"button\" class=\"btn {{setupconfiguration.viewButtonClass}}\" data-toggle=\"modal\" data-target=\"#{{id}}-view-modal-lg\"><span class=\"glyphicon glyphicon-eye-open\" aria-hidden=\"true\"></span><\/button><button type=\"button\" class=\"btn {{setupconfiguration.editButtonClass}}\" data-toggle=\"modal\" data-target=\"#{{id}}-edit-modal-lg\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span><\/button><\/div>";
	strVar += "<\/div>";
	strVar += "<div ng-show=\"!setupconfiguration.editable\" class=\"input-group\">";
	strVar += "  <input type=\"text\" class=\"form-control\" value=\"{{model|json}}\" ng-disabled=\"true\"\/>";
	strVar += "	 <div class=\"input-group-btn\"><button type=\"button\" class=\"btn {{setupconfiguration.viewButtonClass}}\" data-toggle=\"modal\" data-target=\"#{{id}}-view-modal-lg\"><span class=\"glyphicon glyphicon-eye-open\" aria-hidden=\"true\"></span><\/button><\/div>";
	strVar += "<\/div>";
	strVar += "";
	strVar += "<div ng-show=\"setupconfiguration.editable\" class=\"modal fade\" id=\"{{id}}-edit-modal-lg\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\">";
	strVar += "  <div class=\"modal-dialog modal-lg\" style=\"width: 90%;\">";
	strVar += "    <div class=\"modal-content\" style=\"padding: 10px;\"> ";
	strVar += "      <div class=\"json-editor-menu-tools\">";
	strVar += "        <span class=\"title\">JSON Editor<\/span>";
	strVar += "        <div class=\"btn-group pull-right\" role=\"group\" aria-label=\"...\">";
	strVar += "      	<button ng-hide=true type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"copy()\">Past from clipboard<\/button>";
	strVar += "      	<button ng-hide=true type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"copy()\">Copy to clipboard<\/button>";
	strVar += "      <\/div>";
	strVar += "      <\/div>    ";
	strVar += "    <div class=\"row\">";
	strVar += "      <div class=\"json-editor-left-col\">";
	strVar += "        <div style=\"height: 400px;\" json-editor model=\"model\" options=\"{mode: 'tree',modes:['tree','code']}\"><\/div>";
	strVar += "      <\/div>";
	strVar += "      <div class=\"json-editor-right-col\">";
	strVar += "        <pre style=\"height: 400px;\">{{model | json}}<\/pre>";
	strVar += "      <\/div>";
	strVar += "    <\/div>";
	strVar += "    <\/div>";
	strVar += "  <\/div>";
	strVar += "<\/div>";
	strVar += "";
	strVar += "<div class=\"modal fade\" id=\"{{id}}-view-modal-lg\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\">";
	strVar += "  <div class=\"modal-dialog modal-lg\">";
	strVar += "    <div class=\"modal-content\">";
	strVar += "      <pre style=\"margin: 0px;\">{{model | json}}<\/pre>";
	strVar += "    <\/div>";
	strVar += "  <\/div>";
	strVar += "<\/div>";

	return {
		restrict: 'E',		
		scope:{
			model: '=',
			configuration: '=',
			onError: '&'
		},
		template: strVar,
		link: function(scope, element, attr){	
			scope.id=Math.floor(Math.random()*100000000); 
			scope.onError=scope.onError||function(err){};
			scope.configuration=scope.configuration||{};
			scope.setupconfiguration={
				editable: true,
		        viewButtonClass: 'btn-default',
		        editButtonClass: 'btn-default',		        
			};

			scope.setupconfiguration=$.extend(scope.setupconfiguration,scope.configuration);
			

			// Update configuration when change configuration
			scope.$watch(function(){return scope.configuration;},function(newVal,oldVal){
				scope.setupconfiguration=angular.extend(scope.setupconfiguration,scope.configuration);
			},true);

			scope.globalTimeout=null;
			scope.delay_timeout=function(second_time,func){
				if(scope.globalTimeout != null) clearTimeout(scope.globalTimeout); 
				scope.globalTimeout =setTimeout(function(){func();},second_time);
			}

			scope.stringJson=angular.toJson(scope.model);
			scope.jsonError=false;

			scope.$watch(function(){return scope.model;},function(newVal,oldVal){
				//console.log("change json string");
					var json1=angular.toJson(scope.model);					
					if(!angular.equals(json1,scope.stringJson)){
						scope.stringJson=angular.toJson(scope.model);
					}				
			},true);
			scope.$watchCollection(function(){return scope.model;},function(newVal,oldVal){
				//console.log("change json string");
					var json1=angular.toJson(scope.model);					
					if(!angular.equals(json1,scope.stringJson)){
						scope.stringJson=angular.toJson(scope.model);
					}				
			});

			scope.$watch(function(){return scope.stringJson;},function(newVal,oldVal){
				if(!angular.equals(newVal,oldVal)){
					try {
				        scope.model=JSON.parse(newVal);
				        scope.jsonError=false;
				    } catch (except) {
				        scope.jsonError=true;			        
						setTimeout(function(){ 
							scope.$apply(function(){
									scope.onError({err: except});									
								});
						});
				        
				    }					
				}			
			});


		}
	}
});