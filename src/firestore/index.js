import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore/lite';

//Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addToDb(o) {
  const demo = collection(db, 'demo');
  await addDoc(demo, o);
}


async function getDataInDb(o) {
  const demo = collection(db, 'demo');
  const q = query(demo, where("url", "==", o.value));
  const demoSnapshot = await getDocs(q);
  const demoList = demoSnapshot.docs.map(doc => doc.data());
  return demoList;

}

export default { addToDb, getDataInDb }