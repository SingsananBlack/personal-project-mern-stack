import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../menubar.Admin';
import NavbarAdmin from '../navbar.Admin';
// React-router-dom V6
import { useParams, useNavigate } from 'react-router-dom';
// Toastify
import { toast } from 'react-toastify';
// Redux
import { useSelector } from 'react-redux';
// Function
import {
  readCategory,
  updateCategory,
} from '../../../functions/category.Function';

const UpdateCategoryAdmin = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [categoryName, setCategoryName] = useState('');
  const { user } = useSelector((state) => ({ ...state }));

  /* Load data from server */
  useEffect(() => {
    const loadData = (id) => {
      readCategory(user.token, id)
      .then(res=>{
        setCategoryName(res.data.categoryName)
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
    }    
    loadData(param.id);
  }, [user, param]);
  /* End of load data from server */

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCategory(user.token, param.id, { categoryName })
      .then((res) => {
        navigate('/admin/add_category');
        toast.success('Category edited successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="admin-body">
      <MenubarAdmin />
      {/* ------------- END OF NAVBAR-MENU ------------- */}
      <section id="interface">
        <NavbarAdmin />
        <div className="content-admin">
          <div style={{ marginTop: '90px', marginLeft:'30%' }}>
            <h1>Update Category</h1>
          </div>
          <div className="update-category-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="categoryName"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              required
            />
            <input type="submit" value="Edit Category" />
          </form>            
          </div>
        </div>
      </section>
      {/* ------------- END OF INTERFACE ------------- */}
    </div>
  );
};

export default UpdateCategoryAdmin;
