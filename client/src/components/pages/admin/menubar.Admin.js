import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';

const MenubarAdmin = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    window.location.href = '/';
  }; /* ----- END OF LOGOUT FUNCTION ---- */

  return (
    <section id="navbar-menu" className="navbar_menu">
      <div className="navbar-logo">
        <h2>Manga&#128218;Shop</h2>
      </div>
      <div className="navbar-items">
        <CustomLink to={`/admin/home`}>
          <i className="fa-solid fa-chart-pie"></i>
          Dashboard
        </CustomLink>

        <CustomLink to={`/orders`}>
          <i className="fa-solid fa-file-invoice"></i>
          Orders
        </CustomLink>

        <CustomLink to={`/products`}>
          <i className="fa-solid fa-store"></i>
          Products
        </CustomLink>

        <CustomLink to={`/admin/add_product`}>
          <i className="fa-solid fa-plus"></i>
          Add Product
        </CustomLink>

        <CustomLink to={`/admin/add_category`}>
          <i className="fa-solid fa-list"></i>
          Add Category
        </CustomLink>

        <CustomLink to={`/admin/customers`}>
          <i className="fa-solid fa-users"></i>
          Customers
        </CustomLink>
        <li>
          <Link to={`#`} onClick={logout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            Logout
          </Link>
        </li>
      </div>
    </section>
  );
};

function CustomLink({ to, children }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to}>
        {children}
      </Link>
    </li>
  );
}

export default MenubarAdmin;
