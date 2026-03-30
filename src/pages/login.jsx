import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/api";
import Navbar from "../components/navBar";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
    <Navbar/>
 <div className="min-h-screen flex items-center justify-center bg-bg px-4">

  <div className="bg-card p-8 rounded-2xl shadow-md border border-border w-full max-w-md">

    <h2 className="text-2xl font-bold text-text text-center mb-2">
      Welcome Back
    </h2>

    <p className="text-sm text-muted text-center mb-6">
      Login to Continue
    </p>

    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        onChange={handleChange}
        className="w-full border border-border px-3 py-2 rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        onChange={handleChange}
        className="w-full border border-border px-3 py-2 rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <button className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary-hover transition font-medium">
        Login
      </button>
    </form>

    <p className="text-sm text-center mt-4 text-muted">
      Don't have an account?{" "}
      <Link to="/register" className="text-primary">
        Register
      </Link>
    </p>
  </div>
</div> </>
);
};

export default Login;