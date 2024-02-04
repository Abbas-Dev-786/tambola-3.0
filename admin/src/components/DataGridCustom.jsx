import PropTypes from "prop-types";
import { GridColumnMenuContainer } from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn, open } = props;
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={open}
    ></GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;

CustomColumnMenu.propTypes = {
  hideMenu: PropTypes.any,
  currentColumn: PropTypes.any,
  open: PropTypes.any,
};
