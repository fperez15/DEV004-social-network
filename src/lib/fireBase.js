// Import the functions you need from the SDKs you need
//-import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//-import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOUeeD-y4TUdhaBdt5fG6ZEmSTthslbGI",
  authDomain: "home-helpers-74055.firebaseapp.com",
  projectId: "home-helpers-74055",
  storageBucket: "home-helpers-74055.appspot.com",
  messagingSenderId: "914508630139",
  appId: "1:914508630139:web:5ca89311430a8e95993ade",
  measurementId: "G-XJVC9T7JX1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


// Initialize Firebase
 //const analytics = getAnalytics(app);
   //const db = getFirestore(app);

//   // agregar datos
//   import { collection, addDoc } from "firebase/firestore"; 

// try {
// const docRef = await addDoc(collection(db, "users"), {
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815
// });
// console.log("Document written with ID: ", docRef.id);
// } catch (e) {
// console.error("Error adding document: ", e);
// }
