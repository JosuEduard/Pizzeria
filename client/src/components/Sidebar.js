import React from 'react';
import '../styles/sidebar.css'; // Asegúrate de crear este archivo CSS
// Importamos las imágenes directamente
import { IconArticleFilled, IconCategoryFilled, IconLayoutDashboard, IconReceiptFilled, IconShoppingCart } from '@tabler/icons-react';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { name: 'Dashboard', iconPlaceholder: <IconLayoutDashboard stroke={2} />},
    { name: 'Manejar Categorías', iconPlaceholder: <IconCategoryFilled stroke={2} /> },
    { name: 'Manejar Productos', iconPlaceholder:  <IconShoppingCart stroke={2} />},
    { name: 'Manejar Ordenes', iconPlaceholder: <IconArticleFilled stroke={2}/> },
    { name: 'Facturas', iconPlaceholder: <IconReceiptFilled stroke={2} /> },
  ];

  return (
    <section>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href="#">
                  <i>{item.iconPlaceholder}</i>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Sidebar;
