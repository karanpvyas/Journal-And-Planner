import React from 'react'

export default class TodoListItem extends React.Component {

  constructor(){
    super();
  }

  render(){

    let green = {};
    let done = null;
    if(this.props.status === 'Complete') {
      green = {
        color: 'green',
        backgroundColor: 'lightgreen',
        borderRadius: '10px'
      }
      done = <span style={{color:'green',borderRadius:'6px',backgroundColor:'#00EE00',fontSize:'10px',padding:'2px 4px 2px 4px',marginLeft:'4px'}}>Done</span>
    }

    return(
      <span>
        <span className="todoTextDiv">
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
