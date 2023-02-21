import navigate from '../router/navigate.js'

export const home = () => {
    const homeSection = document.createElement('section');
    const btnRegister = document.createElement('button');

    btnRegister.textContent = 'Register';
    btnRegister.addEventListener("click", () => navigate('/register'));

    homeSection.appendChild(btnRegister);

    return homeSection;
}