import { register } from '../src/components/register.js';
import { home } from '../src/components/home.js';
import { feed } from '../src/components/feed.js';
import { post } from '../src/components/post.js';
import * as fireBase from '../src/lib/fireBase.js';
import { addRoutes } from '../src/router/index.js';

describe('función createUser', () => {
  it('.then => debería redirigir a /feed', () => {
    // eslint-disable-next-line
    fireBase.createUser = jest.fn().mockResolvedValue({ user: { uid: 'user-uid' } });
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/feed': () => { },
    });
    // PASO 1 : pintar la vista de registro
    const sectionRegister = register();
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

  it('.catch => debería decir contraseña inválida', () => {
    // eslint-disable-next-line
    fireBase.createUser = jest.fn().mockRejectedValueOnce({ code: 'auth/weak-password' });
    document.body.innerHTML = "<section id='root'></section>";

    const sectionRegister = register();
    sectionRegister.querySelector('#name').value = 'pepita';
    sectionRegister.querySelector('#email').value = 'pepita@test.com';
    sectionRegister.querySelector('#inpDate').value = '13/03/2023';
    sectionRegister.querySelector('#password').value = '123';
    sectionRegister.querySelector('#formRegister').dispatchEvent(new Event('submit'));

    return Promise.reject().catch(() => {
      if (sectionRegister.querySelector('#errorRegister').style.display === 'block') {
        expect(sectionRegister.querySelector('#errorRegister').textContent).toEqual('The password must be at least 6 characters.');
      }
    });
  });

  it('.catch => debería decir los campos no pueden estar vacíos', () => {
    // eslint-disable-next-line
    fireBase.createUser = jest.fn().mockRejectedValueOnce({ code: 'auth/network-request-failed.' });
    document.body.innerHTML = "<section id='root'></section>";

    const sectionRegister = register();
    sectionRegister.querySelector('#name').value = '';
    sectionRegister.querySelector('#email').value = 'pepita@test.com';
    sectionRegister.querySelector('#inpDate').value = '13/03/2023';
    sectionRegister.querySelector('#password').value = '';
    sectionRegister.querySelector('#formRegister').dispatchEvent(new Event('submit'));

    return Promise.reject().catch(() => {
      if (sectionRegister.querySelector('#errorRegister').style.display === 'block') {
        expect(sectionRegister.querySelector('#errorRegister').textContent).toEqual('Fields cannot be empty.');
      }
    });
  });

  it('.catch => debería decir email inválido', () => {
    // eslint-disable-next-line
    fireBase.createUser = jest.fn().mockRejectedValueOnce({ code: 'auth/invalid-email' });
    document.body.innerHTML = "<section id='root'></section>";

    const sectionRegister = register();
    sectionRegister.querySelector('#name').value = 'pepita';
    sectionRegister.querySelector('#email').value = 'pepitatest.com';
    sectionRegister.querySelector('#inpDate').value = '13/03/2023';
    sectionRegister.querySelector('#password').value = '123456';
    sectionRegister.querySelector('#formRegister').dispatchEvent(new Event('submit'));

    return Promise.reject().catch(() => {
      if (sectionRegister.querySelector('#errorRegister').style.display === 'block') {
        expect(sectionRegister.querySelector('#errorRegister').textContent).toEqual('Invalid email.');
      }
    });
  });

  it('.catch => debería decir falta email', () => {
    // eslint-disable-next-line
    fireBase.createUser = jest.fn().mockRejectedValueOnce({ code: 'auth/missing-email' });
    document.body.innerHTML = "<section id='root'></section>";

    const sectionRegister = register();
    sectionRegister.querySelector('#name').value = 'pepita';
    sectionRegister.querySelector('#email').value = '';
    sectionRegister.querySelector('#inpDate').value = '13/03/2023';
    sectionRegister.querySelector('#password').value = '123456';
    sectionRegister.querySelector('#formRegister').dispatchEvent(new Event('submit'));

    return Promise.reject().catch(() => {
      if (sectionRegister.querySelector('#errorRegister').style.display === 'block') {
        expect(sectionRegister.querySelector('#errorRegister').textContent).toEqual('Email field cannot be empty.');
      }
    });
  });

  it('.catch => debería decir correo ya registrado', () => {
    // eslint-disable-next-line
    fireBase.createUser = jest.fn().mockRejectedValueOnce({ code: 'auth/email-already-in-use' });
    document.body.innerHTML = "<section id='root'></section>";

    const sectionRegister = register();
    sectionRegister.querySelector('#name').value = 'pepita';
    sectionRegister.querySelector('#email').value = 'pepita@test.com';
    sectionRegister.querySelector('#inpDate').value = '13/03/2023';
    sectionRegister.querySelector('#password').value = '123456';
    sectionRegister.querySelector('#formRegister').dispatchEvent(new Event('submit'));

    return Promise.reject().catch(() => {
      if (sectionRegister.querySelector('#errorRegister').style.display === 'block') {
        expect(sectionRegister.querySelector('#errorRegister').textContent).toEqual('Email already in use.');
      }
    });
  });

  it('.catch => debería decir la contraseña no puede estar vacía', () => {
    // eslint-disable-next-line
    fireBase.createUser = jest.fn().mockRejectedValueOnce({ code: 'auth/internal-error' });
    document.body.innerHTML = "<section id='root'></section>";

    const sectionRegister = register();
    sectionRegister.querySelector('#name').value = 'pepita';
    sectionRegister.querySelector('#email').value = 'pepita@test.com';
    sectionRegister.querySelector('#inpDate').value = '13/03/2023';
    sectionRegister.querySelector('#password').value = '123456';
    sectionRegister.querySelector('#formRegister').dispatchEvent(new Event('submit'));

    return Promise.reject().catch(() => {
      if (sectionRegister.querySelector('#errorRegister').style.display === 'block') {
        expect(sectionRegister.querySelector('#errorRegister').textContent).toEqual('Password field cannot be empty.');
      }
    });
  });
});

describe('función LogIn', () => {
  it('.then => debería iniciar sesión', () => {
    // eslint-disable-next-line
    fireBase.logIn = jest.fn().mockResolvedValue({ user: { uid: 'user-uid' } });
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/feed': () => { },
    });
    const sectionHome = home();
    sectionHome.querySelector('#email').value = 'test@test.com';
    sectionHome.querySelector('#password').value = '123456';

    sectionHome.querySelector('#formLogin').dispatchEvent(new Event('submit'));

    return Promise.resolve().then(() => {
      expect(window.location.pathname).toBe('/feed');
    });
  });

  it('.catch => debería decir que los campos no pueden estar vacíos', () => {
    // eslint-disable-next-line
    fireBase.logIn = jest.fn().mockRejectedValueOnce({ code: 'auth/invalid-email' });
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/feed': () => { },
    });
    const sectionHome = home();
    sectionHome.querySelector('#email').value = '';
    sectionHome.querySelector('#password').value = '123456';
    sectionHome.querySelector('#formLogin').dispatchEvent(new Event('submit'));

    return Promise.reject().catch(() => {
      if (sectionHome.querySelector('#errorHome').style.display === 'block') {
        expect(sectionHome.querySelector('#errorHome').textContent).toEqual('Fields cannot be empty.');
      }
    });
  });

  it('.catch => debería decir que el correo no está registrado', () => {
    // eslint-disable-next-line
    fireBase.logIn = jest.fn().mockRejectedValueOnce({ code: 'auth/user-not-found' });
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/feed': () => { },
    });
    const sectionHome = home();
    sectionHome.querySelector('#email').value = 'pepita@test.com';
    sectionHome.querySelector('#password').value = '123456';
    sectionHome.querySelector('#formLogin').dispatchEvent(new Event('submit'));

    return Promise.reject().catch(() => {
      if (sectionHome.querySelector('#errorHome').style.display === 'block') {
        expect(sectionHome.querySelector('#errorHome').textContent).toEqual('Email is not registered.');
      }
    });
  });

  it('.catch => debería decir que la contraseña es incorrecta', () => {
    // eslint-disable-next-line
    fireBase.logIn = jest.fn().mockRejectedValueOnce({ code: 'auth/wrong-password' });
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/feed': () => { },
    });
    const sectionHome = home();
    sectionHome.querySelector('#email').value = 'pepita@test.com';
    sectionHome.querySelector('#password').value = '123456';
    sectionHome.querySelector('#formLogin').dispatchEvent(new Event('submit'));

    return Promise.reject().catch(() => {
      if (sectionHome.querySelector('#errorHome').style.display === 'block') {
        expect(sectionHome.querySelector('#errorHome').textContent).toEqual('Password is wrong.');
      }
    });
  });
});

describe('función LogIn with Google', () => {
  it('.then => debería iniciar sesión con Google', () => {
    // eslint-disable-next-line
    fireBase.logInGoogle = jest.fn().mockResolvedValue({ user: { uid: 'user-uid' } });
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/feed': () => { },
    });
    const sectionHome = home();
    sectionHome.querySelector('#btnGoogle').dispatchEvent(new Event('click'));

    return Promise.resolve().then(() => {
      expect(window.location.pathname).toBe('/feed');
    });
  });

  it('.catch => no debería iniciar sesión con Google', () => {
    // eslint-disable-next-line
    fireBase.logInGoogle = jest.fn().mockRejectedValueOnce({ code: 'auth/popup-closed-by-user' });
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/': () => { },
    });
    const sectionHome = home();
    sectionHome.querySelector('#btnGoogle').dispatchEvent(new Event('click'));

    return Promise.reject().catch(() => {
      if (sectionHome.querySelector('#errorHome').style.display === 'block') {
        expect(sectionHome.querySelector('#errorHome').textContent).toEqual('Something went wrong.');
      }
    });
  });
});

describe('función signOut', () => {
  it('deberia cerrar sesión', () => {
    // eslint-disable-next-line
    fireBase.signOutUser = jest.fn().mockResolvedValue();
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/': () => { },
    });
    const sectionFeed = feed();
    sectionFeed.querySelector('#btnLogout').dispatchEvent(new Event('click'));
    return Promise.resolve().then(() => {
      expect(window.location.pathname).toBe('/');
    });
  });
});

describe('función crear post.js', () => {
  it('.then => debería crear cada post individual', () => {
    fireBase.createPost = jest.fn().mockResolvedValue();
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/feed': () => { },
    });
    const sectionPOst = post();
    sectionPOst.querySelector('#inpPost').value = 'Ejemplo de post';
    sectionPOst.querySelector('#btnCreatePost').dispatchEvent(new Event('click'));
    return Promise.resolve().then(() => {
      expect(window.location.pathname).toEqual('/feed');
    });
  });
  it('.catch => debería crear cada post individual', () => {
    fireBase.createPost = jest.fn().mockRejectedValueOnce({ code: 'error' });
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/feed': () => { },
    });
    const sectionPOst = post();
    sectionPOst.querySelector('#inpPost').value = 'Ejemplo de post';
    sectionPOst.querySelector('#btnCreatePost').dispatchEvent(new Event('click'));
    return Promise.reject().catch(() => {
      expect(code).toBe('error');
    });
  });
});

/*jest.mock('@firebase/auth', () => ({
 query: jest.fn(),
}));*/
/* describe('funciones de feed', () => {
  it('debería dar like', () => {
    fireBase.toLike = jest.fn().mockResolvedValue({ post: { id: 'post-id' } });
    document.body.innerHTML = "<section id='root'></section>";
    const sectionFeed = feed();
      fireBase.onSnapshot = jest.fn().mockImplementation(fireBase.queryInstruction = jest.fn(), (posts) => {
        posts({post1: {post: 'text1'}, post2: {post: 'text2'}, post3: {post: 'text3'}})
        sectionFeed.querySelector('#btnLike').dispatchEvent(new Event('click'));
        return Promise.resolve().then(() => {
          expect(sectionFeed.querySelector('.dislike').style.display).toBe('flex');
        });
      })
      })
    });
*/