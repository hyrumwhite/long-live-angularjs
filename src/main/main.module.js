
import "node_modules/todomvc-common/base.css";
import "node_modules/todomvc-app-css/index.css";

import './main.styl';

import "node_modules/todomvc-common/base.js";
import angular from 'angular';
import "node_modules/angular-route/angular-route.js";
import Router from "@uirouter/angularjs";
import OCLazyLoad from 'oclazyload';

import RouteConfig from './config/route.config.js';
import MainNav from './components/main-nav/main-nav.component.js';

let app = angular.module('main', [
  Router,
  OCLazyLoad
])
app
   .config(RouteConfig)
   .component('mainNav', MainNav)
