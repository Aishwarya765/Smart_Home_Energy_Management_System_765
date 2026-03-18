import { Link } from "react-router-dom";
import "../styles/Layout.css";

function Header() {
  return (
    <header className="header">
      <h2>Smart Energy System</h2>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </header>
  );
}

export default Header;