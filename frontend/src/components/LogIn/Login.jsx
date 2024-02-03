import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useMutation } from "@tanstack/react-query";
import { handlelogin } from "../../lib/actions";
import { Loader } from "../../lib/spinner";

//Login component
const Login = () => {
  const [user, setUser] = useState(""); //get user id
  const [password, setPassword] = useState(""); //get password
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const { data, isLoading, mutate } = useMutation({
    mutationFn: (user, password) => handlelogin(user, password),
    onSuccess: () => {
      if (data?.name) {
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("LoggedIn Succesfully");
        navigate("/");
      }
    },
    onError: () => {
      toast.error("Please enter correct deatils...");
    },
  });
  //if user is loged In then navigate to ticket or '/' page

  return (
    <div className="login">
      <Toaster position="top-right" />
      <h1 id="eventName">Technical Tambola</h1>

      <h1 id="login">Log In</h1>

      {/* take user id and store it in user state */}
      <input
        className="inputBox"
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Enter User ID"
      />

      {/* take password and store it in password state */}
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />

      {/* try to login user by handlelogin function */}
      <button
        onClick={() => mutate(user, password)}
        className="button"
        type="button"
      >
        {isLoading ? <Loader /> : <>Login</>}
      </button>
    </div>
  );
};

export default Login;
