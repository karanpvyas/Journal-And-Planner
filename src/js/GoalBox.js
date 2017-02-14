import React from 'react'
import ContentEditable from './ContentEditable'

import * as loader from './loaderAnimation';

export default class GoalBox extends React.Component {

  constructor(props){
    super(props);
    loader.start();
    this.props.FBW.read('goals/').then(
      (data) => {
        console.log(data);
        if(data == null){
          this.setState({}, () => {
            loader.stop()
          });
        }else{
          this.setState(JSON.parse(data), () => {
            loader.stop()
          })
        }
      }
    )
    // this.state = {
    //   goal5Years: 'Become richie rich, perform a song somewhere, buy at least 2 exotic cars',
    //   goal1Year: 'This is my 1 year goal',
    //   goal6Months: 'This is my 6 months goal',
    //   goal3Months: 'This is my 3 months goal',
    //   goal1Month: 'This is my 1 months goal',
    //   goal1Week: 'this is my this week\'s goal'
    // }
    this.state = { }
  }

  _setState = (goals) => {
    loader.start();
    this.props.FBW.write('goals/', JSON.stringify(goals)).then(() => {
      this.setState(goals,() => {
        loader.stop()
      });
    }).catch((error)=>{
      console.log('error in goalbox.js 12312 ' + error);
      loader.stop()
    })
  }

  updateGoals = () => {
    this._setState({
      goal5Years: this.refs['5year'].state.text,
      goal1Year: this.refs['1year'].state.text,
      goal6Months: this.refs['6months'].state.text,
      goal3Months: this.refs['3months'].state.text,
      goal1Month: this.refs['1month'].state.text,
      goal1Week: this.refs['1week'].state.text
    });
  }

  render(){
    return(
      <div id="goalBox">

      <div className="goalContainer">
        <span className="goalType">
          1 week
        </span>
        <ContentEditable ref="1week" passedText={this.state.goal1Week} updateGoals={this.updateGoals} />
      </div>

      <div className="goalContainer">
        <span className="goalType">
          1 month
        </span>
        <ContentEditable ref="1month" passedText={this.state.goal1Month} updateGoals={this.updateGoals} />
      </div>

      <div className="goalContainer">
        <span className="goalType">
          3 months
        </span>
        <ContentEditable ref="3months" passedText={this.state.goal3Months} updateGoals={this.updateGoals} />
      </div>

      <div className="goalContainer">
        <span className="goalType">
          6 months
        </span>
        <ContentEditable ref="6months" passedText={this.state.goal6Months} updateGoals={this.updateGoals} />
      </div>


      <div className="goalContainer">
        <span className="goalType">
          1 year
        </span>
        <ContentEditable ref="1year" passedText={this.state.goal1Year} updateGoals={this.updateGoals}/>
      </div>

      <div className="goalContainer">
        <span className="goalType">
          5 year
        </span>
        <ContentEditable ref="5year" passedText={this.state.goal5Years} updateGoals={this.updateGoals} />
      </div>

      </div>
    )
  }
}
