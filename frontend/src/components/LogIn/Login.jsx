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
  const [isPasswordToggle, setPasswordToggle] = useState(false);
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
    <div
      className="row d-flex align-items-center justify-content-center "
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="col-12 col-md-8 col-lg-3">
        <div className="card shadow-lg p-3 mb-5 bg-body-tertiary rounded m-4 login p-4">
          <h1 id="eventName">Technical Tambola</h1>

          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              mutate(user);
            }}
          >
            <h4 id="login" className="text-center mt-1">
              Log In
            </h4>
            <input
              className="form-control form-control-lg mt-3"
              type="text"
              value={user?.userId}
              onChange={(e) => setUser({ ...user, userId: e.target.value })}
              placeholder="Enter User ID"
              required
            />

            {/* take password and store it in password state */}
            {/* <input
              className="form-control form-control-lg  mt-3"
              type="password"
              value={user?.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter password"
              required
            /> */}
            <div className="input-group mt-3">
              <input
                type={isPasswordToggle ? "text" : "password"}
                className="form-control form-control-lg"
                placeholder="Enter password"
                value={user?.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setPasswordToggle((prev) => !prev)}
              >
                <i
                  className={`bi ${
                    isPasswordToggle ? "bi-eye" : "bi-eye-slash"
                  }`}
                ></i>
                {/* <i class="bi "></i> */}
              </button>
            </div>

            {/* try to login user by handlelogin function */}
            <div className="d-grid">
              <button className="btn btn-primary btn-block mt-4" type="submit">
                {isPending ? <Loader /> : <>Login</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
