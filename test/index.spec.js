// importamos la funcion que vamos a testear
import {
  createUser,
  // auth,
  // provider,
  // db,
  // db2,
} from '../src/lib/fireBase.js';

describe('createUser', () => {
  it('debería ser una función', () => {
    expect(typeof createUser).toBe('function');
  });
});

jest.mock('@firebase/auth', () => ({
  createUserWithEmailAndPassword: () => Promise.resolve(
    (user = 'email', 'password', 'displayName', 'date')),
  updateProfile: () => ({}),
  getAuth: () => ({ currentUser: 'string' }),
  signInWithEmailAndPassword: () => Promise.resolve({ user: 'string' }),
  GoogleAuthProvider: class {},
  signInWithPopup: () => Promise.resolve({ user: 'stringGoogle' }),

}));
jest.mock('@firebase/firestore');

describe('function createUser', () => {
  it('deberia crear un usuario', async () => {
    const userCredential = createUser(
      'prueba@hotmail.com',
      '123456',
      'prueba',
      '2000-10-15',
    );
    await expect(userCredential).resolves.toEqual({ currentUser: 'string' });
  });

  it('deberia dar error al no llenar completos los campos', async () => createUser('', '', '', '').then((userCredential) => {
    expect(userCredential).toEqual({ currentUser: 'string' });
  }));
});
