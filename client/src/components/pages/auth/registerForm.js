import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/registerForm.css';
// Use functions
import { register } from '../../functions/auth.Function';
// Use Toastify
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error('Password not match!');
    } else {
      register(data)
        .then((res) => {
          console.log(res.data);
          toast.success(res.data);
          navigate('/login');
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error(err.response.data);
        });
    }
  };
  return (
    <>
      <div className="register-form-container">
        <Link to={`/`} id="close-register-btn" className="fas fa-times"></Link>
        <form onSubmit={handleSubmit}>
          <h3>register</h3>
          <span>Username</span>
          <input
            type="text"
            name="username"
            className="box"
            placeholder="enter your name"
            required
            onChange={handleChange}
          />
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
            placeholder="Enter your password (6 or more)"
            required
            onChange={handleChange}
          />
          <span>Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            className="box"
            placeholder="Enter your password (6 or more)"
            required
            onChange={handleChange}
          />
          <input
            type="submit"
            value="register"
            className="register-btn"
            disabled={data.password.length < 6}
          />
          <p>
            Already have an account ? <Link to={`/login`}>Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
