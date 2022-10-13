import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import httpService from "../../services/httpservice";
import usersService from "../../services/users";
const Navbar = () => {
  const { user } = useAuth();
  const [fullUser, setFullUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const userId = await usersService.getUser(user);
      console.log(userId);
      const { data } = await httpService.get(`/auth/user/${userId}`);
      setFullUser(data);
    };
    getUser();
  }, [user]);

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
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>

            <li className="nav-item p-4">
              <NavLink className="nav-link" to="/link">
                Link
              </NavLink>
            </li>
          </ul>

          {fullUser ? (
            <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
              <li className="nav-item p-4">
                <NavLink className="nav-link" to="/registration">
                  Welcome  {fullUser.username}
                </NavLink>
              </li>
            </ul>
          ) : (
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
