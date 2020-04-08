import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4qg_3ziX4-6aTN6HlUQxEdvBW6FncKl0",
  authDomain: "musical-comments.firebaseapp.com",
  databaseURL: "https://musical-comments.firebaseio.com",
  projectId: "musical-comments",
  storageBucket: "musical-comments.appspot.com",
  messagingSenderId: "169851238366",
  appId: "1:169851238366:web:823b6e13e8ddd3dd470f4f"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

export {db, storage, storageRef}

export default firebase;