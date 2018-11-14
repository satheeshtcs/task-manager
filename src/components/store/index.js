import { uniqueid, store } from '../core/common';

/*
---------------   Store Model --------------
@description: Interface between the view and store
*/

export default class TaskModel {
	/*
     * @constructor
     * @description: Model initialization 
     * @param: key - local storage key
     * @return :void
     */
	constructor(key, sub) {
		this.key = key;
		this.todos = store(key) || [];
		this.onChanges = [sub];
	}

	/*
     * @sessionUpdate
     * @description: Updates the local storage every time
     * @param: none
     * @return :void
     */
	sessionUpdate() {
		store(this.key, this.todos);
        this.onChanges.forEach( cb => cb() );
	}

	/*
     * @addTaskToStore
     * @description: Creating an object to save in local store
     * @param: title - task title 
     * @param: status - Default status of the task
     * @return :void
     */
	addTaskToStore(title, status) {
		this.todos = this.todos.concat({
			id: uniqueid(),
			title,
			status:status
		});
		this.sessionUpdate();
	}

	/*
     * @destroy
     * @description: Removing the object from local storage
     * @param: todo - complete object to update
     * @return :void
     */
	destroy(todo) {
		this.todos = this.todos.filter( t => t !== todo );
		this.sessionUpdate();
	}

	/*
     * @fetchTaskList
     * @description: returning the current list of the data for view 
     *   added filters to fetch the datas from particular status 
     * @param: status - waiting/processing/completed
     * @return :void
     */
    fetchTaskList(status) {
        if(status)  { 
			this.todos = store(this.key)? store(this.key).filter( t => t.status === status): []; 
		}
		else {
			this.todos = store(this.key) || [];
		}
    }

    /*
     * @statusChange
     * @description: changing the status of the task from one to another
     * @param: index - index of the object
     * @param: status - waiting/processing/completed
     * @return :void
     */
    statusChange(index,status) {
        this.todos[index] = {...this.todos[index], status: status};
        this.sessionUpdate();
    }
}