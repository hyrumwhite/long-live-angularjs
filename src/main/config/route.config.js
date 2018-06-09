export default ($stateProvider, $urlRouterProvider, $locationProvider) => {
  $locationProvider.hashPrefix('');
  const defaultState = {
    name: 'default.**',
    url: '/tasks/:status',
    component:'todoComponent',
    resolve: {
      module:['$ocLazyLoad', $ocLazyLoad => $ocLazyLoad.load('todos.module.js')]
    }
  }
  $stateProvider.state(defaultState);
  $urlRouterProvider.otherwise('/tasks/');
}
