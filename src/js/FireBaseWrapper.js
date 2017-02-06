export default class FireBaseWrapper {

  constructor(){
    this.user = {
    }
  }

  setup = () => {
    let config = {
      apiKey: "AIzaSyCxEq46JH7-12DxpeWcLquxeRwzgV4_r18",
      authDomain: "journal-and-planner.firebaseapp.com",
      databaseURL: "https://journal-and-planner.firebaseio.com",
      storageBucket: "journal-and-planner.appspot.com",
      messagingSenderId: "337037813028"
    };

    firebase.initializeApp(config);
    this.database = firebase.database();

    let that = this;
    return new Promise(
      function (resolve, reject){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            that.user = user;
            resolve(user);
          } else {
            console.log('not signed in, signing in now');
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
              that.user = result.user;
              resolve(result);
            }).catch(function(error) {
              console.log(error);
              reject(error);
            });
          }
        });
      }
    );
  }

  write = (path, data) => {
    return this.database.ref('users/'+this.user.uid+'/'+path).set(data);
  }

  //see how to return yo.
  read = (path) => {
    return new Promise((resolve, reject) => {
      this.database.ref('users/'+this.user.uid+'/'+path).once('value').then(
        (snapshot) => {
          resolve(snapshot.val());
        }
      ).catch(
        (error) => {
          console.log(error);
          reject(console.error());
        })
      });
    }

  }
