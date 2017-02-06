import '../css/master.scss';

import TodoBox from './TodoBox'
import React from 'react'
import ContentEditable from './ContentEditable'
import {render} from 'react-dom'
import GoalBox from './GoalBox'
import Journal from './Journal'
import DatePicker from './DatePicker'

import FireBaseWrapper from './FireBaseWrapper'
let FBW = new FireBaseWrapper();

FBW.setup().then(
  function(user){
    console.log(user);
  }
).catch(
  function(error){
    console.log('error while setting up firebase, speaking from entry.js #123\n'+error);
  }
);


// render(<Journal />, document.querySelector('#JournalAndPlannerApp'));
