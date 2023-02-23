export const register = () => {
  const registerSection = document.createElement("section");
  registerSection.innerHTML = `<section class="regSection">
  <img class= "logo" src="./img/logo.png">
  <form class="formRegister">
  <input class="form" id="name" type="text" placeholder="Name"></input>
  <input class="form" id="email" type="email" placeholder="Email"></input>
  <input class="form" id="birthday" type="date"></input>
  <input class="form" id="password" type="password" placeholder="Pasword"></input>
  <button class="btnRegister" id="btnRegister">REGISTER</button>
  </form>
  </section>
  `;
  return registerSection;
};