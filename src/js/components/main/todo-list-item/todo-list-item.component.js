export default {
  bindings:{
    todos:'<',
    store:'<',
  },
  controller() {
    this.originalTodo = null;
    this.editedTodo = null;
    this.editTodo = todo => {

    };
    this.saveEdits = this.saveEdits = (todo, event) => {
			// Blur events are automatically triggered after the form submit event.
			// This does some unfortunate logic handling to prevent saving twice.
			if (event === 'blur' && this.saveEvent === 'submit') {
				this.saveEvent = null;
				return;
			}
      this.saveEvent = event;
			if (this.reverted) {
				// Todo edits were reverted-- don't save.
				this.reverted = null;
				return;
			}

			todo.title = todo.title.trim();
			if (todo.title === this.originalTodo.title) {
				this.editedTodo = null;
				return;
			}

			this.store[todo.title ? 'put' : 'delete'](todo)
				.then(() => {})
        .catch(() => todo.title = this.originalTodo.title)
				.finally(() => this.editedTodo = null);
		};
  },
  template: `
    <li ng-repeat="todo in $ctrl.todos | filter:$ctrl.statusFilter track by $index" ng-class="{completed: todo.completed, editing: todo == $ctrl.editedTodo}">
      <div class="view">
        <input class="toggle" type="checkbox" ng-model="todo.completed" ng-change="$ctrl.toggleCompleted(todo)">
        <label ng-dblclick="$ctrl.editTodo(todo)">{{todo.title}}</label>
        <button class="destroy" ng-click="$ctrl.removeTodo(todo)"></button>
      </div>
      <form ng-submit="$ctrl.saveEdits(todo, 'submit')">
        <input
          class="edit"
          ng-trim="false"
          ng-model="todo.title"
          todo-escape="$ctrl.revertEdits(todo)"
          ng-blur="$ctrl.saveEdits(todo, 'blur')"
          todo-focus="todo == $ctrl.editedTodo"
        >
      </form>
    </li>
  `
}
