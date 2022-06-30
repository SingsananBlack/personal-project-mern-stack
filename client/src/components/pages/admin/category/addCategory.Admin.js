import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import MenubarAdmin from '../menubar.Admin';
import NavbarAdmin from '../navbar.Admin';
// Tosatify
import { toast } from 'react-toastify';
// Redux
import { useSelector } from 'react-redux';
// function
import {
  createCategory,
  listCategory,
  deleteCategory,
} from '../../../functions/category.Function';

const AddCategoryAdmin = () => {
  const [values, setValues] = useState({
    categoryName: '',
  });
  const [category, setCategory] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  /* Load data from server */
  const loadData = useCallback(() => {
    listCategory(user.token)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  useEffect(() => {
    loadData();
  }, [loadData]);
  /* End of load data from server */

  const handleChangeCategory = (event) => {
    console.log(event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createCategory(user.token, values)
      .then((res) => {
        toast.success('Category added successfully');
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    deleteCategory(user.token, id)
      .then((res) => {
        toast.success('Category deleted successfully');
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* React DataTable */
  const columns = [
    {
      name: 'Category',
      selector: (row) => row.categoryName,
      width: '500px',
    },
    {
      name: 'Edit',
      cell: (row) => (
        <Link
          to={`/admin/update_category/${row._id}`}
          className="fa-solid fa-pen-to-square"
          style={{ fontSize: '25px', color: 'orange' }}
        />
      ),
    },
    {
      name: 'Delete',
      cell: (row) => (
        <Link
          to={`#`}
          className="fa-solid fa-trash"
          style={{ fontSize: '25px', color: 'red' }}
          onClick={() => handleDelete(row._id)}
        />
      ),
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        fontSize: '17px',
        fontWeight: 700,
      },
    },
  };
  /* End of react datatable */

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
          <div className="add-category-form">
            <form onSubmit={handleSubmit} style={{ margin: '20px 0 10px 10px' }}>
              <input
                type="text"
                name="categoryName"
                onChange={handleChangeCategory}
                required
              />
              <input type="submit" value="Add Category" />
            </form>
          </div>
          <DataTable
            columns={columns}
            data={category}
            customStyles={customStyles}
            highlightOnHover
          />
        </div>
      </section>
      {/* ------------- END OF INTERFACE ------------- */}
    </div>
  );
};

export default AddCategoryAdmin;
