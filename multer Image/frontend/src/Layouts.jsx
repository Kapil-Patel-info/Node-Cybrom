import { Outlet } from "react-router-dom";
import Header from "./compnents/Header";
import Footer from "./compnents/Footer";


const Layout=()=>{


    return(<>
    
    <Header/>
    <Outlet/>
    <Footer/>
    
    </>);
}


export default Layout;