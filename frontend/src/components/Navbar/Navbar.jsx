import { Link, useNavigate } from "react-router-dom";
import logo from "./../../images/logo.png";
import "./Navbar.css";
// import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Nav = () => {
  const auth = typeof window !== "undefined" && localStorage.getItem("user"); //get user stored in localstorage
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);

  //clear user data from localstorage and navigate to login page
  const logout = () => {
    localStorage.clear();

    toast.success("Logging Out ");

    navigate("/login");
  };

  useEffect(() => {
    setTimeout(() => {
      setDisable(false);
    }, 10000);
  }, [disable]);

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container">
        <div className="navbar-brand d-flex align-items-center justify-content-center gap-1">
          <img alt={logo} className="logo" src={logo} />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"></li>
            {auth && (
              <li className="nav-item">
                <Link onClick={logout} to="/login" className="nav-link active">
                  Logout {JSON.parse(auth)?.user?.name}
                </Link>
              </li>
            )}

            {!auth && (
              <li className="nav-item">
                <a
                  className="nav-link active"
                  href="https://medicaps.acm.org/index/"
                >
                  MUACM
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
