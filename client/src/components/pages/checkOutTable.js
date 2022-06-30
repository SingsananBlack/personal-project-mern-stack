import React from 'react';

const CheckOutTable = ({ values }) => {
  return (
    <>
      <tr>
        <td>
          <div className="carts_inifo">
            <img src={values.product.image[0].url} alt="" />
            <div>
              <p>{values.product.title}</p>
              <small>(vol.{values.product.volume})</small>
              <br />
              <small>Price: ฿{values.price}</small>
            </div>
          </div>
        </td>
        <td>{values.count} (piece)</td>
        <td>฿{values.price * values.count}</td>
      </tr>
    </>
  );
};

export default CheckOutTable;
