import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import SelectRole from "./pages/roleSelect";
import AdminDashboard from "./pages/adminDashboard"
import UserDashboard from "./pages/userDashboard"
import CreateTaskPage from "./pages/createTaskPage";
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/select-role?type=login" />;
  }
  return children;
};
const PublicRoute = ({ children }) => {
  if (!isAuthenticated()) return children;

  const user = JSON.parse(localStorage.getItem("user"));

  return user?.role === "admin"
    ? <Navigate to="/admin-dashboard" />
    : <Navigate to="/user-dashboard" />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route
            path="/login/:role"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register/:role"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
 <Route 
  path="/admin-dashboard" 
  element={
    <PrivateRoute>
      <AdminDashboard />
    </PrivateRoute>
  } 
/>

<Route 
  path="/user-dashboard" 
  element={
    <PrivateRoute>
      <UserDashboard />
    </PrivateRoute>
  } 
/>
          <Route
            path="*"
            element={<Navigate to="/login" />}
          />
  <Route path="/select-role" element={<SelectRole />} />
  <Route path="/create-task" element={<CreateTaskPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;