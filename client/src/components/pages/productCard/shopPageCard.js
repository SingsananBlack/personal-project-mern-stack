import React from 'react';
import { Link } from 'react-router-dom';
// Lodash
import _ from 'lodash';
// Redux
import { useDispatch } from 'react-redux';

const ShopPageCard = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push({ ...products, count: 1 });
    let uniqueProduct = _.uniqWith(cart, _.isEqual);
    localStorage.setItem('cart', JSON.stringify(uniqueProduct));

    dispatch({
      type: 'ADD_TO_CART',
      payload: uniqueProduct,
    });
  };

  return (
    <>
      <div className="list-box">
        <div className="list-icons">
          {/* <Link to={`#`} className="fas fa-search"></Link> */}
          <Link to={`#`} className="fas fa-heart"></Link>
          <Link to={`#`} className="fas fa-eye"></Link>
        </div>
        <div className="list-image">
          <img src={products.image[0].url} alt="" />
        </div>
        <div className="list-content">
          <h3>{products.title}</h3>
          <h3>(vol. {products.volume})</h3>
          <div className="list-price">
            ฿{products.price} <span>฿{products.priceSale}</span>
          </div>
          <div className="sold">
            <h6 style={{ color: 'red' }}>
              Sold <span>{products.sold}</span>
            </h6>
          </div>
          {!products.countInStock ? (
            <Link to={`#`} className="shoppage-btn-sold-out">
              Sold out
            </Link>
          ) : (
            <Link to={`#`} className="shoppage-btn" onClick={handleAddToCart}>
              Add to cart
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopPageCard;
