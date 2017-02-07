import React from 'react'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerReact from './DatePickerReact'
export default class MilestoneBox extends React.Component {

  constructor(props){
    super(props)

    this.props.FBW.read('milestones/').then(
      (data) => {
        console.log(data);
        if(data == null){
          this.setState({});
        }else{
          this.setState({milestones: JSON.parse(data)})
        }
      }
    )

    this.state= {
      milestones: []
    }

    //this is the signature
    // this.state = {
    //   milestones: [
    //     {
    //       milestoneText: '',
    //       milestoneDate: ''
    //     }
    //   ]
    // }
  }

  componentDidMount(){
  }

  _setState = (milestones) => {
    this.props.FBW.write('milestones/', JSON.stringify(milestones)).then(() => {
      this.setState({milestones: milestones});
    })
  }

  addMilestone = () => {
    let milestoneTextObj = document.querySelector('#newMilestoneTextInput');
    let milestoneText = milestoneTextObj.value;
    let milestoneDate = this.refs.DatePickerReact.state.date._d.toLocaleString().split(',')[0];
    let milestones = this.state.milestones;
    milestones.push({milestoneText, milestoneDate})
    milestones.sort((a ,b) => {
      return a.milestoneDate.split('/').reverse().join() < b.milestoneDate.split('/').reverse().join()
    }) // so that milestones appear chronologically.
    this._setState(milestones)
  }

  render(){
    let allMilestones = this.state.milestones.map((milestone) => {
      return(
        <div key={milestone.milestoneDate+Math.random()}>
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
      <div id="milestoneBox">
      <DatePickerReact ref="DatePickerReact" />
      <input id = "newMilestoneTextInput" type="text" />
      <br />
      <button onClick={this.addMilestone}>add</button>
      {allMilestones}
      </div>
    )
  }

}
