import * as firebase from 'firebase'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBS6TLtUuD1aH1eaVF9yo5HboAP1pcsy4Q",
    authDomain: "socialmediareactnative-2810.firebaseapp.com",
    databaseURL: "https://socialmediareactnative-2810.firebaseio.com",
    projectId: "socialmediareactnative-2810",
    storageBucket: "socialmediareactnative-2810.appspot.com",
    messagingSenderId: "963188675187",
    appId: "1:963188675187:web:4a50ab1a2fe45ddec29006",
    measurementId: "G-NVK9J9VRBF"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
  
export default fb