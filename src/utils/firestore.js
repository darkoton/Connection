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
  or,
  onSnapshot,
  writeBatch,
} from 'firebase/firestore';
import app from './firebase';

const db = getFirestore(app);

const getWheres = (wheres = []) => {
  if (!wheres) {
    return [];
  }

  return wheres.map(w => {
    return where(...w);
  });
};

const getOrs = (ors = []) => {
  if (!ors) {
    return [];
  }

  const result = ors.map(o => {
    return or(...getWheres(o.wheres), ...getOrs(o.ors));
  });
  return result;
};

const getOther = other => {
  if (!other) {
    return [];
  }
  return other;
};

const getQuery = (path, queries) => {
  let constraints = [];

  if (queries) {
    constraints.push(
      ...getWheres(queries.wheres),
      ...getOrs(queries.ors),
      ...getOther(queries.other),
    );
  }

  if (!path.length % 2) {
    return query(doc(db, ...path), ...constraints);
  }
  return query(collection(db, ...path), ...constraints);
};

export async function setData(path, body) {
  try {
    await setDoc(doc(db, ...path), body);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function addData(path, body) {
  try {
    const docRef = await addDoc(collection(db, ...path), body);
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function getDatas(path, queries, options = {}) {
  try {
    const q = getQuery(path, queries);
    const querySnapshot = await getDocs(q);

    const result = {};
    if (options.getDoc) {
      result.data = querySnapshot.docs;
    } else {
      if (options.id) {
        result.data = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
      } else {
        result.data = querySnapshot.docs.map(doc => {
          return doc.data();
        });
      }
    }

    if (options.last) {
      result.last = querySnapshot.docs[querySnapshot.docs.length - 1];
    }

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

export async function updateData(path, updateBody, queries) {
  if (queries) {
    const batch = writeBatch(db);

    const { data } = await getDatas(path, queries, { getDoc: true });
    data.forEach(async data => {
      batch.update(data.ref, updateBody);
    });

    await batch.commit();

    return {
      type: 'success',
      message: 'Update is complete',
    };
  } else {
    await updateDoc(doc(db, ...path), updateBody);
    return await getData(path);
  }
}

export function watchData(path, callback, queries) {
  let reqQuery = getQuery(path, queries);

  return onSnapshot(reqQuery, snapshot => {
    callback(snapshot);
  });
}
