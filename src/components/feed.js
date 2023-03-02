import { getAuth, signOut } from "firebase/auth";
import navigate from "../router/navigate.js";
import {  getDoc, doc } from "firebase/firestore";
import {db, auth} from "../lib/fireBase.js"
export const feed = () => {
 const feedSection = document.createElement("section");
  feedSection.className = "feedSection";
  feedSection.id = "feedSection";
  
  const logo = document.createElement("img");
  logo.className = "logoFeed";
  logo.id = "logoFeed";
  logo.src = "./img/logo.png";
  
  const feedNav = document.createElement("nav");
  feedNav.id = "feedNav";
  feedNav.className = "feedNav";
  
  const ulMenu = document.createElement("ul");
  ulMenu.className = "ulMenu";
 
  const imgUser = document.createElement("img");
  imgUser.className = "imgUser";
  const liImg= document.createElement("li")
  liImg.className = "liImg";
  
  const userName = document.createElement("h5");
  userName.className = "userName";
  const liName= document.createElement("li")
  liName.className = "liName";

  const btnLogout = document.createElement("button");
  btnLogout.type = "submit";
  btnLogout.className = "btnLogout";
  btnLogout.id = "btnLogout";
  btnLogout.textContent = "LOGOUT";
  const liLogout= document.createElement("li")
  liLogout.className = "liLogout";

  liImg.appendChild(imgUser);
  liImg.appendChild(userName);
  liLogout.appendChild(btnLogout);

  ulMenu.appendChild(liImg);
  ulMenu.appendChild(liName);
  ulMenu.appendChild(liLogout);
    
  feedNav.appendChild(ulMenu);
  feedSection.appendChild(feedNav);
  feedSection.appendChild(logo);

  const user = auth.currentUser;
  console.log("usuario", user);
  if (user !== null) {
    user.providerData.forEach(async(profile) => {
      let photo = profile.photoURL;
      imgUser.src = photo;

      let name = profile.displayName;
      userName.textContent = name;

      if (photo === null) {
        imgUser.src = "./img/user.png";
      }
       const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      console.log("snap",user)
      if (docSnap.exists()) {
        let name = docSnap.data().displayName;
      userName.textContent = name;
        console.log("Document data:", docSnap.data().displayName);

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
