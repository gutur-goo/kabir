import logo from './logo.svg';
import React from 'react';
import './App.css';
import HeaderTabs from './components/TopNavigation/HeaderTabs';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Logo from './assets/images/logo.png';
import InvoiceTemplate from './components/Template/InvoiceTemplate/InvoiceTemplate';
import SignIn from './components/Screens/LoginScreen/LoginScreen';
import { sha256 } from 'js-sha256';

function App() {
  
  const hashedPass = sha256('kabiradmin2233_kabirtransportllc11625'+new Date().getDate() + new Date().getMonth());
  const isMobile = typeof window != 'undefined' ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) : false

  return (
    <React.Fragment>
    <BrowserRouter>
      {/*switch used to render only the first
    route that matches the location rather
    than rendering all matching routes. */}
      <Routes>
        {/* <Route exact path='/' element={<React.Fragment><img src={Logo} width={"20%"} /><HeaderTabs isMobile={isMobile} /></React.Fragment>}></Route> */}
        <Route exact path='/' element={window.sessionStorage.getItem('login_token') == hashedPass ? <React.Fragment><img src={Logo} width={"20%"} /><HeaderTabs isMobile={isMobile} /></React.Fragment> :  <SignIn />}></Route>
        <Route exact path='/invoice' element={<InvoiceTemplate />}></Route>
      </Routes>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
