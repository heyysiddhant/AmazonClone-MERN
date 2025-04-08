import firebase from 'firebase/compat/app';
// v9 compat packages are API compatible with v8 code
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDL4epBl1IRwBoEtf-zqCqA2BprVHRuIqA",
    authDomain: "amazing-prime-clone.firebaseapp.com",
    projectId: "amazing-prime-clone",
    storageBucket: "amazing-prime-clone.appspot.com",
    messagingSenderId: "90316628171",
    appId: "1:90316628171:web:cc6e3f97e8bebd6893fb4e",
    measurementId: "G-SLSFSBYL9T"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();

  export  {db , auth} ; 
