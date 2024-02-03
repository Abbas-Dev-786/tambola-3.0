import { Link, useNavigate } from "react-router-dom";
import logo from "./../../images/logo.png";

import "./Navbar.css";

const Nav = () => {
  const auth = localStorage.getItem("user"); //get user stored in localstorage
  const navigate = useNavigate();

  //clear user data from localstorage and navigate to login page
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  //function to get details of player who raised hand for prize calm
  function RaiseHand() {
    //get current time
    var timestamp = Date.now();
    timestamp = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(timestamp);
    //get user name
    var user = JSON.parse(localStorage.getItem("user"))?.user?.name;

    //create a form data with current time and name of user data
    var formData = new FormData();
    formData.append("Timestamp", timestamp);
    formData.append("Name", user);

    //URL of google sheets api
    const URL =
      "https://script.google.com/macros/s/AKfycbz6d8p0Y8d8oD5a_84yxu5ldSHHIP2cD4NJhlPdY9P6wRjTmCbhFv3iMFMbcUsamLiL5g/exec";
    // "https://script.google.com/macros/s/AKfycbx63HLC9_j6JZkDYIY0SmCboGcfJ127Cxicp9eHm_r-1DbWA2_YaWCIc1-h0_0uF3crAg/exec";

    // insert data in google sheet
    fetch(URL, {
      method: "POST",
      body: JSON.stringify({ name: "helo" }),
      mode: "no-cors",
    })
      // .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <nav className="nav">
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
                Logout ({JSON.parse(auth)?.name})
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
    </nav>
  );
};

export default Nav;
