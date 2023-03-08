import { onNavigate } from '../router';

export const post = () =>{
    const postSection = document.createElement('section');
    postSection.className = 'postSection';
    const logoPost = document.createElement('img');
    logoPost.className = 'logoPost';
    logoPost.src = './img/logo.png';

    const articlePost = document.createElement('article');
    articlePost.className = 'articlePost';
    const userImg = document.createElement('img');
    userImg.className = 'userImg';
    const nameUser= document.createElement('h6');
    nameUser.className = 'nameUser';
    const inpPost = document.createElement('input');
    inpPost.className = 'inpPost';
    inpPost.placeholder = 'What would you like to share?';
    const btnCancelPost = document.createElement('button');
    btnCancelPost.className = 'btnCancelPost';
    btnCancelPost.textContent = 'CANCEL';
    const btnCreatePost = document.createElement('button');
    btnCreatePost.className = 'btnCreatePost';
    btnCreatePost.textContent = 'POST';
    
    articlePost.appendChild(userImg);
    articlePost.appendChild(nameUser);
    articlePost.appendChild(inpPost);
    articlePost.appendChild(btnCancelPost);
    articlePost.appendChild(btnCreatePost);

    postSection.appendChild(logoPost);
    postSection.appendChild(articlePost);

    btnCancelPost.addEventListener('click', () => onNavigate('/feed'));
    
    return postSection
}