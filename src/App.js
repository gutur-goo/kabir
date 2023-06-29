import logo from './logo.svg';
import React from 'react';
import './App.css';
import HeaderTabs from './components/TopNavigation/HeaderTabs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Logo from './assets/images/satSahib.jpeg';
import InvoiceTemplate from './components/Template/InvoiceTemplate/InvoiceTemplate';
import SignIn from './components/Screens/LoginScreen/LoginScreen';
import { sha256 } from 'js-sha256';
import PaymentReceiptTemplate from './components/Template/PaymentReceiptTemplate/PaymentRecieptTemplate';
import SupportingListTemplate from './components/Template/SupportingList/SupportingList';
import OutstandingTemplate from './components/Template/OutstandingTemplate/OutstandingTemplate';
import Helmet from './components/Helmet/Helmet';
import Disabled from './components/Disabled/Disabled';

function App() {

  const hashedPassAdmin = sha256('kabiradmin_kabiradmin'+new Date().getDate() + new Date().getMonth());
  const hashedPassNormal = sha256('kabir_kabir'+new Date().getDate() + new Date().getMonth());
  const isMobile = typeof window != 'undefined' ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) : false
  const login_token = window.sessionStorage.getItem('login_token') || '';
  const loggedState = login_token === hashedPassAdmin ? 'admin' : login_token === hashedPassNormal ? 'normal' : 'loggedOut';
  const isAdmin = loggedState === 'admin';

  

  return (
    <React.Fragment>
    <Helmet />
    <BrowserRouter>
      {/*switch used to render only the first
    route that matches the location rather
    than rendering all matching routes. */}
      <Routes>
        {/* <Route exact path='/' element={<React.Fragment><img src={Logo} width={"20%"} /><HeaderTabs isMobile={isMobile} /></React.Fragment>}></Route> */}
        {/* <Route exact path='/' element={loggedState != 'loggedOut' ? <div style={{backgroundColor:'rgb(255,227,148)',overflowX:isMobile ?'hidden' : null}}><img src={Logo} style={{marginLeft:isMobile ? '30%' : '43%',borderRadius:'70%'}} width={isMobile ? "30%" : "10%"} /><HeaderTabs isMobile={isMobile} isAdmin={isAdmin} /></div> :  <SignIn hashedPassAdmin={hashedPassAdmin} isMobile={isMobile} hashedPassNormal={hashedPassNormal} />}></Route> */}
        <Route exact path='/' element={<Disabled />}></Route>
        <Route exact path='/invoice' element={<InvoiceTemplate />}></Route>
        <Route exact path='/paymentrc' element={<PaymentReceiptTemplate />}></Route>
        <Route exact path='/supporting' element={<SupportingListTemplate />}></Route>
        <Route exact path='/outstanding' element={<OutstandingTemplate />}></Route>
      </Routes>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
