import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navBar";

export default function SelectRole() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const type = query.get("type"); // login or register

  // ✅ fallback if type is missing
  const authType = type === "register" ? "register" : "login";

  const handleSelect = (role) => {
    navigate(`/${authType}/${role}`);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-bg">
        
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-80">

        <h2 className="text-2xl font-bold mb-2">
          Select Role
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Continue as {authType === "login" ? "Login" : "Register"}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleSelect("user")}
            className="px-6 py-2 rounded-lg border border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition"
          >
            User
          </button>

          <button
            onClick={() => handleSelect("admin")}
            className="px-6 py-2 rounded-lg border border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition"
          >
            Admin
          </button>
        </div>

      </div>
    </div>
    </>
  );
}