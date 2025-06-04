

const Dashboard = () => {
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  return (
    <>
      <h1>Welcome to Dashboard</h1>

      <p><strong>Name:</strong> {username ? username : "N/A"}</p>
      <p><strong>Email:</strong> {email ? email : "N/A"}</p>


    

    </>
  );
};

export default Dashboard;
