import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'


//For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABvBDvAEliecE-tSfVveoeb3l7KCokKGs",
    authDomain: "whatsapp-clone-aa370.firebaseapp.com",
    projectId: "whatsapp-clone-aa370",
    storageBucket: "whatsapp-clone-aa370.appspot.com",
    messagingSenderId: "161266854259",
    appId: "1:161266854259:web:ff8ee683a2bbbba719fd06",
    measurementId: "G-YXES4XWMSW"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;