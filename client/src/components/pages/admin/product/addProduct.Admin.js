import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../menubar.Admin';
import NavbarAdmin from '../navbar.Admin';
import FileUploadAdmin from './fileUpload.Admin';
// Toastify
import { toast } from 'react-toastify';
// Use react-spinners
import RingLoader from 'react-spinners/RingLoader';
// Redux
import { useSelector } from 'react-redux';
// Function
import { createProduct } from '../../../functions/product.Function';
import { listCategory } from '../../../functions/category.Function';

const AddProductAdmin = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState({
    title: '',
    volume: '',
    price: '',
    priceSale: '',
    countInStock: '',
    categories: [],
    image: [],
    category: '',
  });

  /* Load data from server */
  useEffect(() => {
    const loadData = () => {
      listCategory(user.token)
        .then((res) => {
          console.log(res.data);
          setValues((values) => ({ ...values, categories: res.data }));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadData();
  }, [user]);
  /* End of load data from server */

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    createProduct(user.token, values)
      .then((res) => {
        console.log(res);
        toast.success('Product added successfully');
        setTimeout(() => {
          setLoading(false)
          window.location.reload();
        }, 1400);     
      })
      .catch((err) => {
        console.log(err.response);
        toast.warning('Please enter your information again');
        setLoading(false)
      });
  };

  return (
    <div className="admin-body">
      <MenubarAdmin />
      {/* ------------- END OF NAVBAR-MENU ------------- */}
      <section id="interface">
        <NavbarAdmin />
        <div className="content-admin">
          <div style={{ marginTop: '90px', display:'flex', justifyContent:'center' }}>
            <h1>Create Category</h1>
          </div>
          { loading 
          ?
          <div style={{display:'flex', justifyContent:'center'}}>
          <RingLoader
            color={'#ff4a4a'}
            loading={loading}
            size={100}
          /> 
          </div> 
          : 
          <div className="add-product-form">
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                required
              />
              <label>Volume</label>
              <input
                type="number"
                name="volume"
                onChange={handleChange}
                required
              />
              <label>Price</label>
              <input
                type="number"
                name="price"
                onChange={handleChange}
                required
              />
              <label>PriceSale</label>
              <input
                type="number"
                name="priceSale"
                onChange={handleChange}
                required
              />
              <label>Stock</label>
              <input
                type="number"
                name="countInStock"
                onChange={handleChange}
                required
              />
              <FileUploadAdmin
                values={values}
                setValues={setValues}
              />
              <label>Category</label>
              <select name="category" onChange={handleChange}>
                <option>Please select</option>
                {values.categories.length > 0 &&
                  values.categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.categoryName}
                    </option>
                  ))}
              </select>
              <input
                type="submit"
                value="Add Product"
                className="product-submit"
              />
            </form>
          </div>
          }
        </div>
      </section>
      {/* ------------- END OF INTERFACE ------------- */}
    </div>
  );
};

export default AddProductAdmin;
