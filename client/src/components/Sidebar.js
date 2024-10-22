import React from 'react';
import '../styles/sidebar.css'; // Asegúrate de crear este archivo CSS
// Importamos las imágenes directamente
import { IconArticleFilled, IconCategoryFilled, IconLayoutDashboard, IconReceiptFilled, IconShoppingCart } from '@tabler/icons-react';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { name: 'Dashboard', iconPlaceholder: <IconLayoutDashboard stroke={2} />, href: '/dashboard' },
    { name: 'Manejar Categorías', iconPlaceholder: <IconCategoryFilled stroke={2} />, href: '/categories' },
    { name: 'Manejar Productos', iconPlaceholder:  <IconShoppingCart stroke={2} />, href: '/product' },
    { name: 'Manejar Ordenes', iconPlaceholder: <IconArticleFilled stroke={2} />, href: '/order' },
  ];

  return (
    <section className='sidebar-container'>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>
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