export default ($stateProvider, $urlRouterProvider, $locationProvider) => {
  $locationProvider.hashPrefix('');
  const defaultState = {
    name: 'default',
    url: '/:status',
    component:'mainComponent',
    resolve: {
      store(todoStorage) {
        todoStorage.get();
        return todoStorage;
      }
    }
  }
  $stateProvider.state(defaultState);
  $urlRouterProvider.otherwise('/');
}
