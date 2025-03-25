import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginStyles from "./login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const { email, password } = formData;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address!";
    }

    if (password.length < 8 || password.length > 12) {
      return "Password must be between 8 and 12 characters long!";
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
      setTimeout(() => setError(""), 5000);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || data.message || "Login failed!");
      }

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(data));

      setSuccess(data.message || "Login successful!");
      setTimeout(() => {
        setSuccess("");
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.message || "Something went wrong! Please try again.");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className={loginStyles.loginContainer}>
      <h2>Login</h2>
      {error && <p className={loginStyles.error}>{error}</p>}
      {success && <p className={loginStyles.success}>{success}</p>}
      <form onSubmit={handleSubmit} className={loginStyles.form}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={handleChange} 
          required 
        />
        <button type="submit">Login</button>
      </form>
      <p className={loginStyles.switchAuth}>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
