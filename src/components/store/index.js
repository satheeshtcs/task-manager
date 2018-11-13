import { uniqueid, store } from '../core/common';

export default class TaskModel {
	constructor(key, sub) {
		this.key = key;
		this.todos = store(key) || [];
		this.onChanges = [sub];
	}

	sessionUpdate() {
		store(this.key, this.todos);
        this.onChanges.forEach( cb => cb() );
	}

	addTaskToStore(title, status) {
		this.todos = this.todos.concat({
			id: uniqueid(),
			title,
			status:status
		});
		this.sessionUpdate();
	}

	destroy(todo) {
		this.todos = this.todos.filter( t => t !== todo );
		this.sessionUpdate();
	}

    fetchTaskList(status) {
        if(status)  { 
			this.todos = store(this.key)? store(this.key).filter( t => t.status === status): []; 
		}
		else {
			this.todos = store(this.key) || [];
		}
    }

    statusChange(index,status) {
        this.todos[index] = {...this.todos[index], status: status};
        this.sessionUpdate();
    }
}