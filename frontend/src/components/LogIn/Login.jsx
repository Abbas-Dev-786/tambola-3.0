import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";

//Login component
const Login = () => {
  const [user, setUser] = useState(""); //get user id
  const [password, setPassword] = useState(""); //get password
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //if user is loged In then navigate to ticket or '/' page
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  //function to login user
  const handlelogin = async () => {
    setIsLoading(true);
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      body: JSON.stringify({ user, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.name) {
      setIsLoading(false);
      //if user is verified then store it in localstorage
      localStorage.setItem("user", JSON.stringify(data));
      //toast notifications
      toast.success("LoggedIn successfully");
      //navigate to ticket
      navigate("/");
    } else {
      setIsLoading(false);
      toast.error("Please enter correct deatils...");
    }
  };

  return (
    <div className="login">
      <Toaster position="bottom-center" />
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
      <button onClick={handlelogin} className="button" type="button">
        {isLoading ? <>Loading...</> : <>Login</>}
      </button>
    </div>
  );
};

export default Login;
