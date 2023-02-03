import { useContext } from "react";
import { Link } from "react-router-dom"
import { AuthGoogleContext } from "../../contexts/AuthGoogleProvider";

export const Header = () => {
  const { isSignedIn, isLoading, handleGoogleSignOut } = useContext(AuthGoogleContext);

  return (
    <div className="header-container">
      <h2>Frete Fácil</h2>
      {
        isLoading ?
        <span>Loading...</span> :
        isSignedIn ?
        <>
          <Link to="/management">Management</Link>
          <button onClick={() => handleGoogleSignOut()}>Sign Out</button>
        </> :
        <Link to="/login">Login</Link>
      }
    </div>
  )
}