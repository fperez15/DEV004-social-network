import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


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


