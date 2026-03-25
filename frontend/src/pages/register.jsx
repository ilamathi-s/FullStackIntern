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
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    
    <div className="bg-white p-8 rounded-lg shadow-md w-80">

      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
  Create Account
</h2>
<p className="text-sm text-gray-500 text-center mb-6">
  Start your journey
</p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

       <button className="w-full bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition font-medium">
          Register
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-green-500">
          Login
        </Link>
      </p>
    </div>
  </div>
  </>

);
};

export default Register;