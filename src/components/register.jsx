import React, { useState } from 'react';
import * as Yup from 'yup';
import registerValidationSchema from '../utils/registerValidationSchema'; // Update the path
import './css_modules/register.css';
import registerUser from './modules/registerUser'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    rePassword: '',
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
      await registerValidationSchema.validate(formData, { abortEarly: false });
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
        const registeredUser = await registerUser(formData);
        console.log('User registered successfully:', registeredUser);
  
        window.alert('Registration successful');
  
        setFormData({
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          username: '',
          password: '',
          rePassword: '',
        });
      } catch (error) {
        console.error('Error during registration:', error.message);
  
        window.alert('Registration failed. Please try again.');
      }
    } else {
      console.log('Form has validation errors');
    }
  };

  return (
    <div className="registerContainer">
      <h1>Register</h1>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label className="label">
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
        </label>

        <label className="label">
          Middle Name:
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
          {errors.middleName && <div style={{ color: 'red' }}>{errors.middleName}</div>}
        </label>

        <label className="label">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
        </label>

        <label className="label">
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </label>

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

        <label className="label">
          Re-Password:
          <input
            type="password"
            name="rePassword"
            value={formData.rePassword}
            onChange={handleChange}
          />
          {errors.rePassword && <div style={{ color: 'red' }}>{errors.rePassword}</div>}
        </label>

        <button type="submit" className="submitButton">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;