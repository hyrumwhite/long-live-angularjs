export default {
  bindings: {
    todos:'<',
    remainingCount:'<',
    completedCount: '<',
    status:'<',
    onClearCompleted: '&'
  },
  controller() {
    this.clearCompleted = () => this.onClearCompleted();
  },
  template: `
    <footer class="footer" ng-show="$ctrl.todos.length" ng-cloak>
      <span class="todo-count"><strong>{{$ctrl.remainingCount}}</strong>
        <ng-pluralize count="$ctrl.remainingCount" when="{ one: 'item left', other: 'items left' }"></ng-pluralize>
      </span>
      <ul class="filters">
        <li><a ng-class="{selected: $ctrl.status == ''} " href="#/">All</a></li>
        <li><a ng-class="{selected: $ctrl.status == 'active'}" href="#/active">Active</a></li>
        <li><a ng-class="{selected: $ctrl.status == 'completed'}" href="#/completed">Completed</a></li>
      </ul>
      <button class="clear-completed" ng-click="$ctrl.clearCompleted()" ng-show="$ctrl.completedCount">Clear completed</button>
    </footer>
  `
}
