import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api";
import { Loader } from "../spinner";

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

  const { isPending, mutate, error } = useMutation({
    mutationFn: (user) => loginUser(user),
  });

  return (
    <div className="login">
      <Toaster position="top-right" />
      <h1 id="eventName">Technical Tambola</h1>

      <h1 id="login">Log In</h1>

      {/* take user id and store it in user state */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(user, {
            onSuccess: (data) => {
              if (data?.data?.user) {
                toast.success("LoggedIn Succesfully");
                localStorage.setItem("user", JSON.stringify(data?.data));
                setTimeout(() => {
                  navigate("/");
                }, 3000);
              }
            },
            onError: (err) => {
              toast.error(err?.message);
            },
          });
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
