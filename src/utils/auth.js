import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOutFire,
} from 'firebase/auth';
import { setData, getData, getDatas } from './firestore.js';
import app from './firebase.js';
import useUserStore from '../stores/user.js';

const auth = getAuth(app);
auth.useDeviceLanguage();

const provider = new GoogleAuthProvider();

const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const validatePassword = password => {
  return String(password).trim().length >= 6;
};

const validateConfirmPassword = (password, confirmPassword) => {
  return password == confirmPassword;
};

const validate = (email, password) => {
  let result = {
    success: true,
    type: 'success',
    errors: {},
  };
  if (!validateEmail(email)) {
    result.success = false;
    result.type = 'error';
    result.errors.email = {
      message: 'Email is not valid',
    };
  }

  if (!validatePassword(password)) {
    result.success = false;
    result.type = 'error';
    result.errors.password = {
      message: 'Password must be at least 6 characters',
    };
  }
  return result;
};

const createTag = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';

  const generate = async () => {
    result = '#';
    for (let index = 0; index < 6; index++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    if ((await getDatas(['users'], [['tag', '==', result]])).docs.length) {
      generate();
    }
  };

  generate();
  return result;
};

const createUser = info => {
  return setData('users', info.uid, {
    displayName: info.displayName,
    email: info.email,
    phoneNumber: info.phoneNumber,
    photoURL: info.photoURL,
    chats: [],
    tag: createTag(),
    uid: info.uid,
  });
};

const saveUser = user => {
  const setUser = useUserStore.getState().setUser;
  setUser(user);
};

export async function signUp({ email, password, confirmPassword }, action) {
  const status = validate(email, password);

  if (!validateConfirmPassword(password, confirmPassword)) {
    status.success = false;
    status.type = 'error';
    status.errors.confirmPassword = {
      message: 'Сonfirmation password is incorrect',
    };
  }
  if (status.type == 'error') {
    return status;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    user.displayName = user.email.split('@')[0];
    await createUser(user);
    action();
  } catch (error) {
    console.error(error);
  }
}

export async function signIn({ email, password }, action) {
  const status = validate(email, password);

  if (status.type == 'error') {
    return status;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    action();
  } catch (error) {
    console.error(error);
  }
}

export async function signOut() {
  try {
    await signOutFire(auth);
    console.log('sign out');
  } catch (error) {
    console.error(error);
  }
}

export async function googleAuth(action) {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    let userInfo = await getData(['users', user.uid]);
    // if sign up
    if (!userInfo) {
      createUser(user);
      saveUser(user);
    } else {
      saveUser(userInfo);
    }

    action();
  } catch (error) {
    console.error(error);
  }
}

// Watch auth
onAuthStateChanged(auth, async user => {
  try {
    if (user) {
      const userInfo = await getData(['users', user.uid]);

      if (userInfo) {
        saveUser(userInfo);
      } else {
        return;
      }
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
  }
});
