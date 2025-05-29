import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Registation from "./Pages/Registation";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registration" element={<Registation />} />
           <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>


    </BrowserRouter>


     



  );
}

export default App;
