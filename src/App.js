import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { useTranslation } from 'react-i18next';
import './i18n'; // import i18n
import Login from './components/Login';
import Home from './components/Home';
import Member from './pages/Member';
import Dept from './pages/Dept';
import Material from './pages/Material';
import Inventory from './pages/Inventory';
import Catalog from './pages/Catalog';
import AppNavbar from './components/Navbar';

function App() {
  const { i18n } = useTranslation();
  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // };
  const location = useLocation();
  return (
    <UserProvider>
      {location.pathname !== '/' && <AppNavbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/member" element={<Member />} />
        <Route path="/dept" element={<Dept />} />
        <Route path="/material" element={<Material />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </UserProvider>

  );
}

export default App;