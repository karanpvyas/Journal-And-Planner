import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

export default class DatePickerReact extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: moment()
    }
  }

  changeDate = (date) => {
    console.log(date)
    this.setState({date})
  }

  render(){
    return(
      <DatePicker
        selected = {this.state.date}
        onChange = {this.changeDate}
        dateFormat="DD/MM/YYYY"
       />
    )
  }
}
