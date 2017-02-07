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
          <div className="padding10">
            <GoalBox FBW={this.props.FBW} />
            <MilestoneBox FBW={this.props.FBW} />
          </div>
        </div>
      </div>
    );
  }
}
