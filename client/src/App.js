import React from 'react';
import { Route, Routes } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
// Css
import './App.css';
// User page
import HomePage from './components/pages/home.Page';
import LoginForm from './components/pages/auth/loginForm';
import RegisterForm from './components/pages/auth/registerForm';
import ShopPage from './components/pages/shopPage.Page';
import WishList from './components/pages/wishList.Page';
import ShoppingCarts from './components/pages/shoppingCarts.Page';
import ShippingAddress from './components/pages/shippingAddress.Page';
import CheckOutPage from './components/pages/checkOut.Page';
import OrdersHistoryPage from './components/pages/ordersHistory.Page';
// Admin page
import HomeAdmin from './components/pages/admin/home.Admin';
import CustomersAdmin from './components/pages/admin/customers.Admin';
import AddProductAdmin from './components/pages/admin/product/addProduct.Admin';
import ProductsAdmin from './components/pages/admin/products.Admin';
import UpdateProductAdmin from './components/pages/admin/product/updateProduct.Admin';
import AddCategoryAdmin from './components/pages/admin/category/addCategory.Admin';
import UpdateCategoryAdmin from './components/pages/admin/category/updateCategory.Admin';
// Function
import { currentUser } from './components/functions/auth.Function';
// Routes
import UserRoute from './components/routes/user.Route';
import AdminRoute from './components/routes/admin.Route';
// Use Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        // console.log(res);
        dispatch({
          type: 'LOGIN',
          payload: {
            token: idtoken,
            username: res.data.username,
            email: res.data.email,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="App">
      <ToastContainer autoClose={1100} />
      <Routes>
        {/* ---------- User pages ---------- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route
          path="/wishlist"
          element={
            <UserRoute>
              <WishList />
            </UserRoute>
          }
        />
        <Route path="/shopping_carts" element={<ShoppingCarts />} />
        <Route 
          path="/shipping-address" 
          element={
            <UserRoute>
              <ShippingAddress />
            </UserRoute>
          }
        />
        <Route 
          path="/check_out" 
          element={
            <UserRoute>
              <CheckOutPage />
            </UserRoute>
          } 
        />
        <Route 
          path="orders_history"
          element={
            <UserRoute>
              <OrdersHistoryPage />
            </UserRoute>
          } 
        />
        {/* ---------- User pages ----------  */}

        {/* ---------- Admin pages ---------- */}
        <Route
          path="/admin/home"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/products"
          element={
            <AdminRoute>
              <ProductsAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add_product"
          element={
            <AdminRoute>
              <AddProductAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/update_product/:id"
          element={
            <AdminRoute>
              <UpdateProductAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add_category"
          element={
            <AdminRoute>
              <AddCategoryAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/update_category/:id"
          element={
            <AdminRoute>
              <UpdateCategoryAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <AdminRoute>
              <CustomersAdmin />
            </AdminRoute>
          }
        />
        {/* ---------- Admin pages ---------- */}
      </Routes>
    </div>
  );
}

export default App;
