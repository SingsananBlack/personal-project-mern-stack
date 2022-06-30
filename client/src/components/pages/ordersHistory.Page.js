import React, { useState, useEffect } from 'react';
import moment from 'moment';
// React-router-dom
import { Link } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
// Components
import NavbarUser from '../layouts/navbar.User';
// Functions
import { getOrderUser } from '../functions/users.Function';

const OrdersHistoryPage = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  /* Load data from database */
  useEffect(() => {
    const loadData = () => {
      getOrderUser(user.token).then((res) => {
        setOrders(res.data);
      });
    };
    loadData();
  }, [user]);
  /* End of load data from database */

  const handleClickIdOrder = () => {
    alert('This feature is unfinished')
  }

  return (
    <>
      <NavbarUser />
      <div className="orders_history_container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Status</th>
              <th>Date</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((values, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`#`} onClick={handleClickIdOrder}>{values._id}</Link>
                  </td>
                  <td>{values.orderStatus}</td>
                  <td>{moment(values.createdAt).format('DD-MM-YYYY')}</td>
                  <td>฿{values.cartTotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrdersHistoryPage;
