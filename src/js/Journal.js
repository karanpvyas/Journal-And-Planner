//why even create a component for this?

import React from 'react'

export default class Journal extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      journalHTML : '',
      journalContent: ''
    }
  }

  componentDidMount() {

    //TODO any better way for this?
    let editor = document.createElement('div');
    let toolbar = document.createElement('div');
    editor.id = "journalEditor";
    toolbar.id = "toolbar";
    document.querySelector('body').appendChild(toolbar);
    document.querySelector('body').appendChild(editor);

    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['image', 'link'],

      ['clean']                                         // remove formatting button
    ];

    var quill = new Quill('#journalEditor', {
      theme: 'snow',
      placeholder: 'How was today?',
      modules: {
        toolbar: toolbarOptions
      },
    });

    quill.on('text-change', function(a,b,c){
      this.setState(
        {
          journalHTML: quill.container.firstChild.innerHTML,
          journalContent: JSON.stringify(quill.getContents())
        }
    );
    }.bind(this));
  }

  render(){
    return (
      <div>
      </div>
    )
  }

}
