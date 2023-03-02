import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { auth } from "../lib/fireBase.js";
export const createUser =(email, password)=> {
    return createUserWithEmailAndPassword (auth,email,password).then(
        (usercredentials) => usercredentials.user
    )


}