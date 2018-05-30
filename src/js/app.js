import "node_modules/todomvc-common/base.css";
import "node_modules/todomvc-app-css/index.css";

import "node_modules/todomvc-common/base.js";
import angular from 'angular';
import "node_modules/angular-route/angular-route.js";
import "node_modules/angular-resource/angular-resource.js";
import Router from "@uirouter/angularjs";

import RouteConfig from 'app-config/route.config.js';
import { TodoStorage, Api, LocalStorage } from 'app-services/todoStorage.js';
import TodoCtrl from 'app-controllers/todoCtrl.js';
import TodoEscape from 'app-directives/todoEscape.js';
import TodoFocus from 'app-directives/todoFocus.js';


angular.module('todomvc', [
	Router,
	'ngResource'
])
	.config(RouteConfig)
	.factory('todoStorage', TodoStorage)
	.factory('api', Api)
	.factory('localStorage', LocalStorage)
	.controller('TodoCtrl', TodoCtrl)
	.directive('todoEscape', TodoEscape)
	.directive('todoFocus', TodoFocus)
