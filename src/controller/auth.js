import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  // createUserWithEmailAndPassword,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
//import { onNavigate } from "../router/navigate.js";
import { auth, provider } from "../lib/fireBase.js";

const db = getFirestore();

// Firestore conection
const saveUser = (displayName, email, password, date, uid) => {
  setDoc(doc(db, "users", uid), {
    displayName,
    email,
    password,
    date,
    uid,
  });
};
// User authentication
export const createUser = (email, password, displayName, date) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((usercredentials) => {
      const user = usercredentials.user;
      saveUser(displayName, email, password, date, user.uid);
      swal({
        title: "Your account has been created successfuly!",
        text: "You clicked the button!",
        icon: "success",
        button: "Aww yiss!",
      });
   //   onNavigate("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/weak-password") {
        alert("The password must be at least 6 characters.");
      } else if (errorCode === "auth/network-request-failed") {
        alert("Fields cannot be empty.");
      }
      console.log(errorCode);
    });
};

// login function
export const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

// login with google
export const logInGoogle = () => {
 return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      return {user, token}
    })
    .catch((error) => {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
