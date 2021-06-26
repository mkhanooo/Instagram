import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyADhZqLGe8LkKyYU6dbyehW60MX7tMykpk",
  authDomain: "instagram-23c75.firebaseapp.com",
  projectId: "instagram-23c75",
  storageBucket: "instagram-23c75.appspot.com",
  messagingSenderId: "699741621702",
  appId: "1:699741621702:web:89c81092aecd9f508036c7",
  measurementId: "G-JP9LQ7CT0H",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
