import React from 'react';
import TodoList from './TodoList'

export default class TodoBox extends React.Component {
  constructor(){
    super();

    this.state = {
      allTodos: [
        {
          todoText: 'demo todo',
          timeCreated: 123123,
          timeCreatedString: '',
          status: 'Incomplete'
        }
      ]
    }
  }

  addTodo = (event) => {
    let todoText = document.querySelector('#newTodoInput').value;
    let dateObj = new Date();
    let timeCreatedString = dateObj.toTimeString()
    let timeCreated = dateObj.valueOf();

    let allTodos = this.state.allTodos;
    allTodos.push({
      todoText,
      timeCreatedString,
      timeCreated,
      status: 'Incomplete'
    })
    this.setState({allTodos});
  }

  completeTodo = (timeCreated) => {
    //think of a better implementation
    let allTodos = this.state.allTodos;
    for (let todo of allTodos) {
      if(todo.timeCreated === timeCreated){
        todo.status = 'Complete'
      }
    }
    this.setState({allTodos});
  }

  deleteTodo = (timeCreated) => {
    this.setState({allTodos:this.state.allTodos.filter(function(todo){
      return timeCreated !== todo.timeCreated;
    })})
  }

  render(){
    return(
      <div className = "todoBox" >
        <div id="newTodoInputWrapper">
          <input id = "newTodoInput" type="text" />
          <button onClick={this.addTodo}>add</button>
        </div>
        <TodoList allTodos={this.state.allTodos} deleteTodo={this.deleteTodo} completeTodo={this.completeTodo}/>
      </div>
    )
  }
}
