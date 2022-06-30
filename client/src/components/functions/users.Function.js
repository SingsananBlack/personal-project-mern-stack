import axios from 'axios';

export const listUsers = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + '/users', {
    headers: {
      authtoken,
    },
  });
};
export const changeStatus = async (authtoken,value) => {
  return await axios.post(process.env.REACT_APP_API + '/change_status',value, {
    headers: {
      authtoken,
    },
  });
};

/* Cart */
export const userCart = async (authtoken, cart) => {
  return await axios.post(process.env.REACT_APP_API + '/user/cart', cart, {
    headers: {
      authtoken,
    }
  })
}
export const getUserCart = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + '/user/cart', {
    headers: {
      authtoken
    }
  })
} 

/* Save Address */
export const saveAddress = async (authtoken, address) => {
  return await axios.post(process.env.REACT_APP_API + '/user/address', {address}, {
    headers: {
      authtoken
    }
  })
}

/* Save order */
export const saveOrder = async (authtoken) => {
  return await axios.post(process.env.REACT_APP_API + '/user/order', {}, {
    headers: {
      authtoken
    }
  })
}
/* Get order user */
export const getOrderUser = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + '/user/orders', {
    headers: {
      authtoken
    }
  })
}

/* Clear Cart */
export const emptyCart = async (authtoken) => {
  return await axios.delete(process.env.REACT_APP_API + '/user/cart', {
    headers:{
      authtoken
    }
  })
} 