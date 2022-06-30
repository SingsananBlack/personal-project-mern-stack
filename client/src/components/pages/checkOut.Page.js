import React, { useState, useEffect } from 'react';
// React-router-dom
import { useNavigate } from 'react-router-dom';
// toastify
import { toast } from 'react-toastify'
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Components
import NavbarUser from '../layouts/navbar.User';
import CheckOutTable from './checkOutTable';
// Functions
import { getUserCart, saveOrder, emptyCart } from '../functions/users.Function';

const CheckOutPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log(res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, [user]);

  const handleCreateOrder = () => {
    saveOrder(user.token).then(res=>{
      console.log(res.data);
      // Clear cart in database
      emptyCart(user.token);
      // Clear cart in store redux
      dispatch({
        type: 'ADD_TO_CART',
        payload: []
      });
      // Clear cart in localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
      toast.success('Your order has been completed');
      navigate('/orders_history');
    })
  }  

  return (
    <>
      <NavbarUser />
      <div className="carts_container">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {products.map((values, index) => {
              return <CheckOutTable key={index} values={values} />;
            })}
          </tbody>
        </table>
        <div className="total_price">
          <table>
            <thead>
              <tr>
                <td>Product</td>
                <td>{products.length}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>฿{total}</td>
              </tr>
            </thead>
          </table>
        </div>
        <div className="check_out">
          <button onClick={handleCreateOrder}>Place an order</button>
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
