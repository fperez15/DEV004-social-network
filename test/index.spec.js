// importamos la funcion que vamos a testear
import { register } from '../src/components/register.js';
import * as fireBase from '../src/lib/fireBase.js';
/*
describe('createUser', () => {
  it('debería ser una función', () => {
    expect(typeof createUser).toBe('function');
  });
});
*/

/*jest.mock('@firebase/auth', () => ({
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
}));*/
/*jest.mock('../src/lib/fireBase.js', () => ({
  createUser: () => Promise.resolve({ user: { uid: 'user-uid' } }),
}));*/

fireBase.createUser = jest.fn()// Promise.resolve({ user: { uid: 'user-uid' } }),

describe('funcion createUser', () => {
  it('deberia crear un usuario', () => {

//paso 1 : pintar la vista de registro
const sectionRegister = register(); //onNavigate
//paso 2: compeltar el formulario
sectionRegister.querySelector('#name').value = "pepita"; //document.getElementById('name')
sectionRegister.querySelector('#email').value = "pepita@test.com"; //document.getElementById('name')
sectionRegister.querySelector('#inpDate').value = "13/03/2023"; //document.getElementById('name')
sectionRegister.querySelector('#password').value = "123456"; //document.getElementById('name')
//paso 3: eviar formulaio
sectionRegister.querySelector('#formRegister').dispatchEvent(new Event('submit'));
//paso 4 confirmar que estamoe en /ffed
expect(window.location.pathname).toBe('/feed');

    /*createUser('soulMates@gmail.com', '1234567')
      .then((user) => {
        expect(user).toStrictEqual({ user: { uid: 'user-uid' } });

      });
  });*/

  // it('deberia dar error al no llenar completos los campos', async () =>
  // createUser('', '', '', '').then((userCredential) => {
  //   expect(userCredential).toEqual({ currentUser: 'string' });
  // }));
});
});
