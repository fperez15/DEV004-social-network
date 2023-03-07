const ROUTES = {};

export const onNavigate = (pathname) => {
  const path = typeof ROUTES[pathname] !== 'function' ? pathname : '/';
  window.history.pushState({}, path, window.location.origin + pathname);
  const rootSection = document.getElementById('root');
  rootSection.innerHTML = '';
  rootSection.append(ROUTES[pathname]());
};

export const addRoutes = (routes) => {
  return Object.keys(routes).reduce((currentRoutes, pathname) => {
    // seria buena agregar validaciones
    currentRoutes[pathname] = routes[pathname];
    return currentRoutes;
  }, ROUTES);
};
