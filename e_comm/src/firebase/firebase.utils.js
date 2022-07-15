import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
require("dotenv").config();

const config = {
  apiKey: "AIzaSyDgqXKDr_C1nr54jUf_bB9sBLPNcsMpMXw",
  authDomain: "myapp-345718.firebaseapp.com",
  projectId: "myapp-345718",
  storageBucket: "myapp-345718.appspot.com",
  messagingSenderId: "8558911944",
  appId: "1:8558911944:web:1f561520fd8c53dc1fe0fd",
  measurementId: "G-1K0CVMWFZ0"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithRedirect(provider);

export default firebase;
