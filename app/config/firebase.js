var config = {
  apiKey: "AIzaSyChIATMLsKHzUbbPhBWAKT4W1yi6uq67-U",
  authDomain: "cardinal-d1df7.firebaseapp.com",
  databaseURL: "https://cardinal-d1df7.firebaseio.com",
  storageBucket: "cardinal-d1df7.appspot.com",
  messagingSenderId: "62511695979"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref()