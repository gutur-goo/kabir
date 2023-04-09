import logo from './logo.svg';
import React from 'react';
import './App.css';
import HeaderTabs from './components/TopNavigation/HeaderTabs';
import Logo from './assets/images/logo.png';

function App() {
  
  const isMobile = typeof window != 'undefined' ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) : false

  return (
    <React.Fragment>
      <img src={Logo} width={"20%"} />
    <HeaderTabs isMobile={isMobile} />
    </React.Fragment>
  );
}

export default App;
