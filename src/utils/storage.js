import app from './firebase';
import {
  getStorage,
  uploadBytes,
  ref,
  deleteObject,
  getDownloadURL,
} from 'firebase/storage';
import useUserStore from '@/stores/user.js';

const storage = getStorage(app);

export async function uploadFile(path, files) {
  const { user } = useUserStore.getState();
  try {
    const promises = files.map(async file => {
      return new Promise(res => {
        const fileRef = ref(
          storage,
          [...path, file.name + '-' + user.uid].join('/'),
        );
        uploadBytes(fileRef, file).then(snapshot => {
          getDownloadURL(snapshot.ref).then(url => {
            res(url);
          });
        });
      });
    });

    return Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteFile(path) {
  try {
    const fileRef = ref(storage, path.join('/'));
    await deleteObject(fileRef);
  } catch (error) {
    return { type: 'error', error: error };
  }
}
