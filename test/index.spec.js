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
  createUserWithEmailAndPassword: () => Promise.resolve({ currentUser: 'string' }),
  getAuth: () => ({ currentUser: 'string' }),

}));
jest.mock('../src/lib/fireBase.js');

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
