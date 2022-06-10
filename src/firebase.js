import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQjokVRnw9HHBg-gOeDcg3aSpjglhDudA",
  authDomain: "ecommerce-ab127.firebaseapp.com",
  projectId: "ecommerce-ab127",
  storageBucket: "ecommerce-ab127.appspot.com",
  messagingSenderId: "341446281727",
  appId: "1:341446281727:web:7dbc2047deb2ae1eb9ffca",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
 