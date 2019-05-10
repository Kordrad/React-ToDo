import React, {Component} from 'react'
import styled, {css} from 'styled-components'

const TodoStyle = styled.div`
  background-color: white;
  box-shadow: 0 0 50px 10px rgba(0,0,0,0.5);
  h1 {
    margin: 0;
    padding-top: 5%;
    box-sizing: border-box;
  }
`;
const Buttons = styled.div`
   display: flex;
   padding-top: 20px;
   width: 100%;
   & > button {
      width: 33.333%;
      border: none;
      box-sizing: border-box;
      padding: 2% 1%;
      &:last-child {
        background-color: #ff5c5c;
      }
   }
`;
const List = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    textarea {
      border: none;
      border-bottom: 1px dotted rgba(40,44,52,0.5) ;
      box-sizing: border-box;
      padding: 2% 5%;
      overflow: hidden;
      resize: none;
      width: 90%;
      margin: 0 auto;
      &:last-child {
       border: none; 
      }
    }
`;

class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: `Today is ${(new Date()).toString().split(' ').splice(1, 3).join(' ')}`,
            tasks: [],
        }
    }

    //### React
    componentDidMount() {
        this.checkLocalTasks();
        setTimeout(() => {
            this.addAutoResize()
        }, 10)
    }


    //### Online
    //If you have task saved on PC , this function load data
    checkLocalTasks = () => {
        if ((localStorage.getItem('tasks') === null) || (JSON.parse(localStorage.getItem('tasks')).tasks.length === 0)) {
            this.setState({tasks: ['Click me to edit!']},
                () => {
                    console.log(`You have ${this.state.tasks.length} tasks`)
                })

        } else {
            this.setState({tasks: JSON.parse(localStorage.getItem('tasks')).tasks},
                () => {
                    console.log(`You have ${this.state.tasks.length} tasks`)
                })
        }
    };

    //Add Empty task onClick button "Add"
    addTask = () => {
        this.setState(prevState => ({tasks: [...prevState.tasks, `Task number ${this.state.tasks.length + 1}`]}),
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
                <textarea value={task}
                          key={index}
                          data-key={index}
                          onChange={(e)=>{
                              this.updateInputsArray(e);
                              this.onInput(e)
                          }}
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

    //### Style
    addAutoResize = () => {
        const tx = document.getElementsByTagName('textarea');
        for (let i = 0; i < tx.length; i++) {
            tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
            tx[i].addEventListener("input", () => onInput, false);
        }
        const onInput = () => {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        };
    };

    onInput = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = (e.target.scrollHeight) + 'px';
    };

    render() {
        const {date} = this.state;
        return (
            <TodoStyle>
                <h1>ToDo List</h1>
                {date}
                <Buttons>
                    <button onClick={this.addTask}>Add</button>
                    <button onClick={this.removeTask}>Remove</button>
                    <button onClick={this.clearTasks}>Clear</button>
                </Buttons>
                <List>
                    {this.renderTasks()}
                </List>
            </TodoStyle>
        )
    }
}

export default ToDo