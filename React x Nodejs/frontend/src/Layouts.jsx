import Header from "./Components/Header";
import { Outlet } from "react-router-dom";


export default function Layouts(){
    return(<>
  <Header/>
  <Outlet />


    </>);
}