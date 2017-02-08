import React from 'react'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerReact from './DatePickerReact'

import * as loader from './loaderAnimation';

export default class MilestoneBox extends React.Component {

  constructor(props){
    super(props)

    loader.start();
    this.props.FBW.read('milestones/').then(
      (data) => {
        console.log(data);
        if(data == null){
          this.setState({}, () => {
            loader.stop()
          });
        }else{
          this.setState({milestones: JSON.parse(data)}, () => {
            loader.stop()
          })
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
    loader.start();
    this.props.FBW.write('milestones/', JSON.stringify(milestones)).then(() => {
      this.setState({milestones: milestones}, () => {
        loader.stop()
      });
      document.querySelector('#newMilestoneTextInput').value = "";
    }).catch((error) => {
      console.log('error in milestonebox 13123 '+error);
      loader.stop();
    })
  }

  addMilestone = () => {
    let milestoneTextObj = document.querySelector('#newMilestoneTextInput');
    let milestoneText = milestoneTextObj.value;

    if(milestoneText.length < 6){
      alert('length too small milestone ka')
      return;
    }

    if(milestoneText.length > 30) {
      alert('too big a milestone :/ add it to your journal maybe?');
      return;
    }

    let milestoneDate = this.refs.DatePickerReact.state.date._d.toLocaleString().split(',')[0];
    let milestones = this.state.milestones;
    milestones.push({milestoneText, milestoneDate})
    milestones.sort((a ,b) => {
      return a.milestoneDate.split('/').reverse().join() < b.milestoneDate.split('/').reverse().join()
    }) // so that milestones appear chronologically.
    this._setState(milestones)
  }

  checkForEnter = (event) => {
    console.log(event);
    if((event.which || event.keyCode) == 13){
      event.preventDefault();
      this.addMilestone();
    }
  }

  render(){
    let allMilestones = this.state.milestones.map((milestone) => {
      return(
        <div className="milestoneItem" key={milestone.milestoneDate+Math.random()}>
          <span className="milestoneText">
            {milestone.milestoneText +" on "}
          </span>
          <span className="milestoneDate">
            {milestone.milestoneDate}
          </span>
        </div>
      )
    })
    return(
      <div id="milestoneBox">
        <div className="milestoneInputArea">
          <DatePickerReact ref="DatePickerReact" />
          <input id = "newMilestoneTextInput" type="text" placeholder="First salary?" onKeyDown={this.checkForEnter.bind(this)} />
          <button className="standard-add-button-milestone" onClick={this.addMilestone}>Add</button>
        </div>
        {allMilestones}
      </div>
    )
  }

}
