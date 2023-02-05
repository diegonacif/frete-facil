import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { AuthGoogleContext } from "../../contexts/AuthGoogleProvider";

import { useOnClickOutside } from 'usehooks-ts' // Outside Click (Hook)
import { useTransition, animated } from '@react-spring/web'; // Conditional Rendering Transition Lib
import { Twirl as Hamburguer } from 'hamburger-react'; // Hamburguer Menu Button with Animation

export const Header = () => {
  const { isSignedIn, isLoading, handleGoogleSignOut, user } = useContext(AuthGoogleContext);

  // Is Menu Open
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  // Outside Click (Variable)
  const refContainer = useRef(null);

  const handleClickOutside = () => {
    setIsMenuOpen(false);
  }

  useOnClickOutside(refContainer, handleClickOutside)

  // Modal Animation
  const transitions = useTransition(isMenuOpen, {
    from: { x: 10, y: -10, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 10, y: -10, opacity: 0 },
    config: {duration: 200},
  });

  return (
    <div className="header-container">
      <Link to="/" id="main-title">Frete Fácil</Link>
      {
        isLoading ?
        <span>Loading...</span> :
        isSignedIn ?
        <div className="header-wrapper" ref={refContainer}>
          <span>Olá, {user.displayName ? user.displayName : freteiro} !</span>
          <Hamburguer 
            toggled={isMenuOpen} 
            toggle={handleMenuOpen}
            size={30}
            duration={0.3}
            rounded
            label="abrir menu"
          />
          {/* <Link to="/management">Management</Link> */}
          {/* <button onClick={() => handleGoogleSignOut()}>Sign Out</button> */}
          {
            transitions(
              (styles, item) => item &&
                <animated.div className="menu-modal" style={styles} >
                  <div className="menu-item">
                    <Link to="/management">Meu anúncio</Link>
                  </div>
                  <div className="menu-item">
                    <span onClick={() => handleGoogleSignOut()}>Deslogar</span>
                  </div>
                </animated.div>
            )
          }
        </div> :
        <Link to="/login">Sou Freteiro</Link>
      }
    </div>
  )
}