// firebaseConfig.js
import firebase from 'firebase/app';
import 'firebase/storage';   
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2YHa1292PV3OiEaskq1LZlOri1IwRBNs",
  authDomain: "invom-cb6f9.firebaseapp.com",
  projectId: "invom-cb6f9",
  storageBucket: "invom-cb6f9.appspot.com",
  messagingSenderId: "1098104198162",
  appId: "1:1098104198162:android:fd00d0451e4b7982eff4cb"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

export default firebase;
