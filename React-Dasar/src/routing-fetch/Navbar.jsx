import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link
        to="/"
        style={{ color: "black", textDecoration: "none", margin: "10px" }}
      >
        Home
      </Link>
      <Link
        to="/users"
        style={{ color: "black", textDecoration: "none", margin: "10px" }}
      >
        Users
      </Link>
    </nav>
  );
}
