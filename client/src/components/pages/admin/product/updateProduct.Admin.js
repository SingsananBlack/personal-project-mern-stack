import React, {useState, useEffect} from 'react'
// Components
import MenubarAdmin from '../menubar.Admin'
import NavbarAdmin from '../navbar.Admin'
// react-router-dom
import { useParams, useNavigate } from 'react-router-dom'
// toastify
import { toast } from 'react-toastify'
// Redux
import { useSelector } from 'react-redux'
// Function
import { readProduct, updateProduct } from '../../../functions/product.Function'
import { listCategory } from '../../../functions/category.Function'

const UpdateProductAdmin = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { user } = useSelector((state)=>({...state}))
  const [category, setCategory] = useState([])
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
  useEffect(()=>{
    const loadData = () =>{
      readProduct(params.id)
      .then(res=>{
        setValues((values)=>({...values,...res.data}));
      })
      .catch(err=>{
        console.log(err);
      })
      listCategory(user.token)
      .then(res=>{
        setCategory(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
    }
    loadData()
  },[params,user])
  /* End of load data from server */

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateProduct(user.token, values._id, values)
    .then(res=>{
      console.log(res.data);
      navigate('/products')
      toast.success('Edited successfully')
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <div className="admin-body">
      <MenubarAdmin />
      {/* ------------- END OF NAVBAR-MENU ------------- */}
      <section id="interface">
        <NavbarAdmin />
        <div className="content-admin">
          <div
            style={{
              marginTop: '90px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <h1>Update Category</h1>
          </div>
          <div className="add-product-form">
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                readOnly
              />
              <label>Volume</label>
              <input
                type="number"
                name="volume"
                value={values.volume}
                onChange={handleChange}
                readOnly
              />
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
                required
              />
              <label>PriceSale</label>
              <input
                type="number"
                name="priceSale"
                value={values.priceSale}
                onChange={handleChange}
                required
              />
              <label>Stock</label>
              <input
                type="number"
                name="countInStock"
                value={values.countInStock}
                onChange={handleChange}
                required
              />
              {values.image &&
                values.image.map((item) => (
                  <div className="img-container" key={item.public_id}>
                    <div className="img-preview">
                        <img src={item.url} alt="" />
                    </div>
                  </div>
                ))}
              <label>Category</label>
              <select
                name="category"
                value={values.category._id}
                onChange={handleChange}
              >
                <option>Please select</option>
                {category.length > 0 &&
                  category.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.categoryName}
                    </option>
                  ))}
              </select>
              <input
                type="submit"
                value="Edit Product"
                className="edit-submit"
              />
            </form>
          </div>
        </div>
      </section>
      {/* ------------- END OF INTERFACE ------------- */}
    </div>
  );
}

export default UpdateProductAdmin