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
      let CompleteButton = todo.status === 'Complete' ? null : <button className="standard-complete-button" onClick={that.props.completeTodo.bind(that, todo.timeCreated)}>✓</button>
      return(
        <div key={todo.timeCreated} className = "todoListItem">
          <span className="button-group-todo">
            {CompleteButton}
            <button className="standard-delete-button" onClick={that.props.deleteTodo.bind(that, todo.timeCreated)}>X</button>
          </span>
          <TodoListItem todoText={todo.todoText}
            timeCreatedString={todo.timeCreatedString} status={todo.status}/>
        </div>
      )
    })

    return(
      <div className="todoList">
        {todosToRender.reverse()}
      </div>
    )
  }

}
