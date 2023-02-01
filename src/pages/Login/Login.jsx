import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/AuthGoogleProvider";
import "../../css/App.css";

export const Login = () => {
  const { handleGoogleSignIn, handleGoogleSignOut, signed, user } = useContext(AuthGoogleContext);

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