import React from 'react'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerReact from './DatePickerReact'
export default class MilestoneBox extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      milestones: [
        {
          milestoneText: '',
          milestoneDate: ''
        }
      ]
    }
  }

  componentDidMount(){
  }

  render(){
    let allMilestones = this.state.milestones.map((milestone) => {
      return(
        <div>
        <span>
        {milestone.milestoneText}
        </span>
        <span>
        {milestone.milestoneDate}
        </span>
        </div>
      )
    })
    return(
      <div>
      <input id = "newMilestoneTextInput" type="text" />
      <br />
      <button onClick={this.addMilestone}>add</button>
      </div>
    )
  }

}
