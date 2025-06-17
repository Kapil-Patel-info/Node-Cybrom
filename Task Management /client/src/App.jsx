import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import AdminDashBoard from "./pages/AdminDashBoard";
import CreateUser from "./pages/CreateUser";
import AssignTask from "./pages/AssignTask";
import UserDashBoard from "./pages/UserDashBoard";
import MyTask from "./pages/MyTask";
import ChangePassword from "./pages/ChangePassword";
import TaskDetail from "./pages/TaskDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main layout with Home */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Admin dashboard and its nested routes */}
        <Route path="admindashboard" element={<AdminDashBoard />}>
          <Route path="createuser" element={<CreateUser />} />
          <Route path="assigntask" element={<AssignTask />} />
           <Route path="taskdetail" element={<TaskDetail/>} />
        </Route>

        {/* User dashboard and its nested routes */}
        <Route path="userdashboard" element={<UserDashBoard />}>
          <Route path="mytask" element={<MyTask />} />
          <Route path="changepassword" element={<ChangePassword />} />


        </Route>


      </Routes>
    </BrowserRouter>
  );
};

export default App;
