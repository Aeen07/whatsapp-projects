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

// const firebaseConfig = {
//   apiKey: "AIzaSyAW0SrlTBbVgs16qs0USp4XfuBQPVNxFYo",
//   authDomain: "whatsapp-1f5df.firebaseapp.com",
//   projectId: "whatsapp-1f5df",
//   storageBucket: "whatsapp-1f5df.appspot.com",
//   messagingSenderId: "90740152315",
//   appId: "1:90740152315:web:9b582e08cb9c94c8aadd5e",
//   measurementId: "G-QCFBV9C2DS"
// };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
//2:08:02