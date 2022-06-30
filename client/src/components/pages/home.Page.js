import React from 'react';
// Components
import NavbarUser from '../layouts/navbar.User';
import NewArrivals from './newArrivals.Page';
import BestSeller from './bestSeller.Page';
import FooterUser from '../layouts/footer.User';

const HomePage = () => {
  return (
    <div>
      <header>
        <NavbarUser />
      </header>
      <section>
        <NewArrivals />
        <BestSeller />
      </section>
      <footer>
        <FooterUser />
      </footer>
    </div>
  );
}

export default HomePage
