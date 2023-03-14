import { createUser } from '../lib/fireBase.js';
import { onNavigate } from '../router/index.js';

export const register = () => {
  const registerSection = document.createElement('section');
  registerSection.id = 'regSection';
  const logo = document.createElement('img');
  logo.className = 'logo';
  logo.id = 'logo';
  logo.src = './img/logo.png';

  const errorRegister = document.createElement('h5');
  errorRegister.className = 'errorRegister';
  errorRegister.style.display = 'none';

  const formRegister = document.createElement('form');
  formRegister.id = 'formRegister';
  formRegister.className = 'formRegister';

  const inpName = document.createElement('input');
  inpName.className = 'form';
  inpName.id = 'name';
  inpName.type = 'text';
  inpName.placeholder = 'Name';
  inpName.setAttribute('required', '');
  const inpEmail = document.createElement('input');
  inpEmail.className = 'form';
  inpEmail.id = 'email';
  inpEmail.type = 'email';
  inpEmail.placeholder = 'Email';
  const inpDate = document.createElement('input');
  inpDate.className = 'form';
  inpDate.id = 'inpDate';
  inpDate.type = 'date';
  inpDate.placeholder = 'date';
  inpDate.setAttribute('required', '');
  const inpPassword = document.createElement('input');
  inpPassword.className = 'form';
  inpPassword.id = 'password';
  inpPassword.placeholder = 'Password';
  inpPassword.type = 'password';
  const btnRegister = document.createElement('button');
  btnRegister.type = 'submit';
  btnRegister.className = 'btnRegister';
  btnRegister.id = 'btnRegister';
  btnRegister.textContent = 'REGISTER';

  formRegister.appendChild(inpName);
  formRegister.appendChild(inpEmail);
  formRegister.appendChild(inpDate);
  formRegister.appendChild(inpPassword);
  formRegister.appendChild(btnRegister);

  registerSection.appendChild(logo);
  registerSection.appendChild(errorRegister);
  registerSection.appendChild(formRegister);

  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    createUser(inpEmail.value, inpPassword.value, inpName.value, inpDate.value)
      .then(() => {
        onNavigate('/feed');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/weak-password') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'The password must be at least 6 characters.';
        } else if (errorCode === 'auth/network-request-failed.') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Fields cannot be empty.';
        }
        if (errorCode === 'auth/invalid-email') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Fields cannot be empty.';
        }
        if (errorCode === 'auth/missing-email') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Email field cannot be empty.';
        }
        if (errorCode === 'auth/email-already-in-use') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Email already in use.';
        }
        if (errorCode === 'auth/internal-error') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Password field cannot be empty.';
        }
        return error;
      });
  });
  return registerSection;
};
