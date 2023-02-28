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
  

  const btnLogout = document.createElement("button");
  btnLogout.type = "submit";
  btnLogout.className = "btnLogout";
  btnLogout.id = "btnLogout";
  btnLogout.textContent = "LOGOUT";
  btnLogout.style.display = "none";
  feedNav.appendChild(logo);
  feedNav.appendChild(imgUser);
  feedNav.appendChild(btnLogout);
  

  feedSection.appendChild(feedNav);

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
  const auth = getAuth();
  const userGoogle = auth.currentUser;
        
      
        if (userGoogle !== null) {
          userGoogle.providerData.forEach((profile) => {

            let photo = profile.photoURL
            console.log("foto", photo);
          

          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
          });
        } 
 
  return feedSection;
};
