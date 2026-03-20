import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/api";

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
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        
        <h2 className="text-xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          <button className="w-full bg-blue-500 text-white py-2 rounded-md">
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;