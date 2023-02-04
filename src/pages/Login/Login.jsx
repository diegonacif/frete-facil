import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthGoogleContext } from "../../contexts/AuthGoogleProvider";
import { AiFillGoogleCircle, AiFillCloseCircle } from 'react-icons/ai';
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
      <header>
        <h2>Área do Freteiro</h2>
        <Link to="/">
          <AiFillCloseCircle size="2rem" />
        </Link>
      </header>
      <div className="login-main">
        <h3>Faça login com sua conta Google</h3>
        <div className="login-button" onClick={() => loginGoogle()}>
          <AiFillGoogleCircle size="1.5rem"/>
          <span>Continuar com Google</span>
        </div>
      </div>
    </div>
  )
}