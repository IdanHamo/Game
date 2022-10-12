import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark"
      aria-label="Fourth navbar example"
    >
      <div className="container">
        <NavLink className="navbar-brand" to="/home">
          <img
            src="favicon.ico"
            alt="logo"
            style={{ width: "75px", height: "75px" }}
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item  p-4">
              <NavLink className="nav-link" to="/home">Home</NavLink>
            </li>

            <li className="nav-item p-4">
              <NavLink className="nav-link" to="/link">
                Link
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
            <li className="nav-item p-4">
              <NavLink className="nav-link" to="/registration">
                Register
              </NavLink>
            </li>

            <li className="nav-item p-4">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
