

import navigate from "../router/navigate.js";
import { getFirestore, setDoc,doc} from "firebase/firestore";
import {createUser}from "../controller/auth.js"

export const register = () => {
  const registerSection = document.createElement("section");
  registerSection.id = "regSection";
  const logo = document.createElement("img");
  logo.className = "logo";
  logo.id = "logo";
  logo.src = "./img/logo.png";

  const formRegister = document.createElement("form");
  formRegister.className = "formRegister";

  const inpName = document.createElement("input");
  inpName.className = "form";
  inpName.id = "name";
  inpName.type = "text";
  inpName.placeholder = "Name";
  const inpEmail = document.createElement("input");
  inpEmail.className = "form";
  inpEmail.id = "email";
  inpEmail.type = "email";
  inpEmail.placeholder = "Email";
  const inpDate = document.createElement("input");
  inpDate.className = "form";
  inpDate.id = "inpDate";
  inpDate.type = "date";
  inpDate.placeholder = "date";
  const inpPassword = document.createElement("input");
  inpPassword.className = "form";
  inpPassword.id = "password";
  inpPassword.placeholder = "Password";
  inpPassword.type = "password";
  const errorMessage = document.createElement("p");
  errorMessage.id = "errorMessage";
  errorMessage.className = "errorMessage";
  errorMessage.style.display = "none";
  const btnRegister = document.createElement("button");
  btnRegister.type = "submit";
  btnRegister.className = "btnRegister";
  btnRegister.id = "btnRegister";
  btnRegister.textContent = "REGISTER";

  formRegister.appendChild(inpName);
  formRegister.appendChild(inpEmail);
  formRegister.appendChild(inpDate);
  formRegister.appendChild(inpPassword);
  formRegister.appendChild(errorMessage);
  formRegister.appendChild(btnRegister);

  registerSection.appendChild(logo);
  registerSection.appendChild(formRegister);

  formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = formRegister["email"].value;
    const password = formRegister["password"].value;

    try { createUser( email, password).then(
      (user)=>{
       // alert("Your account has been created successfuly.");
        swal({
          title: "Your account has been created successfuly!",
          text: "You clicked the button!",
          icon: "success",
          button: "Aww yiss!",
        });
        saveUser(user.uid);
        navigate("/");
      }

    )
      //   const UserCredentials = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );
    //   console.log("usuarioname",UserCredentials);
    //   alert("Your account has been created successfuly.");
    //  navigate("/");
    //  saveUser(UserCredentials.user.uid);
    } catch (error) {
           
      const errorCode = error.code;
      if (errorCode === "auth/weak-password") {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "The password must be at least 6 characters.";
      } else if (errorCode === "auth/network-request-failed") {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Fields cannot be empty.";
      }
      console.log(errorCode);
    };
    
  });

  const db = getFirestore();
  function saveUser(uid) {
    setDoc(doc(db, "users",uid), {
      displayName: inpName.value,
      email: inpEmail.value,
      password: inpPassword.value,
      date: inpDate.value,
      
    })
    .then(() => {
      console.log("Saved");
      
    })
    .catch((error) => {
      alert(error);
    });
    
  }
  

  return registerSection;
};
