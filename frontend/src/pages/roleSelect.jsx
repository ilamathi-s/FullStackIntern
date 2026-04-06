import { useLocation, useNavigate } from "react-router-dom";


export default function SelectRole() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const type = query.get("type");

  const authType = type === "register" ? "register" : "login";

  const handleSelect = (role) => {
    navigate(`/${authType}/${role}`);
  };

  return (
    <>
   

      <div className="min-h-screen bg-bg flex items-center justify-center px-4">

        <div className="w-full max-w-md text-center">

          <h1 className="text-3xl font-bold text-text mb-2">
            Choose Your Role
          </h1>

          <p className="text-sm text-muted mb-10">
            Continue as {authType === "login" ? "Login" : "Register"}
          </p>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg space-y-4">

            <div
              onClick={() => handleSelect("user")}
              className="w-full cursor-pointer border border-border rounded-xl px-5 py-4 
              flex items-center justify-between
              hover:border-primary hover:shadow-md hover:-translate-y-0.5
              transition-all duration-200"
            >
              <div className="flex items-center gap-3 text-left">
                <div>
                  <h3 className="font-semibold text-text">User</h3>
                </div>
              </div>

              <span className="text-muted text-sm">→</span>
            </div>

            <div
              onClick={() => handleSelect("admin")}
              className="w-full cursor-pointer border border-border rounded-xl px-5 py-4 
              flex items-center justify-between
              hover:border-primary hover:shadow-md hover:-translate-y-0.5
              transition-all duration-200"
            >
              <div className="flex items-center gap-3 text-left">
                <div>
                  <h3 className="font-semibold text-text">Admin</h3>
                  
                </div>
              </div>

              <span className="text-muted text-sm">→</span>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}