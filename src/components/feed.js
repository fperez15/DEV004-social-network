// import { signOut } from 'firebase/auth';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { onNavigate } from '../router';
import {
  db,
  auth,
  signOutUser,
  queryInstruction,
  deletePost,
} from '../lib/fireBase.js';

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
  const imgLogout = document.createElement('img');
  imgLogout.className = 'imgLogout';
  imgLogout.src = './img/log-out.png';
  btnLogout.appendChild(imgLogout);
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
      }
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

  onSnapshot(queryInstruction(), (array) => {
      array.forEach((posts) => {
      const containerPosts = document.createElement('section');
      containerPosts.className = 'containerPosts';

      const articlePost = document.createElement('article');
      articlePost.className = 'articlePost';
      articlePost.id = 'articlePost';
      const imgUserPost = document.createElement('img');
      imgUserPost.className = 'imgUserPost';
      const nameUserPost = document.createElement('h5');
      nameUserPost.className = 'nameUserPost';
      const btnDelete = document.createElement('img');
      btnDelete.className = 'btnDelete';
      btnDelete.src = './img/delete-post.png';
      btnDelete.style.display = 'none';
      const btnEdit = document.createElement('img');
      btnEdit.className = 'btnEdit';
      btnEdit.src = './img/edit-post.png';
      btnEdit.style.display = 'none';
      const textPost = document.createElement('p');
      textPost.className = 'textPost';
      const bottomDiv = document.createElement('div');
      bottomDiv.className = 'bottomDiv';
      const likesNum = document.createElement('p');
      likesNum.className = 'likesNum';
      const btnlike = document.createElement('img');
      btnlike.className = 'btnlike';

      bottomDiv.appendChild(likesNum);
      bottomDiv.appendChild(btnlike);

      articlePost.appendChild(imgUserPost);
      articlePost.appendChild(nameUserPost);
      articlePost.appendChild(btnDelete);
      articlePost.appendChild(btnEdit);
      articlePost.appendChild(textPost);
      articlePost.appendChild(bottomDiv);

      containerPosts.append(articlePost);
      feedSection.appendChild(containerPosts);

      imgUserPost.src = posts.data().photo;
      nameUserPost.textContent = posts.data().ownerPost;
      textPost.textContent = posts.data().post;
      const owner = posts.data().ownerPost;
      const user2= auth.currentUser.displayName
       if(owner === user2){
      btnDelete.style.display = 'block';
       btnEdit.style.display = 'block';
       }
        });
      //  btnDelete.addEventListener('click', () =>{
      //     deletePost()
      //    })  
  });

  return feedSection;
};
