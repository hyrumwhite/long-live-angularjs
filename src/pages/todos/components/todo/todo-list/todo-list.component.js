import template from './todo-list.html';

export default {
  template,
  bindings:{
    store:'<',
    status:'<',
    onToggleCompleted: '&'
  },
  controller($scope) {
    this.$onInit = () => {
      this.originalTodo = null;
      this.editedTodo = null;
      this.todos = this.store.todos;
      this.statusFilter = (this.status === 'active') ?
        { completed: false } : (this.status === 'completed') ?
        { completed: true } : {};
    }
    this.editTodo = todo => {
      this.editedTodo = todo;
      // Clone the original todo to rethis.store it on demand.
      this.originalTodo = Object.assign({}, todo);
    };
    this.revertEdits = todo => {
      const { todos } = this.store;
			this.store.todos[todos.indexOf(todo)] = this.originalTodo;
			this.editedTodo = null;
			this.originalTodo = null;
			this.reverted = true;
		};
    this.removeTodo = (todo) => this.store.delete(todo);
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
        .catch(() => todo.title = this.originalTodo.title)
				.finally(() => this.editedTodo = null);
		};
    //ontogglecompleted needs to pass back an object with key names that match the variables passed in its parent
    this.toggleCompleted = (todo, completed) => this.onToggleCompleted({todo, completed})
  }
}
