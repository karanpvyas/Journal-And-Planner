import React from 'react'
import TodoListItem from './TodoListItem'

export default class TodoList extends React.Component {
  constructor(){
    super();
  }

  //TODO todoListItem class now given at proper place -- do something later
  render(){
    let that = this;
    let todosToRender = this.props.allTodos.map(function(todo){
      return(
        <div key={todo.timeCreated} className = "todoListItem">
          <TodoListItem todoText={todo.todoText}
            timeCreatedString={todo.timeCreatedString} status={todo.status}/>
          <button onClick={that.props.deleteTodo.bind(that, todo.timeCreated)}>delete</button>
          <button onClick={that.props.completeTodo.bind(that, todo.timeCreated)}>complete</button>
        </div>
      )
    })

    return(
      <div className="todoList">
        {todosToRender}
      </div>
    )
  }

}
