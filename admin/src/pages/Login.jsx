import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Button, Typography, Container, Box } from "@mui/material";
import AuthInput from "../components/AuthInput";
import { loginUser } from "../api";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login Succesfull");
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!(userId && password)) {
      toast.error("All fields are required");
      return;
    }

    mutate({ userId, password });
  };

  return (
    <Box component="div" className="auth-container">
      <Container maxWidth="xs" sx={{ mx: 2 }} className="auth-box">
        <form onSubmit={handleFormSubmit}>
          <Typography variant="h4" textAlign="center" fontWeight={700}>
            Login Here
          </Typography>

          <AuthInput
            label="UserID"
            id="email"
            variant="outlined"
            type="text"
            placeholder="Enter User ID"
            value={userId}
            set={setUserId}
            fullWidth
            required
          />
          <AuthInput
            label="Password"
            id="password"
            variant="outlined"
            type="password"
            placeholder="Enter Password"
            value={password}
            set={setPassword}
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
            fullWidth
          >
            Login
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
