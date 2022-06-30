import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenubarAdmin from './menubar.Admin';
import NavbarAdmin from './navbar.Admin';
// Use react-spinners
import RingLoader from 'react-spinners/RingLoader'
// toasttify
import { toast } from 'react-toastify'
// Redux
import { useSelector } from 'react-redux';
// Function
import { listProduct, deleteProduct } from '../../functions/product.Function';

const ProductsAdmin = () => {
  const { user } = useSelector((state)=>({...state}))
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  /* Load data from server */  
  const loadData = (count) => {
    setLoading(true);
    listProduct(count)
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    loadData(10);
  }, []);
  /* End of load data from server */

  /* Delete Product */
  const handleDelete = (id) => {
    if(window.confirm('You want to delete it ?')) {
      deleteProduct(user.token, id)
        .then((res) => {
          loadData(10)
          toast.success('Deleted successfully')
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  /* End of delete product */

  return (
    <div className="admin-body">
      <MenubarAdmin />
      {/* ------------- END OF NAVBAR-MENU ------------- */}
      <section id="interface">
        <NavbarAdmin />
        <div className="content-admin">
          <div style={{ marginTop: '90px', display:'flex', justifyContent:'center' }}>
            <h1>Products</h1>
          </div>
          <div className="pla-container">
            {loading ? (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
              }}
              >
              <RingLoader 
              color={'#ff4a4a'} 
              loading={loading} 
              size={150} 
              />
              </div>
            ) : (
              products.map((values)=>{
                return (
                    <div className="pla-wrapper" key={values._id}>
                    <div className="pla-box">
                      <div className="pla-icons">
                        <Link to={`/admin/update_product/${values._id}`} className="fa-solid fa-pen-to-square"></Link>
                        <Link to={`#`} className="fa-solid fa-trash" onClick={()=>handleDelete(values._id)}></Link>
                      </div>
                      <div className="pla-image">
                        <img src={values.image[0].url} alt="" />
                      </div>
                      <div className="pla-content">
                        <h3>{values.title}</h3>
                        <h3>(vol. {values.volume})</h3>
                        <div className="pla-price">
                          ฿{values.price} <span>฿{values.priceSale}</span>
                        </div>
                        <div className="sold">
                          <h6>Sold <span>{values.sold}</span></h6>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
      {/* ------------- END OF INTERFACE ------------- */}
    </div>
  );
};

export default ProductsAdmin;
