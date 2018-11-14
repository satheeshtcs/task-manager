import { Component } from 'preact';
import TaskModel from '../../components/store/index';
import style from './style';

/*
---------------   Tasks --------------
@description:
Application default component
*/
const TASK_STATUS = ["waiting", "processing", "completed"];
const sessionKey = "STORAGE_KEY";
export default class Tasks extends Component {
	
	/*
     * @constructor
     * @description: Application initialization
     * @param: none
     * @return :void
     */
    constructor() {
        super();
        this.state = { todos: [], text: '' };
        this.model = new TaskModel(sessionKey, () => this.setState({}));
    }

    /*
     * @function: componentDidMount
     * @description: invoked immediately after a component is mounted
     * @param: none
     * @return :void
     */
    componentDidMount() {        
        this.handleFilter();
    }
   
    /*
     * @function: componentWillReceiveProps
     * @description: lifecycle call when page reloaded
     * @param: none
     * @return :void
     */
    componentWillReceiveProps() {
        this.handleFilter();
    }

    /*
     * @function: handleFilter
     * @description: get the value from the URL and call the subsequent function
     * @param: none
     * @return :void
     */
    handleFilter() {
        let status = String(location.hash || '').split('/').pop();
        this.fetchTask(status);
    }
    
    /*
     * @function: setText
     * @description: setting state
     * @param: none
     * @return :void
     */
    setText = e => {
        this.setState({ text: e.target.value });
    };
    
    /*
     * @function: addTask
     * @description: adding task
     * @param: none
     * @return :void
     */
    addTask = () => {
        let { todos, text } = this.state;
        todos = todos.concat({ text });
        this.model.addTaskToStore(text, TASK_STATUS[0]);
        this.setState({ todos, text: '' });
    };
    
    
    /*
     * @function: destroy
     * @description: model destroy function
     * @param: none
     * @return :void
     */
    destroy = (taskId) => {
        this.model.destroy(taskId);
    };
    
    /*
     * @function: fetchTask
     * @description: fetch the task list
     * @param: none
     * @return :void
     */
    fetchTask = (urlParams) => {
        urlParams ? this.model.fetchTaskList(urlParams) : this.model.fetchTaskList();
    }
    
    /*
     * @function: stateChange
     * @description: status change based on the type
     * @param: none
     * @return :void
     */
    stateChange = (index, status, type) => {
        let currStateIndex = TASK_STATUS.indexOf(status);
        if (type === "prev" && status !== TASK_STATUS[0]) {
            this.model.statusChange(index, TASK_STATUS[currStateIndex - 1])
        } else if (type === "next" && status !== TASK_STATUS[2]) {
            this.model.statusChange(index, TASK_STATUS[currStateIndex + 1]);
        }
    }
    
    
    /*
     * @render
     * @description: application render function
     * @param {todos} localStorage data []
	 * @param {text} input value
     * @return :rendering HTML snippet
     */
    render({ }, { todos, text }) {
        return (
            <div class={style.container}>
                <div class={style.searchContainer}>
                    <input value={text} onInput={this.setText} />
                    <button onClick={this.addTask}>Add</button>
                </div>
                <div class={style.filterContainer}>
                    <ul class={style.filters}>
                        <li><a href={'/'}>All</a></li>
                        {TASK_STATUS.map(status => (
                            <li><a href={`#/${status}`}>{status}</a></li>
                        ))}
                    </ul>
                </div>
                <div class={style.listContainer}>
                    <ul>
                        {this.model.todos.map((todo, index) => (
                          <li>
                            <div class={style.leftcolumn}><span class={style.title}>
                                {todo.title}</span><span class={style.subtext}>({todo.status})</span>
                            </div>
                            <div class={style.rightcolumn}>                                                            
                                <span class={(todo.status !== TASK_STATUS[0]) ? style.filterButton : style.disableButton} onClick={() => this.stateChange(index, todo.status, "prev")}>Prev  {}</span>
                                <span class={(todo.status !== TASK_STATUS[2]) ? style.filterButton : style.disableButton} onClick={() => this.stateChange(index, todo.status, "next")}>Next  {}</span>
                                <span class={style.crossButton} onClick={() => this.destroy(todo)}>X</span> 
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
