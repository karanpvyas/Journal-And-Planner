import React from 'react'

export default class DatePicker extends React.Component {

  constructor(){
    super();
    this.state = {
      chosenDate: new Date()
    }
  }

  setDate = () => {
    //TODO add input for date later
  }

  addDay = () => {
    this.setState({
      chosenDate: new Date(this.state.chosenDate.setDate(this.state.chosenDate.getDate() + 1 ))
    })
  }

  subtractDay = () => {
    this.setState({
      chosenDate: new Date(this.state.chosenDate.setDate(this.state.chosenDate.getDate() - 1 ))
    })
  }

  render(){
    return(
      <div>
      <button onClick={this.subtractDay}>-</button>
      Date Set:
      <button onClick={this.addDay}>+</button>
      <br />
      {this.state.chosenDate.toString()}
      </div>
    )
  }
}
