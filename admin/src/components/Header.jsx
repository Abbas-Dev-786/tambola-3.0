import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

const Header = ({ title, subTitle }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="h2"
        fontWeight={700}
        color={theme.palette.secondary[100]}
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subTitle}
      </Typography>
    </Box>
  );
};

export default Header;

Header.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};
