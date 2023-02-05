import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAp_ppFJ0N7fgTkFdJ64NOzrZOvlPi_PBg",
  authDomain: "frete-facil-58779.firebaseapp.com",
  projectId: "frete-facil-58779",
  storageBucket: "frete-facil-58779.appspot.com",
  messagingSenderId: "267638125542",
  appId: "1:267638125542:web:f343e569ea7903ff7c5c27"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);