const ROUTES = {};

export const onNavigate = (pathname) => {
  const path = typeof ROUTES[pathname] !== 'function' ? pathname : '/'; // el pathname debe ser una funcion 
  window.history.pushState({}, path, window.location.origin + pathname); // guarda el historial de lo q se hace en la pagina
  const rootSection = document.getElementById('root'); // aca se recupera la seccion root, llama la section
  rootSection.innerHTML = ''; 
  rootSection.append(ROUTES[pathname]());
};

export const addRoutes = (routes) => {
  Object.keys(routes).reduce((currentRoutes, pathname) => {
    currentRoutes[pathname] = routes[pathname];
    return currentRoutes;
  }, ROUTES);
};
