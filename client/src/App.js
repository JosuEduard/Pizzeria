// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js'; // Asegúrate de incluir la extensión .js
import Login from './components/Login.js'; // Asegúrate de incluir la extensión .js
import Signup from './components/Signup.js'; // Asegúrate de incluir la extensión .js
import Home from './components/Home.js'; // Asegúrate de incluir la extensión .js

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
