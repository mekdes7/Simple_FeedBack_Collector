import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3203/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input name="username" onChange={handleChange} placeholder="Username" required />
      <input name="email" onChange={handleChange} type="email" placeholder="Email" required />
      <input name="password" onChange={handleChange} type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
