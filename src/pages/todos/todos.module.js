import "node_modules/angular-resource/angular-resource.js";
import { TodoStorage, Api, LocalStorage } from 'app-services/todoStorage.js';

import TodoEscape from './directives/todoEscape.js';
import TodoFocus from './directives/todoFocus.js';

import TodoComponent from './components/todo/todo.component.js';
import TodoList from './components/todo/todo-list/todo-list.component.js';
import NavFooter from './components/todo/nav-footer/nav-footer.component.js';
import InfoFooter from './components/todo/info-footer/info-footer.component.js';


angular.module('todomvc', [
	'ngResource'
])
	.factory('todoStorage', TodoStorage)
	.factory('api', Api)
	.factory('localStorage', LocalStorage)

	.component('todoComponent', TodoComponent)
	.component('todoList', TodoList)
	.component('navFooter', NavFooter)
	.component('infoFooter', InfoFooter)

	.directive('todoEscape', TodoEscape)
	.directive('todoFocus', TodoFocus)
