import { Link, useNavigate } from "react-router-dom";
import logo from "./../../images/logo.png";
import "./Navbar.css";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { RaiseHand } from "../../api";
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

  const { mutate } = useMutation({
    mutationFn: async () => RaiseHand(),
    onSuccess: () => {
      toast.success("Your Request submitted");
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setDisable(false);
    }, 10000);
  }, [disable]);

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
              disabled={disable ? true : false}
              onClick={() => {
                mutate();
              }}
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
