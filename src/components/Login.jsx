import React, { useState } from "react";
import api from "../api/api";
import loginStyles from "./login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required!");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Invalid email format!");
      return;
    }

    if (formData.password.length < 8 && formData.password.length > 12) {
      setError("Password must be at least 8 characters 12 characters long!");
      return;
    }
    
    try {
      const response = await api.post("/users/login", formData);
      localStorage.setItem("token", response.data.token);
      setSuccess("Login successful!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Credentials!");
    }
  };

  return (
    <div className={loginStyles.loginContainer}>
      <h2>Login</h2>
      {error && <p className={loginStyles.error}>{error}</p>}
      {success && <p className={loginStyles.success}>{success}</p>}
      <form onSubmit={handleSubmit} className={loginStyles.form}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p className={loginStyles.switchAuth}>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
