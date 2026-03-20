//test page to verify the working of login

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome, {user?.name}</p>
    </div>
  );
};

export default Dashboard;