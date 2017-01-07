import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyChIATMLsKHzUbbPhBWAKT4W1yi6uq67-U",
  authDomain: "cardinal-d1df7.firebaseapp.com",
  databaseURL: "https://cardinal-d1df7.firebaseio.com",
  storageBucket: "cardinal-d1df7.appspot.com",
  messagingSenderId: "62511695979"
};

firebase.initializeApp(config);

const firebaseContext = {
  ref: firebase.database().ref(),
  auth: firebase.auth,
  all: firebase.Promise.all,
}

export default firebaseContext