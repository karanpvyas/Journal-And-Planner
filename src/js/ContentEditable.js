import React from 'react';

export default class ContentEditable extends React.Component {

  // need to pass props and call super with them, in order to be able to use them inside the constructor
  constructor(props){
    super(props);
    this.state = {
      text: this.props.passedText
    }
  }

  updateText = (event) => {
    if((event.keyCode || event.which) === 9){
      event.preventDefault();
    }
    if((event.keyCode || event.which) === 13){
      this.props.updateGoals();
    }else if (event.type === 'change'){
      this.setState({text: event.target.value});
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      text: nextProps.passedText
    })
  }

  render(){
    return(
      <div>
        <input
          className="goalInput"
          onChange = {this.updateText.bind(this)}
          value = {this.state.text}
          onKeyDown = {this.updateText.bind(this)}
        />
      </div>
    )
  }
}
