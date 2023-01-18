import  firebase  from 'firebase';






const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const storageRef = storage.ref();
const imagesRef = storageRef.child('images');

export {auth, db, storage, storageRef, imagesRef};
