import  firebase  from 'firebase';



const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBT8AmXa4N2G04UROpASaJSpxdNdJZaXE4",
  authDomain: "chatapp-a7506.firebaseapp.com",
  projectId: "chatapp-a7506",
  storageBucket: "chatapp-a7506.appspot.com",
  messagingSenderId: "707682467027",
  appId: "1:707682467027:web:f2f2eb44f5d22216452826",
  measurementId: "G-0QD5QYF89S"
});



const db = firebaseApp.firestore();

const auth = firebase.auth();

export {auth, db};