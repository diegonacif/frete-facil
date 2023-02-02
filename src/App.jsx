import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthGoogleContext } from './contexts/AuthGoogleProvider';
import './css/App.css';

export const App = () => {

  const { handleGoogleSignOut } = useContext(AuthGoogleContext);

  return (
    <>
      <h1>Hello App</h1>
      <Link to="/login">Login</Link>
      <Link to="/management">Management</Link>
      <button onClick={() => handleGoogleSignOut()}>Sign Out</button>
    </>
  )
}
