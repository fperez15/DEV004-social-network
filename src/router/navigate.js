import { routes } from './routes';

function onNavigate(pathname) {
  const rootSection = document.getElementById('root');
  while (rootSection.firstChild) {
    rootSection.firstChild.remove();
  }
  window.history.pushState({}, pathname, window.location.origin + pathname);
  rootSection.appendChild(routes[pathname](onNavigate));
}

