import { home } from './components/home.js';
import { register } from './components/register.js';

const rootSection = document.getElementById("root");

export const routes = {
  "/": home,
  "/register": register,
};

const component = routes[window.location.pathname];

rootSection.appendChild(component());
