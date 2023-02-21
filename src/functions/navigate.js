import { routes } from '../main.js';
const rootSection = document.getElementById("root");

export default function onNavigate(pathname) {
    window.history.pushState(
      {},
      pathname,
      window.location.origin + pathname,
    );
    rootSection.appendChild(routes[pathname]());
  };

const component = routes[window.location.pathname];

rootSection.appendChild(component());


