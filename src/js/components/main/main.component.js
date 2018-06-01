import template from './main.html';

export default {
  bindings:{
    store: '<',
  },
  template,
  controller($scope, $stateParams, $filter, $state) {
    this.$onChanges = ({store}) => store && init();
    let todos = [];
    const init = () => {
      todos = this.todos = this.store.todos;
      this.newTodo = '';
      this.editedTodo = null;
    }

		$scope.$watch('$ctrl.todos', (newValue, oldValue) => {
			this.remainingCount = $filter('filter')(todos, { completed: false }).length;
			this.completedCount = todos.length - this.remainingCount;
			this.allChecked = !this.remainingCount;
		}, true);

		var status = this.status = $stateParams.status || '';

		this.statusFilter = (status === 'active') ?
			{ completed: false } : (status === 'completed') ?
			{ completed: true } : {};

		this.addTodo = () => {
			var newTodo = {
				title: this.newTodo.trim(),
				completed: false
			};

			if (!newTodo.title) {
				return;
			}

			this.saving = true;
			this.store.insert(newTodo)
				.then(() => {
					this.newTodo = '';
				})
				.finally(() => {
					this.saving = false;
				});
		};

		this.editTodo = todo => {
			this.editedTodo = todo;
			// Clone the original todo to rethis.store it on demand.
			this.originalTodo = angular.extend({}, todo);
		};

		this.saveEdits = (todo, event) => {
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

		this.revertEdits = todo => {
			todos[todos.indexOf(todo)] = this.originalTodo;
			this.editedTodo = null;
			this.originalTodo = null;
			this.reverted = true;
		};

		this.removeTodo = todo => {
			this.store.delete(todo);
		};

		this.saveTodo = todo => {
			this.store.put(todo);
		};

		this.toggleCompleted = (todo, completed) => {
			if (angular.isDefined(completed)) {
				todo.completed = completed;
			}
			this.store.put(todo, todos.indexOf(todo))
				.then(() => {})
        .catch(() => todo.completed = !todo.completed);
		};

		this.clearCompletedTodos = () => this.store.clearCompleted();

		this.markAll = completed =>
			todos.forEach(todo =>
        todo.completed !== completed && this.toggleCompleted(todo, completed))
	}
}
