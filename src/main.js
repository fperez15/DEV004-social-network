import { routes } from "./router/routes";

const rootSection = document.getElementById("root");

const component = routes[window.location.pathname];

rootSection.appendChild(component());
