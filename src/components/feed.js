// import { signOut } from 'firebase/auth';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { onNavigate } from '../router';
import {
  db,
  auth,
  signOutUser,
  queryInstruction,
  deletePost,
  getPost,
} from '../lib/fireBase.js';
import { modalDelete, modalEditPost } from './modal.js';

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
  const containerPosts = document.createElement('section');
  onSnapshot(queryInstruction(), (array) => {
    while (containerPosts.firstChild) {
      containerPosts.removeChild(containerPosts.firstChild)
    }
    array.forEach((posts) => {
      // const containerAllPublications = document.createElement('div');

      containerPosts.className = 'containerPosts';
      containerPosts.id = 'containerPosts';
      const articlePost = document.createElement('article');
      articlePost.className = 'articlePost';
      articlePost.id = 'articlePost';
      const imgUserPost = document.createElement('img');
      imgUserPost.className = 'imgUserPost';
      const nameUserPost = document.createElement('h5');
      nameUserPost.className = 'nameUserPost';
      // Btn Delete Post
      const btnDelete = document.createElement('button');
      btnDelete.type = 'submit';
      btnDelete.className = 'btnDelete';
      btnDelete.id = 'btnDelete';
      btnDelete.value = posts.id;
      btnDelete.style.display = 'none';
      const imgDelete = document.createElement('img');
      imgDelete.className = 'imgDelete';
      imgDelete.src = './img/delete-post.png';
      imgDelete.id = posts.id;
      btnDelete.appendChild(imgDelete);

      const btnEdit = document.createElement('button');
      btnEdit.className = 'btnEdit';
      btnEdit.id = 'btnEdit';
      btnEdit.style.display = 'none';
      const imgEdit = document.createElement('img');
      imgEdit.src = './img/edit-post.png';
      imgEdit.className = 'imgEdit';
      btnEdit.appendChild(imgEdit);

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
      // containerAllPublications.appendChild(containerPosts);
      // console.log('post', posts);
      imgUserPost.src = posts.data().photo;
      nameUserPost.textContent = posts.data().ownerPost;
      textPost.textContent = posts.data().post;
      const owner = posts.data().ownerPost;
      const user2 = auth.currentUser.displayName;
      if (owner === user2) {
        btnDelete.style.display = 'block';
        btnEdit.style.display = 'block';
      }
      const btnsDelete = containerPosts.querySelectorAll('#btnDelete');
      const modalForDelete = modalDelete();
      articlePost.appendChild(modalForDelete);
      btnsDelete.forEach((btn) => {
        btn.addEventListener('click', () => {
          // Open the Modal Delete
          modalForDelete.style.display = 'block';
          const confirmBtnDelete = modalForDelete.querySelector('#btnAgree');
          confirmBtnDelete.addEventListener('click', () => {
            console.log('target', posts.id);
            deletePost(posts.id);
            // close the modalDelete
            modalForDelete.style.display = 'none';

            // add event listener to cancel
            containerPosts.append(modalForDelete);

          });
          const btnCancel = modalForDelete.querySelector('#btnCancel');
          btnCancel.addEventListener('click', () => {
            modalForDelete.style.display = 'none';
          });
          console.log('click btn delete');
        });
      });

      const btnsEdit = containerPosts.querySelectorAll('#btnEdit');

      const modalToEdit = modalEditPost();
      modalToEdit.style.display = 'none';
      containerPosts.appendChild(modalToEdit);

      const clickEdit = function clickBtn(){
this.className = 'editBtnClick2';
      }

      btnsEdit.forEach((btn) => {
        console.log('click')
        if (owner === user2) {
          btn.addEventListener('click', clickEdit, async () => {
          console.log('edite', posts.id);
          articlePost.style.display = 'none';
          modalToEdit.style.display = 'grid'
          const doc =  await getPost(posts.id);
          const post = doc.data();
          modalToEdit.querySelector('.textAreaEdit').value = post.post;
          })
        }
      })
    })
  })

  return feedSection;
};