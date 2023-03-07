import { home } from './components/home.js';
import { register } from './components/register.js';
import { feed } from './components/feed.js';
import { authStateChangedEvent, auth } from './lib/fireBase';
import { onNavigate, addRoutes } from './router/index.js';

// inicializamos el router
const rutas = addRoutes({
  '/': home,
  '/register': register,
  '/feed': feed,
});
console.log("rutas", rutas)
// logica de la aplicacion
window.onload = () => {
  onNavigate(window.location.pathname);
};

window.onpopstate = () => {
  onNavigate(window.location.pathname);
};


authStateChangedEvent((user) => {
  console.log({user})
  if (user) {
    onNavigate('/feed');
  } else {
    onNavigate('/');
  }
});
