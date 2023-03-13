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

describe('fuencion createUser', () => {
  it('deberia crear un usuario', async () => {
    const userCredential = await createUser();
    expect(userCredential).toBe({ user: { uid: 'user-uid' } });
  });

  // it('deberia dar error al no llenar completos los campos', async () =>
  // createUser('', '', '', '').then((userCredential) => {
  //   expect(userCredential).toEqual({ currentUser: 'string' });
  // }));
});
