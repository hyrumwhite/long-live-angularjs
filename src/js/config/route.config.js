const routeConfig = ($stateProvider, $urlRouterProvider, $locationProvider) => {
  $locationProvider.hashPrefix('');
  const defaultState = {
    name: 'default',
    url: '/:status',
    controller: 'TodoCtrl',
    templateUrl: 'todomvc-index.html',
    params: {
      status: {
        type:'string',
        value: 'completed',
        squash: false
      }
    },
    resolve: {
      store(todoStorage) {
        // Get the correct module (API or localStorage).
        todoStorage.get();
        return todoStorage;
      }
    }
  }
  $urlRouterProvider.otherwise('/');
  $stateProvider.state(defaultState);
}

export default routeConfig;
