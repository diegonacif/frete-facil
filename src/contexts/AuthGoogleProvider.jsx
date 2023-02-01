import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../services/firebase';

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
  
  function handleGoogleSignIn() {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setUser(user);
      sessionStorage.setItem("@AuthFirebase:token", token);
      sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
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