import { routes } from './router/routes';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/fireBase';
import { onNavigate } from './router/navigate.js';
const rootSection = document.getElementById('root');

const component = routes[window.location.pathname];
window.onpopstate = ()=>{
    rootSection.append(component(onNavigate))
}
onAuthStateChanged(auth, (user) => {

  if (user) {
    //console.log(user)
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    const name = user.displayName;
    //console.log('name', name);
    // ...
    onNavigate('/feed');
  } else {
    //console.log('usuario-no-login')
    // User is signed out
    // ...
    onNavigate('/');
  }
});
