import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { styled } from "@mui/system";

const Input = styled(TextField)(() => ({
  background: "#37373E",
  borderRadius: 5,

  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "yellow",
  },
  "& label": {
    color: "#ccc",
  },
  input: {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: "white",
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
  },
}));

const AuthInput = ({ set, ...props }) => {
  return (
    <Input
      {...props}
      onChange={(e) => {
        set(e.target.value);
      }}
    />
  );
};

AuthInput.propTypes = {
  set: PropTypes.func,
};

export default AuthInput;
