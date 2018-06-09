import './todo.styl';
import template from './todo.html';

export default {
  template,
  controller($scope, $stateParams, $filter, $state, todoStorage) {
    todoStorage.then(store => {
      this.store = store;
      this.store.get();
      init();
    });
    // this.$onChanges = ({store}) => store && init();
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

		this.status = $stateParams.status || '';

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

		this.clearCompletedTodos = () => this.store.clearCompleted();

    this.toggleCompleted = (todo, completed) => {
      const { todos } = this.store;
      typeof completed !== 'undefined' && (todo.completed = completed);
      this.store.put(todo, todos.indexOf(todo))
        .catch(() => todo.completed = !todo.completed);
    };

		this.markAll = completed =>
			todos.forEach(
        todo => todo.completed !== completed && this.toggleCompleted(todo, completed)
      );
	}
}
