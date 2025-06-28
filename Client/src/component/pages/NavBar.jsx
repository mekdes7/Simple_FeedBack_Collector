import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid gray" }}>
      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      {user && (
        <>
          <Link to="/feedback">Give Feedback</Link>
          {user.role === "admin" && <Link to="/dashboard">Admin Panel</Link>}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default NavBar;
