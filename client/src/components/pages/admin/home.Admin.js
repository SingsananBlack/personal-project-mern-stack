import React from 'react';
import './home.Admin.css';
import DashboardAdmin from './dashboard.Admin';
import MenubarAdmin from './menubar.Admin';
import NavbarAdmin from './navbar.Admin';

const HomeAdmin = () => {
  return (
    <div className="admin-body">
      <MenubarAdmin />
      {/* ------------- END OF NAVBAR-MENU ------------- */}
      <section id="interface">
        <NavbarAdmin />
        <div className="content-admin">
          <DashboardAdmin />
        </div>
      </section>
      {/* ------------- END OF INTERFACE ------------- */}
    </div>
  );
};

export default HomeAdmin;
