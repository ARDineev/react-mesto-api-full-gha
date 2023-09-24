import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function Header({ userEmail, handleLogOut }) {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [isBurgerClicked, setIsBurgerClicked] = React.useState(false);

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  function handleBurgerOpenClick() {
    setIsBurgerClicked(true)
  }

  function handleBurgerCloseClick() {
    setIsBurgerClicked(false)
  }

  return (
    <header className="header">
      <Routes>
        <Route exact path="/" element={
          <>
            {isBurgerClicked && windowWidth < 550 &&
              <div className="header__mob-menu-container">
                <p className="header__email-caption">{userEmail}</p>
                <Link to="/sign-in" className="header__link header__link_type_exit" onClick={handleLogOut}>Выйти</Link>
              </div>
            }
          </>
        } />
        <Route path="*" element={<></>} />
      </Routes>
      <div className="header__container">
        <div className="header__logo"></div>
        <div className="header__link-container">
          <Routes>
            <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />
            <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
            <Route exact path="/" element={
              <>
                {windowWidth > 550 ?
                  <>
                    <p className="header__email-caption">{userEmail}</p>
                    <Link to="/sign-in" className="header__link header__link_type_exit" onClick={handleLogOut}>Выйти</Link>
                  </> :
                  isBurgerClicked ?
                    <div className="header__close-btn" onClick={handleBurgerCloseClick}></div> :
                    <div className="header__burger-btn" onClick={handleBurgerOpenClick}>
                      <div className="header__burger-line"></div>
                      <div className="header__burger-line"></div>
                      <div className="header__burger-line"></div>
                    </div>
                }
              </>
            } />
          </Routes>
        </div>
      </div>
    </header>
  )
}

export default Header;