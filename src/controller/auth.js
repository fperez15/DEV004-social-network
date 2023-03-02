import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { auth } from "../lib/fireBase.js";
import { getFirestore, setDoc,doc} from "firebase/firestore";
import navigate from "../router/navigate.js";

const db = getFirestore();
export const createUser =(email, password,displayName,date)=> {
    createUserWithEmailAndPassword (auth,email,password)
   
    .then((usercredentials) => {
       const user= usercredentials.user;
        saveUser(displayName, email, password, date, user.uid );
        swal({
            title: "Your account has been created successfuly!",
            text: "You clicked the button!",
            icon: "success",
            button: "Aww yiss!",
          });
          navigate("/")
    })
    .catch ((error)=> {
            const errorCode = error.code;
            if (errorCode === "auth/weak-password") {
          alert( "The password must be at least 6 characters.");
            } else if (errorCode === "auth/network-request-failed") {
            alert( "Fields cannot be empty.");
            }
            console.log(errorCode);
          });
        }
    
  const saveUser=(displayName, email, password,date, uid)=> {
    setDoc(doc(db, "users",uid), {
      displayName: displayName,
      email: email,
      password: password,
      date: date,
      uid: uid,
    })
    }