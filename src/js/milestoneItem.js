import React from 'react'

export default class MilestoneItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      milestoneText : this.props.milestoneText,
      milestoneKey: this.props.milestoneKey,
      milestoneDate: this.props.milestoneDate
    }
  }

  updateMilestone = (event) => {
    if(event.target.value.length > 45 && event.keyCode !== 8){
      event.preventDefault();
      alert('too big')
    }
    if((event.keyCode || event.which) === 9){
      event.preventDefault();
    }
    if((event.keyCode || event.which) === 13){
      this.props.updateMilestones(this.state); //
    }else if (event.type === 'change'){
      this.setState({milestoneText: event.target.value});
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      milestoneText : props.milestoneText,
      milestoneKey: props.milestoneKey,
      milestoneDate: props.milestoneDate
    })
  }

  render() {
    return(
      <div className="milestoneItem" key={this.props.milestoneKey} >
        <textarea
          className="milestoneTextInput"
          value = {this.state.milestoneText}
          onChange = {this.updateMilestone.bind(this)}
          onKeyDown = {this.updateMilestone.bind(this)}
        />
        <span className="milestoneDate">
        {" on "+ this.state.milestoneDate}
        </span>
        <div className="button-group-todo">
          <button className="standard-delete-button" onClick={this.props.deleteMilestone.bind(this,this.state.milestoneKey)}>X</button>
        </div>
      </div>
    )
  }
}
