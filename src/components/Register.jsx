import React, { useState } from "react";
import api from "../api/api";
import registerStyles from "./register.module.css";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.password) {
      setError("All fields are required!");
      return;
    }
  
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address!");
      return;
    }
  
    if (formData.password.length < 8 && formData.password.length > 12) {
      setError("Password must be at least 8 characters 12 characters long!");
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
  
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error("Invalid response from server.");
      }
  
      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }
  
      setSuccess("Registration successful! Please verify your email.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Registration failed:", err.message); // Debugging in console
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
