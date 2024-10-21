import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Categories from './pages/Categories';
import Dashboard from './pages/Dashboard';
import Product from './pages/Product';
import Bills from './pages/Bills';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const Layout = ({ children }) => (
  <div className="app-container">
    <Header />
    <div className="content-container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/categories" element={<Layout><Categories /></Layout>} />
        <Route path="/product" element={<Layout><Product /></Layout>} />
        <Route path="/bills" element={<Layout><Bills /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;