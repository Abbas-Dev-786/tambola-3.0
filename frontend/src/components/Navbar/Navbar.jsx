import { Link, useNavigate } from "react-router-dom";
import logo from "./../../images/logo.png";
import "./Navbar.css";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RaiseHand } from "../../api";

const Nav = () => {
  const auth = typeof window !== "undefined" && localStorage.getItem("user"); //get user stored in localstorage
  const navigate = useNavigate();

  //clear user data from localstorage and navigate to login page
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="nav">
      <img alt={logo} className="logo" src={logo} />
      {auth ? (
        // show options to loged in player only
        <ul className="nav-ul">
          <li id="eventHead">
            <Link to="/">Technical Tambola MUACM</Link>
          </li>
          <li>
            <button id="logout">
              <Link onClick={logout} to="/login">
                Logout {JSON.parse(auth)?.user?.name}
              </Link>
            </button>
          </li>
          <li id="handRaise">
            {/* get user name and time when someone calm for prize by clicking on button  */}
            <button
              id="handRaiseButton"
              onClick={(e) => RaiseHand(e)}
              type="button"
            >
              ✋
            </button>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <a href="https://medicaps.acm.org/index/">MUACM</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
