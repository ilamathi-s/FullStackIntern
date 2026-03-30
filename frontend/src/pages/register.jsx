import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/api";
import Navbar from "../components/navBar";
import InputField from "../components/inputField";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { role } = useParams(); // ✅ get role

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // ✅ attach role
      const res = await registerUser({ ...data, role });

      alert(res.data.message);

      // redirect to login of same role
      navigate(`/login/${role}`);

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const onError = () => {
    alert("Please fill all fields");
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen bg-bg">

        <div className="bg-card p-8 rounded-lg shadow-md w-80 border border-border">

          <h2 className="text-2xl font-bold text-text text-center mb-2">
            {role === "admin" ? "Admin Register" : "User Register"}
          </h2>

          <p className="text-sm text-muted text-center mb-6">
            Start your journey
          </p>

          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">

            <InputField
              label="Name"
              name="name"
              register={register}
              error={errors.name}
            />

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
              Register
            </button>

          </form>

          <p className="text-sm text-center mt-4 text-muted">
            Already have an account?
            <Link to={`/login/${role}`} className="text-primary ml-1">
              Login
            </Link>
          </p>

        </div>
      </div>
    </>
  );
};

export default Register;