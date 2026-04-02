import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/api";
import Navbar from "../components/navBar";
import InputField from "../components/inputField";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { role } = useParams(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  try {
    const res = await loginUser({ ...data, role });

    const user = res.data.user;

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(user));

    alert("Login Successful");
    if (user.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};
  const onError = () => {
    alert("Please fill all fields");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-bg px-4">
        <div className="bg-card p-8 rounded-2xl shadow-md border border-border w-full max-w-md">

          <h2 className="text-2xl font-bold text-text text-center mb-2">
            {role === "admin" ? "Admin Login" : "User Login"}
          </h2>

          <p className="text-sm text-muted text-center mb-6">
            Login to Continue
          </p>

          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">

            <InputField
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password}
            />

            <button className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary-hover">
              Login
            </button>

          </form>

          <p className="text-sm text-center mt-4 text-muted">
            Don't have an account?
            <Link to={`/register/${role}`} className="text-primary ml-1">
              Register
            </Link>
          </p>

        </div>
      </div>
    </>
  );
};

export default Login;