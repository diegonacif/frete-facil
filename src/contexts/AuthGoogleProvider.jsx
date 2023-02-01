import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth, db } from '../services/firebase';
import { collection, getDocs, setDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

import { onAuthStateChanged } from "firebase/auth";


const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState({});
  const [userId, setUserId] = useState("");
  const usersCollectionRef = collection(db, "users");

  console.log(users)
  // console.log(typeof userId)
  // console.log({"usuário 2": users[2], "userId": userId})

  function userAlreadyExists() {
    if(users.find(data => data.id === userId)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map(doc => doc.id));
    }
    getUsers();
  }, [])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user.uid)
      setUserId(user.uid)
      // userAlreadyExists();
    } else {
      console.log(`${user} is sign out`)
    }
  })

  // User Data
  // useEffect(() => {
  //   if(user === {}) {
  //     return;
  //   } else {
  //     const getUsers = async () => {
  //       const data = await getDocs(usersCollectionRef);
  //       setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     }
  //     getUsers();
  //   }
  // }, [])

  useEffect(() => {
    const loadStoreAuth = () => {
      const sessionToken = sessionStorage.getItem("@AuthFirebase:token")
      const sessionUser = sessionStorage.getItem("@AuthFirebase:user")

      if (sessionToken && sessionUser) {
        setUser(sessionUser);
      }
    };
    loadStoreAuth();
  })
  
  async function handleGoogleSignIn() {

    await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setUserId(result.user.uid)

      // const docRef = doc(db, "users", result.user.uid);

      // setDoc(docRef, {});

      // setUser(user);
      // sessionStorage.setItem("@AuthFirebase:token", token);
      // sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  function handleGoogleSignOut() {
    sessionStorage.clear();
    setUser(null);
    signOut(auth).then(() => console.log("sign out sucessfully"));
  }

  return (
    <AuthGoogleContext.Provider value={{ handleGoogleSignIn, handleGoogleSignOut, signed: !!user, user }}>
      {children}
    </AuthGoogleContext.Provider>
  )
}