import { home } from './components/home.js';
import { register } from './components/register.js';
import { feed } from './components/feed.js';
import { authStateChangedEvent } from './lib/fireBase';
import { onNavigate, addRoutes } from './router';

// inicializamos el router
addRoutes({
  '/': home,
  '/register': register,
  '/feed': feed,
});

// logica de la aplicacion
window.onload = () => {
  onNavigate(window.location.pathname);
};

window.onpopstate = () => {
  onNavigate(window.location.pathname);
};

authStateChangedEvent((user) => {
  if (user) {
    onNavigate('/feed');
  } else {
    onNavigate('/');
  }
});
