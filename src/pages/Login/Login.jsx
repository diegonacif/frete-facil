import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/AuthGoogleProvider";
import "../../css/App.css";

export const Login = () => {
  const { handleGoogleSignIn, signed, user } = useContext(AuthGoogleContext);

  async function loginGoogle() {
    await handleGoogleSignIn();
  }

  return (
    <div className="login-container">
      <span>Cadastre-se com sua conta Google</span>
      <button onClick={() => loginGoogle()}>Google</button>
    </div>
  )
}