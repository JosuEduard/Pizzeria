import React, { useState } from 'react';
import Header from './components/Header'; 
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard'; // Importamos el Dashboard
import './index.css'; // Agregamos también estilos generales si los necesitas
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Cambiamos el estado
  };

  return (
    <div className="App">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <div className="main-content">
      <Dashboard /> {/* Mostramos el Dashboard */}
      </div>
    </div>
  );
}

export default App;
