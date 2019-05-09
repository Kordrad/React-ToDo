import React, {Component} from 'react'

class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: (new Date()).toString().split(' ').splice(1, 3).join(' '),
            tasks: [],
        }
    }

    //### React
    componentDidMount() {
        this.checkLocalTasks();
    }

    //### Online
    //If you have task saved on PC , this function load data
    checkLocalTasks = () => {
        if (localStorage.getItem('tasks') === null) {
            console.log("You no have tasks");
        } else {
            this.setState({tasks: JSON.parse(localStorage.getItem('tasks')).tasks},
                ()=> {console.log(`You have ${this.state.tasks.length} tasks`)})
        }
    };

    //Add Empty task onClick button "Add"
    addTask = () => {
        this.setState(prevState => ({tasks: [...prevState.tasks, `Task number ${this.state.tasks.length+1}`]}),
            () => this.saveToLocalStorage());
    };
    //Remove Last task onClick button "Remove"
    removeTask = () => {
        this.setState(prevState => ({tasks: [...prevState.tasks].slice(0, -1)}),
            () => this.saveToLocalStorage());
    };
    //Clear All tasks onClick button "Clear"
    clearTasks = () => {
        this.setState({tasks: []},
            () => this.saveToLocalStorage());
    };

    //Update States if you change data in input
    updateInputsArray = (e) => {
        const updatedArray = [...this.state.tasks];
        updatedArray[Number(e.target.attributes.getNamedItem('data-key').value)] = e.target.value;
        this.setState({tasks: updatedArray,});
    };

    //Print all tasks
    renderTasks = () => {
        return (
            this.state.tasks.map((task, index) =>
                <input value={task}
                       key={index}
                       data-key={index}
                       type={'text'}
                       onChange={this.updateInputsArray}
                       onKeyUp={this.saveToLocalStorage}
                />)

        )
    };


    //### Local Data
    saveToLocalStorage = () => {
        if (this.state.tasks.length === 0) {
            localStorage.clear()
        } else {
            let data = JSON.stringify({tasks: this.state.tasks.filter(Boolean)});
            localStorage.setItem('tasks', data);
        }
    };


    render() {
        const {date} = this.state;
        return (
            <div>
                <h1>ToDo List</h1>
                {date}
                <div>
                    <button onClick={this.addTask}>Add</button>
                    <button onClick={this.removeTask}>Remove</button>
                    <button onClick={this.clearTasks}>Clear</button>
                </div>
                {this.renderTasks()}
            </div>
        )
    }
}

export default ToDo