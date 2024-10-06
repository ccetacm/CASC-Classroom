import { auth } from "../firebase/firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { storage } from "../firebase/firebase-config.js";
import { database } from "../firebase/firebase-config.js";
import { onValue, ref } from "firebase/database";
import { ref as storageRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

// Function to check Firebase connectivity
function checkFirebaseConnection() {
  const connectedRef = ref(database, ".info/connected");
  onValue(connectedRef, (snap) => {
    const statusDot = document.getElementById("statusDot");
    if (snap.val() === true) {
      statusDot.classList.add("connected");
    } else {
      statusDot.classList.remove("connected");
    }
  });
}

// Check Firebase connection when the script loads
checkFirebaseConnection();

// Sign Up
function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      console.log("User signed up:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
    });
}

// Sign In
function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log("User signed in:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
    });
}

// Sign Out
function logOut() {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out:", error.message);
    });
}

// Function to upload file to Firebase Storage
function uploadFile(file) {
  const fileRef = storageRef(storage, "files/" + file.name);
  uploadBytesResumable(fileRef, file)
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .then((downloadURL) => {
      console.log("File available at", downloadURL);
    })
    .catch((error) => {
      console.error("Upload failed:", error);
    });
}
