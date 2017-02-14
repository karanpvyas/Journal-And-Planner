import React from 'react'

export default class TodoListItem extends React.Component {

  constructor(){
    super();
  }

  render(){

    let textColor = ' incomplete-text';
    let done = null;
    if(this.props.status === 'Complete') {
      textColor = ' complete-text'
      done = <span className="doneText">✓</span>
    }

    return(
      <span>
        <span className={"todoTextDiv" + textColor}>
          {this.props.todoText}
        </span>
        {done}
        <br />
        <span className="label">
          Added at: {this.props.timeCreatedString}
        </span>
      </span>
    )
  }

}
