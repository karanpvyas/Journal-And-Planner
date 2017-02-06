import {render} from 'react-dom'
import React from 'react'
import Container from './Container'
import FireBaseWrapper from './FireBaseWrapper'

let FBW = new FireBaseWrapper();

FBW.setup().then(
  function(user){
    render(<Container FBW={FBW} />, document.querySelector('#JournalAndPlannerApp'));
  }
).catch(
  function(error){
    console.log('error while setting up firebase, speaking from entry.js #123\n'+error);
  }
);
