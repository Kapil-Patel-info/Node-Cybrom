import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <>

       <Header />
       <br /><br />
      <Outlet />
      <br /><br />
      <Footer />
    </>
  );
};

export default Layout;
