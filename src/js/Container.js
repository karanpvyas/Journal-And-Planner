import '../css/master.scss';

import TodoBox from './TodoBox'
import React from 'react'
import ContentEditable from './ContentEditable'
import GoalBox from './GoalBox'
import Journal from './Journal'
import DatePicker from './DatePicker'
import MilestoneBox from './MilestoneBox'

export default class Container extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <MilestoneBox FBW={this.props.FBW} />
      </div>
    );
  }
}
