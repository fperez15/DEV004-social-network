// importamos la funcion que vamos a testear
import { register } from '../src/components/register.js';
import * as fireBase from '../src/lib/fireBase.js';
import { addRoutes } from '../src/router/index.js'
/* describe('createUser', () => {
  it('debería ser una función', () => {
    expect(typeof createUser).toBe('function');
  });
}); */

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

fireBase.createUser = jest.fn().mockResolvedValue({ user: { uid: 'user-uid' } })// Promise.resolve({ user: { uid: 'user-uid' } }),

describe('funcion createUser', () => {
  it('deberia crear un usuario', () => {
    document.body.innerHTML =
    "<section id='root'></section>";
    addRoutes({
      '/feed': () => {}
    });
    // PASO 1 : pintar la vista de registro
    const sectionRegister = register(); // onNavigate
    // PASO 2: compeltar el formulario
    sectionRegister.querySelector('#name').value = 'pepita'; // document.getElementById('name')
    sectionRegister.querySelector('#email').value = 'pepita@test.com'; // document.getElementById('name')
    sectionRegister.querySelector('#inpDate').value = '13/03/2023'; // document.getElementById('name')
    sectionRegister.querySelector('#password').value = '123456'; // document.getElementById('name')
    // PASO 3: eviar formulario
    sectionRegister.querySelector('#formRegister').dispatchEvent(new Event('submit'));
    // PASO 4: confirmar que estamos en /feed
    return Promise.resolve().then(() => {
      expect(window.location.pathname).toBe('/feed')
    });

    /* createUser('soulMates@gmail.com', '1234567')
      .then((user) => {
        expect(user).toStrictEqual({ user: { uid: 'user-uid' } });

      });
  }); */

  // it('deberia dar error al no llenar completos los campos', async () =>
  // createUser('', '', '', '').then((userCredential) => {
  //   expect(userCredential).toEqual({ currentUser: 'string' });
  // }));
  });
});
