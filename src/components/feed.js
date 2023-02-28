import { getAuth, signOut } from "firebase/auth";
import navigate from "../router/navigate.js";
export const feed = () => {
  const feedSection = document.createElement("section");
  feedSection.className = "feedSection";
  feedSection.id = "feedSection";

  const feedNav = document.createElement("nav");
  feedNav.id = "feedNav";
  const logo = document.createElement("img");
  logo.className = "logoFeed";
  logo.id = "logoFeed";
  logo.src = "./img/logo.png";

  const imgUser = document.createElement("img");
  imgUser.className = "imgUser";

  const userMenu = document.createElement("div");
  userMenu.className = "userMenu";

  const btnLogout = document.createElement("button");
  btnLogout.type = "submit";
  btnLogout.className = "btnLogout";
  btnLogout.id = "btnLogout";
  btnLogout.textContent = "LOGOUT";
  btnLogout.style.display = "none";

  const userName = document.createElement("h5");


  userMenu.appendChild(imgUser);
  userMenu.appendChild(userName);
  userMenu.appendChild(btnLogout);

  const auth = getAuth();
  const userGoogle = auth.currentUser;
  console.log("usuario", userGoogle);
  if (userGoogle !== null) {
    userGoogle.providerData.forEach((profile) => {
      let photo = profile.photoURL;
      imgUser.src = photo;

      let name = profile.displayName;
      userName.textContent = name;

      if (photo === null) {
        imgUser.src = "./img/user.png";
      }
      //console.log("Sign-in provider: " + profile.providerId);
      //console.log("  Provider-specific UID: " + profile.uid);
      //console.log("  Name: " + profile.displayName);
      //console.log("  Email: " + profile.email);
      //console.log("  Photo URL: " + profile.photoURL);
    });
  }
  const user = auth.currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const name = user.name;
    //const email = user.email;
  //  const photoURL = user.photoURL;
    //const emailVerified = user.emailVerified;
   // const uid = user.uid;
   console.log("NOMBRE", name);
  }

  feedNav.appendChild(logo);
  feedNav.appendChild(userMenu);

  feedSection.appendChild(feedNav);

  imgUser.addEventListener("click", () => {
    btnLogout.style.display = "block";
  });

  btnLogout.addEventListener("click", async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return feedSection;
};
