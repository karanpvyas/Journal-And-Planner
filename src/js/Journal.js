//why even create a component for this?

import React from 'react'

export default class Journal extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      journalHTML : ''
    }
  }

  componentDidMount() {

    //TODO any better way for this?
    let editor = document.createElement('div');
    editor.id = "journalEditor";
    document.querySelector('body').appendChild(editor);

    var quill = new Quill('#journalEditor', {
      theme: 'snow'
    });

    quill.on('text-change', function(a,b,c){
      this.setState({journalHTML: quill.container.firstChild.innerHTML});
    }.bind(this));
  }

  render(){
    return (
      <div>
      </div>
    )
  }

}
