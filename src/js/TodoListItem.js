import React from 'react'

export default class TodoListItem extends React.Component {

  constructor(){
    super();
  }

  render(){

    let green = {};
    if(this.props.status === 'Complete') {
      green = {
        color: 'green'
      }
    }

    return(
      <span>
        <span style={green}>
          {this.props.todoText}
        </span>
        <span>
          {this.props.timeCreatedString}
        </span>
      </span>
    )
  }

}
