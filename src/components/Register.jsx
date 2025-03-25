import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import registerStyles from "./register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateInputs = () => {
    const { name, email, phoneNumber, password } = formData;
  
    if (!name || !email || !phoneNumber || !password) {
      return "All fields are required!";
    }
  
    // Strong Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address!";
    }
  
    // Strong Phone Number Validation (10-15 digits, must not start with 0)
    const phoneRegex = /^(?:\+234|0)(70|80|81|90|91)[0-9]{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return "Please enter a valid phone number.";
    }
  
    if (password.length < 8 || password.length > 12) {
      return "Password must be between 8 and 12 characters!";
    }
  
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed!");
      }

      setSuccess("Registration successful! Please verify your email.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Something went wrong! Please try again.");
    }
  };

  return (
    <div className={registerStyles.registerContainer}>
      <h2>Register</h2>
      {error && <p className={registerStyles.error}>{error}</p>}
      {success && <p className={registerStyles.success}>{success}</p>}
      <form onSubmit={handleSubmit} className={registerStyles.form}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className={registerStyles.button}>Register</button>
      </form>
      <p className={registerStyles.switchAuth}>
        Already registered? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;
