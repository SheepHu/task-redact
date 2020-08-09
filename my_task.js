//父组件
class App extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			taskList: ['吃饭','睡觉','敲代码']
		}
	}
	addTaskHandle(task,action,idx) {
		if(action === 'add') {
			this.state.taskList.push(task)
			this.setState({
				taskList: this.state.taskList
			})
		} else if( action === 'remove') {
			this.state.taskList.splice(idx, 1)
			this.setState({
				taskList: this.state.taskList
			})
		}
	}
	render(){
		let {taskList} = this.state
		return (
			<div>
			  <ListTask taskList={taskList} updateTask={this.addTaskHandle.bind(this)}></ListTask>
			  <AddTask updateTask={this.addTaskHandle.bind(this)}></AddTask>
		  </div>
		)
		
	}
}
//任务内容子组件
class ListTask extends React.Component{
	constructor(props) {
		super(props)
	}
	//删除任务
	removeTask(item,action,idx,e) {
		//给div绑定事件，事件委托
		if(e.target.constructor === HTMLButtonElement){
			//调用父组件的更新任务事件
			this.props.updateTask(item,action,idx)
		}
	}
	createTaskList() {
		let {taskList} = this.props
		return taskList.map((item,index)=>(
				<div 
					className='task_item' 
					onClick={this.removeTask.bind(this,item,'remove',index)}
				>
					<span>{item}</span>
					<button>删除</button>
				</div>
			)
		)
	}
	render() {
		return (
			<div  className="list_task">
				{this.createTaskList()}
			</div>
		)
	}
}
//添加任务组件
class AddTask extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			taskName: ''
		}
	}
	//受控表单的事件
	getTaskName(e) {
		this.setState({
			taskName: e.target.value
		})
	}
	//添加任务的按钮点击事件
	pushTask() {
		let {taskName} = this.state
		if(taskName.trim() == '') return;
		this.props.updateTask(taskName,'add')
		this.setState({
			taskName: ''
		})
	}
	render() {
		let { taskName } = this.state
		return (
			<div className="add_task">
				<div className="label_tip">Label:</div>
				<input
				 className="task_input" 
				 placeholder="请输入..." 
				 type="text"
				 value={taskName}
				 onChange={this.getTaskName.bind(this)}
				 />
				<div className="add_task_but" onClick={this.pushTask.bind(this)}>确定</div>
			</div>
		)
	}
}
ReactDOM.render(
	<App/>,
	document.getElementById('app')
);