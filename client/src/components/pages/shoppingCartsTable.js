import React from 'react';
// Redux
import { useDispatch } from 'react-redux';

const ShoppingCartsTable = ({ values }) => {
  const dispatch = useDispatch();

  /* Quantity change count */
  const handleChangeCount = (event) => {
    const count = event.target.value < 1 ? 1 : event.target.value;
    if (count > values.countInStock) {
      return;
    }
    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.forEach((item, index) => {
      if (item._id === values._id) {
        cart[index].count = count;
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({
      type: 'ADD_TO_CART',
      payload: cart,
    });
  };
  /* End of quantity change count */

  const handelRemove = () => {
    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.forEach((item, index) => {
      if (item._id === values._id) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({
      type: 'ADD_TO_CART',
      payload: cart,
    });
  };

  return (
    <>
      <tr>
        <td>
          <div className="carts_inifo">
            <img src={values.image[0].url} alt="" />
            <div>
              <p>{values.title}</p>
              <small>(vol.{values.volume})</small>
              <br />
              <small>Price: ฿{values.price}</small>
              <br />
              <i
                to={`#`}
                className="fa-solid fa-trash"
                onClick={handelRemove}
                style={{ color: 'red', cursor: 'pointer', fontSize: '20px' }}
              ></i>
            </div>
          </div>
        </td>
        <td>
          <input
            type="number"
            value={values.count}
            max={15}
            onChange={handleChangeCount}
          />
          {values.countInStock < 10 ? (
            <p style={{ color: 'red' }}>Stock : {values.countInStock}</p>
          ) : (
            <></>
          )}
        </td>
        <td>฿{values.price * values.count}</td>
      </tr>
    </>
  );
};

export default ShoppingCartsTable;
