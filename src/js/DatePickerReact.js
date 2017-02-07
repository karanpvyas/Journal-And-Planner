import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

export default class DatePickerReact extends React.Component {
  constructor(props){
    super(props);
    let dateObj = moment()
    this.state = {
      date: dateObj,
      dateID: this.getDateID(dateObj)
    }
  }

  changeDate = (date) => {
    console.log(date)
    this.setState({date:date, dateID:this.getDateID(date)}, () => {
      if(this.props.loadJournal){
        this.props.loadJournal(this.getDateID(this.state.date));
      }
    })
  }

  getDateID = (date) => {
    let dateObj = new Date(date);
    let darr = dateObj.toLocaleString().split(',')[0].split('/');
    return (darr[2]+'-'+darr[1]+'-'+darr[0])
  }

  render(){
    return(
      <DatePicker
        selected = {this.state.date}
        onChange = {this.changeDate}
        dateFormat="DD/MM/YYYY"
        className = "datePicker"
       />
    )
  }
}
