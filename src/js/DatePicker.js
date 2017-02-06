import React from 'react'

export default class DatePicker extends React.Component {

  constructor(){
    super();
    let dateObj = new Date();
    let darr = dateObj.toLocaleString().split(',')[0].split('/');
    let dateID = darr[2]+'-'+darr[1]+'-'+darr[0]
    this.state = {
      chosenDate: dateObj,
      dateID: dateID
    }
  }

  getDateID = (dateObj) => {
    let darr = dateObj.toLocaleString().split(',')[0].split('/');
    return (darr[2]+'-'+darr[1]+'-'+darr[0])
  }

  setDate = () => {
    //TODO add input for date later
  }

  addDay = () => {
    let dateObj = new Date(this.state.chosenDate.setDate(this.state.chosenDate.getDate() + 1 ));
    this.setState({
      chosenDate: dateObj,
      dateID: this.getDateID(dateObj)
    }, () => {
      this.props.loadJournal(this.getDateID(dateObj));
    })
  }

  subtractDay = () => {
    let dateObj = new Date(this.state.chosenDate.setDate(this.state.chosenDate.getDate() - 1 ));
    this.setState({
      chosenDate: dateObj,
      dateID: this.getDateID(dateObj)
    },() => {
      this.props.loadJournal(this.getDateID(dateObj));
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
