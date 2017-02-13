import React from 'react'

export default class TodoListItem extends React.Component {

  constructor(){
    super();
  }

  render(){

    let greenText = '';
    let done = null;
    if(this.props.status === 'Complete') {
      greenText = ' greenText'
      done = <span className="doneText">✓</span>
    }

    return(
      <span>
        <span className={"todoTextDiv" + greenText}>
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
