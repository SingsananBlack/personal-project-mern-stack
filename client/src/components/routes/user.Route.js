import React from 'react';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './loadingToRedirect.Route';

const UserRoute = ({ children }) => {
  
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? children : <LoadingToRedirect />;
};

export default UserRoute;
