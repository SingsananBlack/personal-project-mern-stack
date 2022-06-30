import React from 'react';
import { useNavigate } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';

const SearchBoxUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search

  const handleChange = (event) => {
      dispatch({
          type:'SEARCH_QUERY',
          payload:{text: event.target.value}
      })
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      navigate('/shop?' + text)
  }

  /* Function animation for SearchBar */
  const ShowSearchInput = () => {
    const search = document.querySelector('.search');
    search.classList.toggle('active');
  };
  /* Function animation for SearchBar */

  return (
    <>
      <form onSubmit={handleSubmit} className="search-container">
        <div className="search">
          <div className="icon" onClick={ShowSearchInput}></div>
          <div className="input">
            <input type="search" placeholder="Search here..." id="mysearch"
            onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchBoxUser;
