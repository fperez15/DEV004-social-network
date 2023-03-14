import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  setDoc,
  doc,

} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAOUeeD-y4TUdhaBdt5fG6ZEmSTthslbGI',
  authDomain: 'home-helpers-74055.firebaseapp.com',
  projectId: 'home-helpers-74055',
  storageBucket: 'home-helpers-74055.appspot.com',
  messagingSenderId: '914508630139',
  appId: '1:914508630139:web:5ca89311430a8e95993ade',
  measurementId: 'G-XJVC9T7JX1',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const db2 = getFirestore();

// Firestore conection
const saveUser = (displayName, email, password, date, uid) => {
  setDoc(doc(db2, 'users', uid), {
    displayName,
    email,
    password,
    date,
    uid,
  });
};
// User authentication
// eslint-disable-next-line
export const createUser = (email, password, displayName, date) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((usercredentials) => {
      const user = usercredentials.user;
      saveUser(displayName, email, password, date, user.uid);
      return user;
    });
};

// login function
export const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

// login with google
// eslint-disable-next-line
export const logInGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      return { user, token };
    });
};

export function authStateChangedEvent(cb) {
  onAuthStateChanged(auth, (user) => cb(user));
}

export const signOutUser = () => signOut(auth);
