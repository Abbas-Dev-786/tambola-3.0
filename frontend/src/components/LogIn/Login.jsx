import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

//Login component
const Login = () => {
  const [user, setUser] = useState(""); //get user id
  const [password, setPassword] = useState(""); //get password

  const navigate = useNavigate();

  //if user is loged In then navigate to ticket or '/' page
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  //function to login user
  const handlelogin = async (e) => {
    e.preventDefault();

    let result = await fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      body: JSON.stringify({ userId: user, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result?.data?.user?.name) {
      //if user is verified then store it in localstorage
      localStorage.setItem("user", JSON.stringify(result?.data));
      //navigate to ticket
      navigate("/");
    } else {
      alert("Please enter correct details...");
    }
  };

  return (
    <div className="login">
      <h1 id="eventName">Technical Tambola</h1>

      {/* take user id and store it in user state */}
      <form className="login-form" onSubmit={handlelogin}>
        <h1 id="login">Log In</h1>
        <input
          className="inputBox"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Enter User ID"
          required
        />

        {/* take password and store it in password state */}
        <input
          className="inputBox"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />

        {/* try to login user by handlelogin function */}
        <button onClick={handlelogin} className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
