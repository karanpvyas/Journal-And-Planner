import {render} from 'react-dom'
import React from 'react'
import Container from './Container'
import FireBaseWrapper from './FireBaseWrapper'
import demoData from './demoData'

let FBW = new FireBaseWrapper();

FBW.setup()
//put this into a wrapper later
.then(
  (user) => {
    return new Promise(
      (resolve, reject) => {
        FBW.read('exists/')
        .then( (val)  => {
          resolve(val);
        })
      }
    );
  }
)
//somethings wrong below. too much nesting even when using promises :/
.then(
  (exists) => {
    return new Promise(
      (resolve, reject) => {
        if(exists){
          resolve(true);
        }else{
          FBW.write('/exists', true)
          .then(() => {
            FBW.write('todos/', {allTodos:JSON.stringify(demoData.allTodos)})
            .then(()=>{
              FBW.write('goals/', JSON.stringify(demoData.goals))
              .then(()=>{
                resolve(true);
              })
            })
          }
        );
      }
    }
  )
}
)
.then(
  () => {
    render(<Container FBW={FBW} />, document.querySelector('#JournalAndPlannerApp'));
  }
).catch(
  function(error){
    console.log('error while setting up firebase, speaking from entry.js #123\n'+error);
  }
);
