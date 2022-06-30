import React from 'react';
import $ from 'jquery';
import '../css/navBar.css';
// Components
import SearchBoxUser from './searchBox.User';
// Route
import { NavLink } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const NavbarUser = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    window.location.reload(true);
  };

  const showNavbar = () => {
    if ($('.item').hasClass('active')) {
      $('.item').removeClass('active');
      $('.toggle').find('a').html("<i class='fas fa-bars fa-2x'></i>");
    } else {
      $('.item').addClass('active');
      $('.toggle').find('a').html("<i class='fa-solid fa-xmark fa-2x'></i>");
    }
  }; /* Function animation for icon NavigationBar */

  window.onscroll = () => {
    if (window.scrollY > 300) {
      document.querySelector('.header').classList.add('active');
    } else {
      document.querySelector('.header').classList.remove('active');
    }
  }; /* scroll page */
  window.onload = () => {
    if (window.scrollY > 300) {
      document.querySelector('.header').classList.add('active');
    } else {
      document.querySelector('.header').classList.remove('active');
    }
  }; /* load page */

  const profileDropdown = () => {
    const dropdownProfile = document.querySelector('.profile-link');
    dropdownProfile.classList.toggle('show');
  }; /* PROFILE DROPDOWN MENU */

  return (
    <>
      {/*  NavigationBar */}
      <nav className="header">
        <ul className="menu font-effect-3d-float">
          <li className="logo">
            <NavLink to={`/`}>Manga&#128218;Shop</NavLink>
          </li>
          <li className="item">
            <NavLink
              to={`/`}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
          </li>
          <li className="item">
            <NavLink
              to={`/shop`}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Shop
            </NavLink>
          </li>
          <li className="item">
            <NavLink
              to={`/orders_history`}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Orders
            </NavLink>
          </li>
          <li className="item">
            <NavLink
              to={`/wishlist`}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <i className="fas fa-heart fa-2x"></i>
            </NavLink>
          </li>
          <li className="item">
            <NavLink
              to={`/shopping_carts`}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <i className="fa-solid fa-cart-arrow-down fa-2x"></i>
              <span className="carts_badge_count">{cart.length}</span>
            </NavLink>
          </li>
          {!user && (
            <>
              <li className="item button login">
                <NavLink to={`/login`}>Login</NavLink>
              </li>
              <li className="item button register secondary">
                <NavLink type="button" to={`/register`}>
                  Register
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="item">
                <div className="profile-user">
                  <img
                    src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                    alt=""
                    onClick={profileDropdown}
                  />
                  <ul className="profile-link">
                    <li>
                      <NavLink to={`#`}>User : {user.username}</NavLink>
                    </li>
                    <li>
                      <NavLink type="button" to={`#`} onClick={logout}>
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          )}
          <li className="toggle" onClick={showNavbar}>
            <NavLink to={`#`}>
              <i className="fas fa-bars fa-2x"></i>
            </NavLink>
          </li>
        </ul>
        {/* SearchBar */}
        <SearchBoxUser />
      </nav>
    </>
  );
};

export default NavbarUser;
