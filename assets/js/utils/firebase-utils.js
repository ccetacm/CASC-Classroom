import { database } from "../firebase.js";
import { onValue, ref } from "firebase/database";
import { storage } from "../firebase.js";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Function to check Firebase connectivity
export const checkFirebaseConnection = () => {
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

// Function to upload file to Firebase Storage
export const uploadFile = (file) => {
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
