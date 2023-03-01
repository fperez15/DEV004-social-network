import { getAuth, signOut } from "firebase/auth";
import navigate from "../router/navigate.js";
import {  getDoc, doc } from "firebase/firestore";
import {db, auth} from "../lib/fireBase.js"
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

  const userGoogle = auth.currentUser;
  console.log("usuario", userGoogle);
  if (userGoogle !== null) {
    userGoogle.providerData.forEach(async(profile) => {
      let photo = profile.photoURL;
      imgUser.src = photo;

      let name = profile.displayName;
      userName.textContent = name;

      if (photo === null) {
        imgUser.src = "./img/user.png";
      }
       const docRef = doc(db, "users", userGoogle.uid);
      const docSnap = await getDoc(docRef);
      console.log("snap",docSnap)
      if (docSnap.exists()) {
        let name = userGoogle.uid;
      userName.textContent = name;
        console.log("Document data:", docSnap.data().name);

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      //console.log("Sign-in provider: " + profile.providerId);
      //console.log("  Provider-specific UID: " + profile.uid);
      //console.log("  Name: " + profile.displayName);
      //console.log("  Email: " + profile.email);
      //console.log("  Photo URL: " + profile.photoURL);
    });
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
