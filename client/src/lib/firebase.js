import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMChCvN0vXLCGXBFHkTSCzAO3CY-_sl9s",
  authDomain: "meet-clone-7dfb5.firebaseapp.com",
  projectId: "meet-clone-7dfb5",
  storageBucket: "meet-clone-7dfb5.appspot.com",
  messagingSenderId: "453183210184",
  appId: "1:453183210184:web:461216d1c4b1177d151bfd",
  measurementId: "G-X4HN5FJJZN",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
