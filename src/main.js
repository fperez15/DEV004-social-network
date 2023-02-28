import { routes } from "./router/routes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/fireBase";
import navigate from "./router/navigate.js";
const rootSection = document.getElementById("root");

const component = routes[window.location.pathname];

rootSection.appendChild(component());


onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user)
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    const name = user.displayName;
    console.log("name", name);
    // ...
    navigate("/feed");
  } else {
    console.log("usuario-no-login")
    // User is signed out
    // ...
    navigate("/");
  }
});


