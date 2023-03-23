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
  updatePost,
  toLike,
  toDislike
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
      containerPosts.removeChild(containerPosts.firstChild);
    }
    array.forEach((posts) => {
      const postLikes = posts.data().likes;

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
      btnEdit.setAttribute('btnEdit', posts.id);
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
      const likeNum = postLikes.length;
      likesNum.textContent = likeNum + ' likes';
      const btnLike = document.createElement('button');
      btnLike.className = 'btnLike';
      btnLike.setAttribute('btnLikes', posts.id);
      const like = document.createElement('img');
      like.className = 'like';
      like.src = './img/heart.png';
      const dislike = document.createElement('img');
      dislike.className = 'dislike';
      dislike.src = './img/full-heart.png';
      dislike.style.display = 'none'
      bottomDiv.appendChild(likesNum);
      btnLike.appendChild(like);
      btnLike.appendChild(dislike);
      bottomDiv.appendChild(btnLike);
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
        btnDelete.style.display = 'flex';
        btnEdit.style.display = 'flex';
      }
      if (postLikes.includes(auth.currentUser.uid)) {
        like.style.display = 'none'
        dislike.style.display = 'flex'
      } else {
        like.style.display = 'flex'
        dislike.style.display = 'none'

      }
      //btns likes
      const btnsLikes = containerPosts.querySelectorAll('.btnLike');
      btnsLikes.forEach((btn) => {
        btn.addEventListener('click', async () => {
          const getIdPost = btn.getAttribute('btnLikes');
          if (getIdPost === posts.id) {
            // like.style.display = 'none';
            // dislike.style.display = 'flex';
            const doc = await getPost(posts.id);
            const post = doc.data();
            if (post.likes.includes(user.uid)) {
              toDislike(posts.id, user.uid)
            } else {
              toLike(posts.id, user.uid)
            }
          }
        })
      })

      //btn para eliminar publicacion
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
      btnsEdit.forEach((btn) => {
        const getIdPost = btn.getAttribute('btnEdit');
        if (getIdPost === posts.id) {
          const modalToEdit = modalEditPost();
          modalToEdit.style.display = 'none';
          containerPosts.appendChild(modalToEdit);
          btn.addEventListener('click', async () => {
            articlePost.style.display = 'none';
            modalToEdit.style.display = 'grid';
            const doc = await getPost(posts.id);
            const post = doc.data();
            modalToEdit.querySelector('.userImgEdit').src = post.photo;
            modalToEdit.querySelector('.nameUserEdit').textContent =
              post.ownerPost;
            modalToEdit.querySelector('.textAreaEdit').value = post.post;
            const btnConfirmEdit =
              modalToEdit.querySelector('.editPostConfirm');
            btnConfirmEdit.addEventListener('click', () => {
              const editPost = modalToEdit.querySelector('.textAreaEdit').value;
              updatePost(posts.id, { post: editPost });
            });
            const btnCanceledit = modalToEdit.querySelector('.btnCancelEdit');
            btnCanceledit.addEventListener('click', () => {
              articlePost.style.display = 'grid';
              modalToEdit.style.display = 'none';
            });
          });
        }
      });
    });
  });
  return feedSection;
};
