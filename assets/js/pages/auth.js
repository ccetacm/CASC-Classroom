import { auth } from "../firebase/firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign Up
export function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed up:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
    });
}

// Sign In
export function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed in:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
    });
}

// Sign Out
export function logOut() {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out:", error.message);
    });
}
