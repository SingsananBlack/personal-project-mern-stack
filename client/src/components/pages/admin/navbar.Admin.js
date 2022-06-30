import React from 'react';
import $ from 'jquery';

const NavbarAdmin = () => {
  const showMenubarAdmin = () => {
    if ($('.navbar_menu').hasClass('active')) {
      $('.navbar_menu').removeClass('active');
    } else {
      $('.navbar_menu').addClass('active');
    }
  }; /* ---- END OF showMenubarAdmin Function ---- */
  return (
    <div className="navigation">
      <div className="n1">
        <div>
          <i
            id="menu-btn"
            className="fa-solid fa-bars"
            onClick={showMenubarAdmin}
          ></i>
        </div>
        <div className="nav-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="profile">
        <img
          src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default NavbarAdmin;
