// import { signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { onNavigate } from '../router';
import { db, auth, signOutUser } from '../lib/fireBase.js';

export const feed = () => {
  const feedSection = document.createElement('section');
  feedSection.className = 'feedSection';
  feedSection.id = 'feedSection';

  const logo = document.createElement('img');
  logo.className = 'logoFeed';
  logo.id = 'logoFeed';
  logo.src = './img/logo.png';

  const feedNav = document.createElement('nav');
  feedNav.id = 'feedNav';
  feedNav.className = 'feedNav';

  const ulMenu = document.createElement('ul');
  ulMenu.className = 'ulMenu';

  const imgUser = document.createElement('img');
  imgUser.className = 'imgUser';
  const liImg = document.createElement('li');
  liImg.className = 'liImg';

  const userName = document.createElement('h5');
  userName.className = 'userName';
  const liName = document.createElement('li');
  liName.className = 'liName';

  const btnLogout = document.createElement('button');
  btnLogout.type = 'submit';
  btnLogout.className = 'btnLogout';
  btnLogout.id = 'btnLogout';
  btnLogout.textContent = 'LOGOUT';
  const liLogout = document.createElement('li');
  liLogout.className = 'liLogout';
  liImg.appendChild(imgUser);
  liImg.appendChild(userName);
  liLogout.appendChild(btnLogout);

  ulMenu.appendChild(liImg);
  ulMenu.appendChild(liName);
  ulMenu.appendChild(liLogout);

  feedNav.appendChild(ulMenu);
  const divPost = document.createElement('div');
  divPost.className = 'divPost';
  const imgPost = document.createElement('img');
  imgPost.className = 'imgPost';
  imgPost.src = './img/imgPost.png';
  const txtPost = document.createElement('h5');
  txtPost.className = 'txtPost';
  txtPost.textContent = 'NEW POST';
  divPost.appendChild(imgPost);
  divPost.appendChild(txtPost);

  feedSection.appendChild(feedNav);
  feedSection.appendChild(logo);
  feedSection.appendChild(divPost);

  const user = auth.currentUser;
  if (user !== null) {
    user.providerData.forEach(async (profile) => {
      const photo = profile.photoURL;
      imgUser.src = photo;
      const name = profile.displayName;
      userName.textContent = name;

      if (photo === null) {
        imgUser.src = './img/user.png';
      }
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      // console.log('snap',user)
      if (docSnap.exists()) {
        const nameF = docSnap.data().displayName;
        userName.textContent = nameF;
        //  console.log('Document data:', docSnap.data().displayName);
      } else {
        //  doc.data() will be undefined in this case
        //  console.log('No such document!');
      }

      //  console.log('Sign-in provider: ' + profile.providerId);
      //  console.log('  Provider-specific UID: ' + profile.uid);
      //  console.log('  Name: ' + profile.displayName);
      //  console.log('  Email: ' + profile.email);
      //  console.log('  Photo URL: ' + profile.photoURL);
    });
  }

  btnLogout.addEventListener('click', () => {
    signOutUser()
      .then(() => {
        onNavigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        return errorCode;
      });
  });
  txtPost.addEventListener('click', () => onNavigate('/post'));
  imgPost.addEventListener('click', () => onNavigate('/post'));
  return feedSection;
};
