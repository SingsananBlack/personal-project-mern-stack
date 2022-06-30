import React, { useState } from 'react';
// import { click } from "@testing-library/user-event/dist/click";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../css/loginForm.css';
// Use functions
import { login } from '../../functions/auth.Function';
// Redux
import { useDispatch } from 'react-redux';
// Use Toastify
import { toast } from 'react-toastify';

const LoginForm = () => {
  /* const reloadPage = () => {
    document.querySelector(".App").addEventListener(click, () => {
      window.location.reload(true);
    });
  }; */
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const roleBaseRedirect = (role) => {
    const locationCart = location.state
    if (locationCart) {
      // navigate(`../${locationCart}`);
      window.location.href = `../${locationCart}`;
    } else {
      if (role === 'admin') {
        navigate('/admin/home');
      } else {
        window.location.href = '/';
      }
    }
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // function
    login(data)
      .then((res) => {
        // Use redux,reducer
        dispatch({
          type: 'LOGIN',
          payload: {
            token: res.data.token,
            email: res.data.payload.user.email,
            role: res.data.payload.user.role,
          },
        });
        // Save token to localStorage
        localStorage.setItem('token', res.data.token);
        roleBaseRedirect(res.data.payload.user.role);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data);
      });
  };
  
  return (
    <>
      <div className="login-form-container">
        <Link to={`/`} id="close-login-btn" className=" fas fa-times"></Link>
        <form onSubmit={handleSubmit}>
          <h3>sign in</h3>
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            className="box"
            placeholder="Enter your email"
            required
            onChange={handleChange}
          />
          <span>Password</span>
          <input
            type="password"
            name="password"
            className="box"
            placeholder="Enter your password"
            required
            onChange={handleChange}
          />
          {/* <div className="checkbox">
            <input type="checkbox" name="" id="remember-me" />
            <label htmlFor="remember-me"> Remember Me</label>
          </div> */}
          <input type="submit" value="Sign in" className="login-btn" />
          <p>
            forget password ? <Link to={`#`}>Click here</Link>
          </p>
          <p>
            don't have an account ? <Link to={`/register`}>Create account</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
