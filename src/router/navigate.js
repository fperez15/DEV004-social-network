import { routes } from './routes';
const rootSection = document.getElementById('root');

function onNavigate(pathname) {
 
  while (rootSection.firstChild) {
    rootSection.firstChild.remove();
  }
  window.history.pushState({}, pathname, window.location.origin + pathname);
  rootSection.appendChild(routes[pathname]());
}

const component = routes[Window.location.pathname]
window.onpopstate = ()=>{
  rootSection.append(component(onNavigate))

  
}
