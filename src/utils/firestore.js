import {
  getFirestore,
  collection,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import app from './firebase.js';

const db = getFirestore(app);

const getWheres = wheres => wheres.map(w => where(...w));

export async function setData(collectionName, id, body) {
  try {
    await setDoc(doc(db, collectionName, id), body);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function addData(collectionName, body) {
  try {
    const docRef = await addDoc(collection(db, collectionName), body);
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function getDatas(path, wheres, options = {}) {
  try {
    const wheresList = getWheres(wheres);
    const q = query(collection(db, ...path), ...wheresList);
    const querySnapshot = await getDocs(q);
    if (options.getDoc) {
      return querySnapshot.docs;
    }

    const result = querySnapshot.docs.map(doc => {
      return doc.data();
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getData(path, options = {}) {
  const querySnapshot = await getDoc(doc(db, ...path));

  if (options.getDoc) {
    return querySnapshot.docs;
  }
  // querySnapshot.forEach(doc => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  // });

  return querySnapshot.data();
}

export async function updateData(path, updateBody, wheres) {
  if (wheres) {
    const datas = await getDatas(path, wheres, { getDoc: true });
    datas.forEach(async data => {
      await updateDoc(data.ref, updateBody);
    });

    return {
      type: 'success',
      message: 'Update is complete',
    };
  } else {
    await updateDoc(doc(db, ...path), updateBody);
    return await getData(path);
  }
}
