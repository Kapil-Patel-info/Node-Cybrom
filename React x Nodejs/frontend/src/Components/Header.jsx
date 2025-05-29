import { Link } from "react-router-dom";
import "../css/Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="navbar">
        <Link to="/home" className="nav-link  " style={{color:"white"}}>Home</Link>
        <Link to="/insert" className="nav-link" style={{color:"white"}}>Insert</Link>
        <Link to="/display" className="nav-link" style={{color:"white"}}>Display</Link>
        <Link to="/update" className="nav-link" style={{color:"white"}}>Update</Link>
        <Link to="/search" className="nav-link" style={{color:"white"}}>Search</Link>
        <Link to="/contact" className="nav-link" style={{color:"white"}}>Contact</Link>

      </nav>
    </header>
  );
}