import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/api";
import Navbar from "../components/navBar";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(form);

      alert(res.data.message);

      navigate("/"); 

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };
return (
  <>  <Navbar/>
  <div className="flex items-center justify-center min-h-screen bg-bg">

  <div className="bg-card p-8 rounded-lg shadow-md w-80 border border-border">

    <h2 className="text-2xl font-bold text-text text-center mb-2">
      Create Account
    </h2>

    <p className="text-sm text-muted text-center mb-6">
      Start your journey
    </p>

    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        onChange={handleChange}
        className="w-full border border-border px-3 py-2 rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
      />

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
        Register
      </button>
    </form>

    <p className="text-sm text-center mt-4 text-muted">
      Already have an account?{" "}
      <Link to="/login" className="text-primary">
        Login
      </Link>
    </p>
  </div>
</div>
  </>

);
};

export default Register;