import { register } from '../src/components/register.js';
import { home } from '../src/components/home.js';
import { feed } from '../src/components/feed.js';
import * as fireBase from '../src/lib/fireBase.js';
import { addRoutes } from '../src/router/index.js';

/* jest.mock('@firebase/auth', () => ({
  createUserWithEmailAndPassword: () => Promise.resolve({ user: { uid: 'user-uid' } }),
  updateProfile: () => ({}),
  getAuth: () => ({ currentUser: { uid: 'user-uid' } }),
  signInWithEmailAndPassword: () => Promise.resolve({ user: { uid: 'user-uid' } }),
  GoogleAuthProvider: class {},
  signInWithPopup: () => Promise.resolve({ user: 'stringGoogle' }),

}));
jest.mock('@firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  getFirestore: () => ({ }),
})); */
/* jest.mock('../src/lib/fireBase.js', () => ({
  createUser: () => Promise.resolve({ user: { uid: 'user-uid' } }),
})); */

// eslint-disable-next-line
fireBase.createUser = jest.fn().mockResolvedValue({ user: { uid: 'user-uid' } });
// eslint-disable-next-line
fireBase.logIn = jest.fn().mockResolvedValue({ user: { uid: 'user-uid' } });
// eslint-disable-next-line
fireBase.logInGoogle = jest.fn().mockResolvedValue({ user: { uid: 'user-uid' } });
// eslint-disable-next-line
fireBase.signOutUser = jest.fn().mockResolvedValue();

describe('función createUser', () => {
  it('debería redirigir a /feed', () => {
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/feed': () => {},
    });
    // PASO 1 : pintar la vista de registro
    const sectionRegister = register(); // onNavigate
    // PASO 2: compeltar el formulario
    sectionRegister.querySelector('#name').value = 'pepita';
    sectionRegister.querySelector('#email').value = 'pepita@test.com';
    sectionRegister.querySelector('#inpDate').value = '13/03/2023';
    sectionRegister.querySelector('#password').value = '123456';
    // PASO 3: eviar formulario
    sectionRegister.querySelector('#formRegister').dispatchEvent(new Event('submit'));
    // PASO 4: confirmar que estamos en /feed
    return Promise.resolve().then(() => {
      expect(window.location.pathname).toBe('/feed');
    });
  });
});

describe('función LogIn', () => {
  it('debería iniciar sesión', () => {
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/feed': () => {},
    });
    const sectionHome = home();
    sectionHome.querySelector('#email').value = 'test@test.com';
    sectionHome.querySelector('#password').value = '123456';

    sectionHome.querySelector('#formLogin').dispatchEvent(new Event('submit'));

    return Promise.resolve().then(() => {
      expect(window.location.pathname).toBe('/feed');
    });
  });
});

describe('función LogIn with Google', () => {
  it('debería inicar sesión con Google', () => {
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/feed': () => {},
    });
    const sectionHome = home();
    sectionHome.querySelector('#btnGoogle').dispatchEvent(new Event('click'));

    return Promise.resolve().then(() => {
      expect(window.location.pathname).toBe('/feed');
    });
  });
});

describe('función signOut', () => {
  it('deberia cerrar sesión', () => {
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/': () => {},
    });
    const sectionFeed = feed();
    sectionFeed.querySelector('#btnLogout').dispatchEvent(new Event('click'));
    return Promise.resolve().then(() => {
      expect(window.location.pathname).toBe('/');
    });
  });
});
