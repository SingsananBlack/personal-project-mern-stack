import axios from 'axios';

export const createProduct = async (authtoken, value) => {
  return axios.post(process.env.REACT_APP_API + '/product', value, {
    headers: {
      authtoken,
    },
  });
};

export const listProduct = async (count) => {
  return await axios.get(process.env.REACT_APP_API +'/products/' + count)
}

export const readProduct = async (id) => {
  return await axios.get(process.env.REACT_APP_API + '/product/' + id)
}

export const updateProduct = async (authtoken, id, value) => {
  return await axios.put(process.env.REACT_APP_API + '/product/' + id, value, {
    headers: {
      authtoken
    }
  })
}

export const deleteProduct = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_API + '/product/' + id, {
    headers: {
      authtoken
    }
  })
}

export const productOrderBy = async (limit, sort, orderBy) => {
  return await axios.post(process.env.REACT_APP_API + '/product-order-by', {
    limit,
    sort,
    orderBy
  })
}

export const searchFilters = async (argument) => {
  return await axios.post(process.env.REACT_APP_API + '/search/filters', argument)
}
