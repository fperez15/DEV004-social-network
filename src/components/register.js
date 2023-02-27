import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { auth } from "../lib/fireBase.js";
import navigate from "../router/navigate.js";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";

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
  formRegister.appendChild(inpPassword);
  formRegister.appendChild(errorMessage);
  formRegister.appendChild(btnRegister);

  registerSection.appendChild(logo);
  registerSection.appendChild(formRegister);

  formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = formRegister["name"].value;
    const email = formRegister["email"].value;
    const password = formRegister["password"].value;

    try {
      const UserCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(UserCredentials);
      alert("Your account has been created successfuly.");
      navigate("/");
      saveUser();
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
  function saveUser() {
    addDoc(collection(db, "users"), {
      name: inpName.value,
      email: inpEmail.value,
      password: inpPassword.value,
     
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
