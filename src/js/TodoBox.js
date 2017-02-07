import React from 'react';
import TodoList from './TodoList'

export default class TodoBox extends React.Component {
  constructor(props){
    super(props);

    this.props.FBW.read('todos/').then(
      (data) => {
        if(data == null){
          this.setState({
            allTodos: []
          });
        }else{
          this.setState({
            allTodos: JSON.parse(data.allTodos)
          })
        }
      }
    )
    // this.state = {
    //   allTodos: [
    //     {
    //       todoText: 'demo todo',
    //       timeCreated: 123123,
    //       timeCreatedString: '',
    //       status: 'Incomplete'
    //     }
    //   ]
    // }
    this.state = {
      allTodos: []
    }
  }

  _setState = (allTodos) => {
    this.props.FBW.write('todos/', {allTodos:JSON.stringify(allTodos)}).then(() => {
      this.setState({allTodos});
      document.querySelector('#newTodoInput').value = "";
    })
  }

  addTodo = () => {
    let todoText = document.querySelector('#newTodoInput').value;

    if(todoText.length <= 3){
      alert('length must be more');
      return;
    }

    let dateObj = new Date();
    let timeCreatedString = dateObj.toTimeString() +' on '+dateObj.toDateString();
    let timeCreated = dateObj.valueOf();

    let allTodos = this.state.allTodos;
    allTodos.push({
      todoText,
      timeCreatedString,
      timeCreated,
      status: 'Incomplete'
    })
    this._setState(allTodos);
  }

  completeTodo = (timeCreated) => {
    //think of a better implementation
    let allTodos = this.state.allTodos;
    for (let todo of allTodos) {
      if(todo.timeCreated === timeCreated){
        todo.status = 'Complete'
      }
    }
    this._setState(allTodos);
  }

  deleteTodo = (timeCreated) => {
    this._setState(this.state.allTodos.filter(function(todo){
      return timeCreated !== todo.timeCreated;
    }))
  }

  checkForEnter = (e) => {
    if((e.keyCode || e.which) == 13 ){
      this.addTodo();
    }
  }

  render(){
    return(
      <div id="todoBox">
        <h2 className="panelHeader">
          Todo Manager
        </h2>
        <div id="newTodoInputWrapper">
          <input id = "newTodoInput" type="text" placeholder="Any work pending?" onKeyDown={this.checkForEnter.bind(this)} />
          <button onClick={this.addTodo} className="standard-add-button">Add</button>
        </div>
        <TodoList allTodos={this.state.allTodos} deleteTodo={this.deleteTodo} completeTodo={this.completeTodo}/>
      </div>
    )
  }
}
