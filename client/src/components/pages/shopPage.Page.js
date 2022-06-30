import React, { useEffect, useState } from 'react';
import '../css/shopPage.css';
// Components
import NavbarUser from '../layouts/navbar.User';
import LoadingPage from './loading/loading.Page';
import ShopPageCard from './productCard/shopPageCard';
// Redux
import { useSelector } from 'react-redux';
// Function
import { listProduct, searchFilters } from '../functions/product.Function';
import { listCategory } from '../functions/category.Function';

const ShopPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { search } = useSelector((state) => ({ ...state }));
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);

  /* Load data from server */
  const loadData = () => {
    setLoading(true);
    listProduct()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    listCategory().then((res) => setCategory(res.data));
    /* Search Product by text */
    const fetchDataFilter = (argument) => {
      searchFilters(argument)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const delay = setTimeout(() => {
      fetchDataFilter({ query: search.text });
      if (!search.text) {
        loadData();
      }
    }, 200);
    return () => clearTimeout(delay);
    /* End of search product by text */
  }, [search]);
  /* End of load data from server */

  /* Search filter by category */
  const fetchDataFilter = (argument) => {
    searchFilters(argument)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handelCheck = (event) => {
    // Then category
    let inCheck = event.target.value;
    // Default category
    let inState = [...categorySelect];

    let findCheck = inState.indexOf(inCheck);
    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelect(inState);
    fetchDataFilter({ category: inState });
    if (inState.length < 1) {
      loadData();
    }
  };
  /* End of search filter by category */

  return (
    <>
      <NavbarUser />
      <div className="container">
        <div className="navbar-filters">
          <div className="filters-category">
            <h2 className="font-effect-3d-float">Category</h2>
            <ul>
              {category.map((values) => (
                <li key={values._id}>
                  <input
                    type="checkbox"
                    value={values._id}
                    onChange={handelCheck}
                  ></input>
                  <label
                    style={{ padding: '5px' }}
                    className="font-effect-3d-float"
                  >
                    {values.categoryName}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="list-wrap">
            {loading ? (
              <LoadingPage />
            ) : (
              products.map((values, index) => {
                return (
                  <div className="list-wrapper" key={values._id}>
                    <ShopPageCard products={values} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
