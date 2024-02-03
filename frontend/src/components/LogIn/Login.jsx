import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { loginUser } from "../../api";
import { Loader } from "../spinner";
import "./Login.css";

//Login component
const Login = () => {
  const [user, setUser] = useState({ userId: "", password: "" }); //get user id
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const { isPending, mutate } = useMutation({
    mutationFn: (user) => loginUser(user),
    onSuccess: (data) => {
      toast.success("Login Succesfull");
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  return (
    <div className="login">
      <h1 id="eventName">Technical Tambola</h1>

      <h1 id="login">Log In</h1>

      {/* take user id and store it in user state */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(user);
        }}
      >
        <input
          className="inputBox"
          type="text"
          value={user?.userId}
          onChange={(e) => setUser({ ...user, userId: e.target.value })}
          placeholder="Enter User ID"
        />

        {/* take password and store it in password state */}
        <input
          className="inputBox"
          type="password"
          value={user?.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
        />

        {/* try to login user by handlelogin function */}
        <button className="button" type="submit">
          {isPending ? <Loader /> : <>Login</>}
        </button>
      </form>
    </div>
  );
};

export default Login;
