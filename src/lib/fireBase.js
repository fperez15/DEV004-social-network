import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  // createUserWithEmailAndPassword,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { onNavigate } from "../router/navigate.js";

const firebaseConfig = {
  apiKey: "AIzaSyAOUeeD-y4TUdhaBdt5fG6ZEmSTthslbGI",
  authDomain: "home-helpers-74055.firebaseapp.com",
  projectId: "home-helpers-74055",
  storageBucket: "home-helpers-74055.appspot.com",
  messagingSenderId: "914508630139",
  appId: "1:914508630139:web:5ca89311430a8e95993ade",
  measurementId: "G-XJVC9T7JX1",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

const db2 = getFirestore();
// Firestore conection
const saveUser = (displayName, email, password, date, uid) => {
  setDoc(doc(db2, "users", uid), {
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
export const logIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// login with google
export const logInGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      return { user, token };
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
onAuthStateChanged(auth, (user) => {
  if (user) {
    //console.log(user)
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    const name = user.displayName;
    //console.log('name', name);
    //     // ...
    onNavigate("/feed");
  } else {
    //console.log('usuario-no-login')
    // User is signed out
    // ...
    onNavigate("/");
  }
});
