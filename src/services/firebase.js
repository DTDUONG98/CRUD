import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBAtkHKNqKT-CkTUoqrrASwZVbuJBReNms",
  authDomain: "crud-130f7.firebaseapp.com",
  databaseURL: "https://crud-130f7-default-rtdb.firebaseio.com",
  projectId: "crud-130f7",
  storageBucket: "crud-130f7.appspot.com",
  messagingSenderId: "101084348303",
  appId: "1:101084348303:web:405c0aa2979a6b0799d5fa",
  measurementId: "G-CBC1LYXQQR",
};
const fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB;
