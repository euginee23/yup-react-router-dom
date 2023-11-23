import React, { useState } from 'react';
import './css_modules/login.css';
import loginValidationSchema from '../utils/loginValidationSchema'; 
import loginUser from './modules/loginUser';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = async () => {
    try {
      await loginValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (await validateForm()) {
      try {
        console.log('Form data submitted:', formData);
  
        const loggedInUser = await loginUser(formData);
        console.log('Login successful:', loggedInUser);
  
        window.alert('Login successful');
  
      } catch (error) {
        console.error('Error during login:', error.message);
  
        window.alert('Login failed. Please try again.');
      }
    } else {
      console.log('Form has validation errors');
    }
  };

  return (
    <div className="loginContainer">
      <h1>LOG IN</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="label">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
        </label>

        <label className="label">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </label>

        <button type="submit" className="submitButton">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;