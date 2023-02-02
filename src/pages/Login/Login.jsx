import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthGoogleContext } from "../../contexts/AuthGoogleProvider";
import "../../css/App.css";

export const Login = () => {
  const { 
    handleGoogleSignIn, 
    handleGoogleSignOut, 
    isSignedIn,
    signed, 
    user 
  } = useContext(AuthGoogleContext);

  const navigate = useNavigate();

  // Back to main page when logged in
  useEffect(() => {
    isSignedIn ? navigate("/") : null;
  }, [isSignedIn])

  async function loginGoogle() {
    await handleGoogleSignIn();
  }

  async function logoutGoogle() {
    await handleGoogleSignOut();
  }

  return (
    <div className="login-container">
      <span>Cadastre-se com sua conta Google</span>
      <button onClick={() => loginGoogle()}>Google</button>
      <button onClick={() => logoutGoogle()}>Logout</button>
    </div>
  )
}