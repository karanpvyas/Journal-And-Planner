//why even create a component for this?

import React from 'react'
import DatePickerReact from './DatePickerReact'

export default class Journal extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      journalHTML: '',
      journalContent: ''
    }

    this.allowUpdate= true;
    this.isPure= true;
  }

  componentDidMount() {

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
      [/*'image',*/ 'link'], //want to add image, but bandwidth and speed :(

      ['clean']                                         // remove formatting button
    ];

    this.quill = new Quill('#journalEditor', {
      theme: 'snow',
      placeholder: 'How was today?',
      modules: {
        toolbar: toolbarOptions
      },
    });

    this.loadJournal(this.refs.DatePickerReact.state.dateID);

    this.quill.format('font-family', 'Rubik');

    this.quill.on('text-change', (a,b,c) => {
      if(c == 'api'){
        return
      } //this wont be a user generated change.
      
      //magic!
      this.isPure = false;

      //TODO any better alrernative? Except DOM manipulation ofc.
      this.forceUpdate();

      this.syncTheContent();
    })
  }

  loadJournal = (dateID) => {
    console.log('this dateID came: ', dateID);
    this.quill.setContents(null)
    this.props.FBW.read('/journals/'+dateID+'/').then(
      (data) => {
        console.log('data came:', data);
        if(data == null){
          console.log('no data');
        }else{
          this.setState(JSON.parse(data))
          this.quill.setContents(JSON.parse(JSON.parse(data).journalContent))
        }
      }
    ).catch(
      (error) => {
        console.log('error in loadJournal function: ', error);
      }
    )
  }

  syncTheContent = () => {
    if(this.isPure) return;
    if(!this.allowUpdate) return;
    this.allowUpdate = false;
    this.isPure = true;
    let stateObj = {
      journalHTML: this.quill.container.firstChild.innerHTML,
      journalContent: JSON.stringify(this.quill.getContents())
    }
    this.props.FBW.write('journals/'+this.refs.DatePickerReact.state.dateID+'/', JSON.stringify(stateObj)).then(
      () => {
        this.setState(stateObj, () => {
          setTimeout( () => {
            this.allowUpdate = true;
            this.syncTheContent(); //i am not god
          }, 3000)
        });
      }
    ).catch((error) => {
      console.log('error from journal #asdadh ' + error);
    })
  }

  render(){
    let syncValue;
    if(this.isPure){
      syncValue = 'In sync with cloud ✓'
    }else{
      syncValue = 'Syncing . . .'
    }
    return (
      <div id="journal">
        <h2 className="panelHeader">
          Journal
        </h2>
        <div className="journalTop">
          <div className="justForFont centered">
            Date:&nbsp;
            <DatePickerReact ref = 'DatePickerReact' loadJournal={this.loadJournal} />
          </div>
          <div className="justForFont smallFont">{syncValue}</div>
        </div>
        <div id="journalEditor">
          <div id="toolbar">
          </div>
        </div>
      </div>
    )
  }

}
