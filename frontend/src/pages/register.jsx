import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/api";

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
    <div className="flex items-center justify-center h-screen">
      
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        
        <h2 className="text-xl font-semibold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

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

          <button className="w-full bg-green-500 text-white py-2 rounded-md">
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;