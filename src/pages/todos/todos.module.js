import "node_modules/angular-resource/angular-resource.js";
import ThinkOfTheChildren from 'think-of-the-children';
import { TodoStorage, Api, LocalStorage } from 'app-services/todoStorage.js';

import TodoComponent from './components/todo/todo.component.js';

const app = angular.module('todomvc', [
	'ngResource'
]);
ThinkOfTheChildren(app)
	.factory('todoStorage', TodoStorage)
	.factory('api', Api)
	.factory('localStorage', LocalStorage)

	.component('todoComponent', TodoComponent)
