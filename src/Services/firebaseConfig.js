import  firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// المعلومات الخاصة باتصال قاعدة بيانات Firebase هنا

const firebaseConfig = {
  apiKey: "AIzaSyCyWWxmpi8J-g3-ps6izKBhs-3SYmaRjcQ",
  authDomain: "quiz-adbc3.firebaseapp.com",
  projectId: "quiz-adbc3",
  storageBucket: "quiz-adbc3.appspot.com",
  messagingSenderId: "623725451177",
  appId: "1:623725451177:web:06e2ef9884be670d8616b8",
  measurementId: "G-WML5Y89T4V"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const firestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const authUser = firebase.auth();

export { projectStorage, firestore, timestamp, authUser};