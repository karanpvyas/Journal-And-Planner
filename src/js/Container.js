import '../css/master.scss';

import TodoBox from './TodoBox'
import React from 'react'
import ContentEditable from './ContentEditable'
import GoalBox from './GoalBox'
import Journal from './Journal'
import MilestoneBox from './MilestoneBox'

export default class Container extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <div id="header">
          Journal and Planner
        </div>
        <div id='mainWrapper'>
          <TodoBox FBW={this.props.FBW} />
          <Journal FBW={this.props.FBW} />
          <div className="">
            <div className="goalsWrapper">
              <h2 className="panelHeader">
                Goals
              </h2>
              <GoalBox FBW={this.props.FBW} />
            </div>
            <div className="milestonesWrapper">
              <h2 className="panelHeader">
                Achievements
              </h2>
              <MilestoneBox FBW={this.props.FBW} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
