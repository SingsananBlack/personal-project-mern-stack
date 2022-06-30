import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/shoppingCarts.css';
// Components
import NavbarUser from '../layouts/navbar.User';
import ShoppingCartsTable from './shoppingCartsTable';
// Redux
import { useSelector } from 'react-redux';
// Functions
import { userCart } from '../functions/users.Function';

const ShoppingCarts = () => {
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));

  /* Total Price */
  const getTotal = () => {
    return cart.reduce((currenValue, nextValue) => {
      return currenValue + nextValue.count * nextValue.price;
    }, 0);
  };
  /* End of total Price */

  const handelSaveOrder = () => {
    userCart(user.token, { cart })
      .then((res) => {
        // console.log(res);
        navigate('/shipping-address');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <NavbarUser />
      <div className="carts_container">
        {!cart.length ? (
          <div className="cart_is_empty">
            <small>Your cart is empty</small>
            <Link to={`/shop`}>
              <button>SHOPPING NOW</button>
            </Link>
          </div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((values, index) => {
                  return <ShoppingCartsTable key={index} values={values} />;
                })}
              </tbody>
            </table>
            <div className="total_price">
              <table>
                <thead>
                  <tr>
                    <td>Total</td>
                    <td>฿{getTotal()}</td>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="check_out">
              {user ? (
                <button disabled={!cart.length} onClick={handelSaveOrder}>
                  Check Out
                </button>
              ) : (
                <button>
                  <Link to={`/login`} state={`shopping_carts`}>
                    Check Out
                  </Link>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShoppingCarts;
