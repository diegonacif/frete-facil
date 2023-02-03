import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CardsContainer } from './components/CardsContainer/CardsContainer';
import { Header } from './components/Header/Header';
import { AuthGoogleContext } from './contexts/AuthGoogleProvider';
import './css/App.css';

export const App = () => {

  const { handleGoogleSignOut } = useContext(AuthGoogleContext);

  return (
    <>
      <Header />
      <CardsContainer />
    </>
  )
}
