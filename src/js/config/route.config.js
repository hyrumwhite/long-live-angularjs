export default ($stateProvider, $urlRouterProvider, $locationProvider) => {
  $locationProvider.hashPrefix('');
  const defaultState = {
    name: 'default',
    url: '/:status',
    controller: 'TodoCtrl',
    templateUrl: 'todomvc-index.html',
    params: {
      status: {
        type:'string',
        value: '',
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
