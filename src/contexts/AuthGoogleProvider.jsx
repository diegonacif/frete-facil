import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../services/firebase';
import { collection, getDocs, setDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState({});
  const [userId, setUserId] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const usersCollectionRef = collection(db, "users");

  // function userAlreadyExists() {
  //   if(users.find(data => data.id === userId)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map(doc => doc.id));
    }
    getUsers();
  }, [])

  const [userState, loading, error] = useAuthState(auth);

  onAuthStateChanged(auth, (currentUser) => {
    if (loading) {
      console.log("loading user state")
      setIsLoading(true);
    } else {
      setUser(currentUser);
      setIsSignedIn(!!currentUser);
      setUserId(userState?.uid)
      setIsLoading(false);
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
      // setUserId(result.user.uid)

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
    // setUser(null);
    signOut(auth).then(() => console.log("sign out sucessfully"));
  }

  return (
    <AuthGoogleContext.Provider value={{ 
      handleGoogleSignIn, 
      handleGoogleSignOut,
      isLoading,
      isSignedIn,
      userId,
      signed: !!user, 
      user 
    }}>
      {children}
    </AuthGoogleContext.Provider>
  )
}