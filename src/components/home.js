import { signInWithEmailAndPassword } from "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { auth } from "../lib/fireBase.js";
import navigate from "../router/navigate.js";

export const home = () => {
  const homeSection = document.createElement("section");
  homeSection.id = "homeSection";

  const logo = document.createElement("img");
  logo.className = "logo";
  logo.id = "logo";
  logo.src = "./img/logo.png";

  const formLogin = document.createElement("form");
  formLogin.className = "formLogin";
  formLogin.id = "formLogin";

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
  const btnLogin = document.createElement("button");
  btnLogin.type = "submit";
  btnLogin.className = "btnLogin";
  btnLogin.id = "btnLogin";
  btnLogin.textContent = "LOGIN";

  formLogin.appendChild(inpEmail);
  formLogin.appendChild(inpPassword);
  formLogin.appendChild(btnLogin);

  const division = document.createElement("div");
  division.className = "division";
  division.id = "division";
  const line = document.createElement("hr");
  line.className = "line";
  line.id = "line";
  const or = document.createElement("p");
  or.textContent = "or";
  or.className = "or";
  const line2 = document.createElement("hr");
  line2.className = "line2";
  line2.id = "line2";
  
  division.appendChild(line);
  division.appendChild(or);
  division.appendChild(line2);

  const btnGoogle = document.createElement("img");
  btnGoogle.className = "btnGoogle";
  btnGoogle.id = "btnGoogle";
  btnGoogle.src = "./img/btnGoogle.png";

  const btnHomeRegister = document.createElement("button");
  btnHomeRegister.textContent = "REGISTER";
  btnHomeRegister.className = "btnHomeRegister";
  btnHomeRegister.id = "btnHomeRegister";

  homeSection.appendChild(logo);
  homeSection.appendChild(formLogin);
  homeSection.appendChild(division);
  homeSection.appendChild(btnGoogle);
  homeSection.appendChild(btnHomeRegister);

  //Go to /register
  btnHomeRegister.addEventListener("click", () => navigate("/register"));

  //Login with email
  formLogin.addEventListener("submit", async (e) => {
   e.preventDefault();
   const email = formLogin["email"].value;
   const password = formLogin["password"].value;

   try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
   console.log(credentials);
   navigate("/feed");

   } catch (error) {
   //Poner alertas de errores PENDIENTE
      console.log(error);
   }
  })

  //Login with Google
  btnGoogle.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();

    try {
      const credential = await signInWithPopup(auth, provider);
      console.log(credential);
      navigate("/feed");

    } catch (error) {
      console.log(error);
    }
  });
  return homeSection;
};
