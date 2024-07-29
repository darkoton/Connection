import { getDatabase, ref, onValue, set, push, query } from 'firebase/database';
import app from './firebase';
const db = getDatabase(app);

export function writeData(path, body) {
  set(ref(db, path.join('/')), body);
}

export function pushData(path, body) {
  const refData = ref(db, path.join('/'));

  const newRefData = push(refData);
  set(newRefData, body);
}

export function watchData(path, callback, queries = []) {
  const dataQuery = query(ref(db, path.join('/')), ...queries);
  return onValue(dataQuery, snapshot => {
    const data = snapshot.val();
    callback(data);
  });
}
