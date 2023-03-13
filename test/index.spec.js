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
}));
jest.mock('../src/lib/fireBase.js', () => ({
  createUser: () => Promise.resolve({ user: { uid: 'user-uid' } }),
}));
describe('funcion createUser', () => {
  it('deberia crear un usuario', () => {
    createUser('soulMates@gmail.com', '1234567')
      .then((user) => {
        expect(user).toStrictEqual({ user: { uid: 'user-uid' } });
      });
  });

  // it('deberia dar error al no llenar completos los campos', async () =>
  // createUser('', '', '', '').then((userCredential) => {
  //   expect(userCredential).toEqual({ currentUser: 'string' });
  // }));
});
