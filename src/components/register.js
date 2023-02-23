import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { auth } from "../lib/fireBase.js"
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
  const btnRegister = document.createElement("button");
  btnRegister.type = "submit";
  btnRegister.class = "btnRegister";
  btnRegister.id = "btnRegister";
  btnRegister.textContent = "REGISTER";

  formRegister.appendChild(inpName);
  formRegister.appendChild(inpEmail);
  formRegister.appendChild(inpPassword);
  formRegister.appendChild(btnRegister);

  registerSection.appendChild(logo);
  registerSection.appendChild(formRegister);

  formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = formRegister["name"].value;
    const email = formRegister["email"].value;
    const password = formRegister["password"].value;
    
    try {
      const UserCredentials = await createUserWithEmailAndPassword(auth, name, email, password);
    console.log(UserCredentials);
    } catch (error) {
      console.log(error);
    }
  });

  return registerSection;
};
