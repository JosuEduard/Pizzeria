import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Categories from './pages/Categories';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route 
          path="/dashboard" 
          element={
            <>
              <Header /> {/* Componente Header */}
              <div className="flex"> {/* Contenedor para Sidebar y Dashboard */}
                <Sidebar /> {/* Componente Sidebar */}
                <Dashboard /> {/* Componente Dashboard */}
              </div>
            </>
          } 
        />
        <Route 
          path="/Categories" 
          element={
            <>
              <Header /> {/* Componente Header */}
              <div className="flex"> {/* Contenedor para Sidebar y Dashboard */}
                <Sidebar /> {/* Componente Sidebar */}
                <Categories /> {/* Componente Dashboard */}
              </div>
            </>
          } 
        />

        {/* Otras rutas comentadas */}
        {/* <Route 
          path="/products" 
          element={
            <>
              <Header />
              <div className="flex">
                <Sidebar />
                <Products />
              </div>
            </>
          } 
        />
        <Route 
          path="/categories" 
          element={
            <>
              <Header />
              <div className="flex">
                <Sidebar />
                <Categories />
              </div>
            </>
          } 
        />
        <Route 
          path="/users" 
          element={
            <>
              <Header />
              <div className="flex">
                <Sidebar />
                <Users />
              </div>
            </>
          } 
        /> */}
      </Routes>
    </Router>
  );
};

export default App;