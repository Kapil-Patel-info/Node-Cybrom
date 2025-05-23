import { Link } from "react-router-dom";
import "../css/Header.css"


export default function Header(){
    return(<>
    
<nav>

<Link to="/home">Home</Link> 
<Link to="/insert">Insert</Link> 
<Link to="/display">Display</Link> 
<Link to="/update">Update</Link> 
<Link to="/search">Search</Link> 
<Link to="/contact">Contact</Link> 

</nav>
    
    </>);
}