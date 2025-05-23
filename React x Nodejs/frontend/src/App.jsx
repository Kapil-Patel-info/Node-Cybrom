import { BrowserRouter,Routes,Route } from "react-router-dom"
import Layouts from "./Layouts";
import Search from "./Pages/Search";
import Home from "./Pages/Home";
import Insert from "./Pages/Insert";
import Display from "./Pages/Display";
import Update from "./Pages/Update";
import Contact from "./Pages/Contact";

const App=()=>{
  return(<>
  
<BrowserRouter>
<Routes>
<Route path="/" element={<Layouts/>} >
<Route index element={<Home/>} />

<Route path="/home" element={<Home/>} />
<Route path="/insert" element={<Insert/>} />
<Route path="/display" element={<Display/>} />
<Route path="/update" element={<Update/>} />
<Route path="/search" element={<Search/>} />
<Route path="/contact" element={<Contact/>} />



</Route>


</Routes>
</BrowserRouter>




  
  </>);
}


export default App;