export default ($stateProvider, $urlRouterProvider, $locationProvider) => {
  $locationProvider.hashPrefix('');
  const defaultState = {
    name: 'default',
    url: '/:status',
    component:'mainComponent',
    resolve: {
      store(todoStorage) {
        return todoStorage.getService().then(service => {
          service.get();
          return service;
        });
      }
    }
  }
  $stateProvider.state(defaultState);
  $urlRouterProvider.otherwise('/');
}
